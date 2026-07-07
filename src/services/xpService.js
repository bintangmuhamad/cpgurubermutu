import { supabase } from "../lib/supabase";

/**
 * Tambah XP ke profil user di Supabase.
 * @param {string} userId        - UUID user (auth.uid)
 * @param {number} xpAmount      - Jumlah XP yang ditambahkan
 * @param {string} activityLog   - Deskripsi aktivitas (e.g. "Workshop selesai: Canva Dasar")
 * @param {string} nodeKey       - Key unik aktivitas (workshop.id / game.slug) untuk mencegah double claim
 * @returns {Promise<{success: boolean, newXp: number, error?: string}>}
 */
export async function addXP(userId, xpAmount, activityLog, nodeKey) {
  try {
    // Ambil profil terkini
    const { data: profile, error: fetchError } = await supabase
      .from("profiles")
      .select("xp, completed_modules, badges, aktivitas, completed_nodes")
      .eq("id", userId)
      .single();

    if (fetchError) throw fetchError;

    // Cek apakah sudah pernah diklaim
    const completedNodes = profile.completed_nodes || {};
    if (nodeKey && completedNodes[nodeKey]) {
      return { success: false, newXp: profile.xp, error: "Sudah diklaim sebelumnya." };
    }

    const newXp = (profile.xp || 0) + xpAmount;
    const newCompleted = (profile.completed_modules || 0) + 1;
    const newNodes = { ...completedNodes, ...(nodeKey ? { [nodeKey]: true } : {}) };

    // Tambah log aktivitas (max 20 entri terakhir)
    const prevAktivitas = Array.isArray(profile.aktivitas) ? profile.aktivitas : [];
    const timestamp = new Date().toLocaleDateString("id-ID", {
      day: "numeric", month: "short", year: "numeric",
    });
    const newAktivitas = [
      ...prevAktivitas,
      `${activityLog} • ${timestamp} (+${xpAmount} XP)`,
    ].slice(-20);

    // Hitung badges baru
    const newBadges = computeBadges(newXp, newCompleted, profile.badges || []);

    // Update ke Supabase
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        xp: newXp,
        completed_modules: newCompleted,
        completed_nodes: newNodes,
        aktivitas: newAktivitas,
        badges: newBadges,
        level_name: getLevelName(newXp),
        level: getLevelNumber(newXp),
      })
      .eq("id", userId);

    if (updateError) throw updateError;

    return { success: true, newXp };
  } catch (err) {
    console.error("addXP error:", err);
    return { success: false, newXp: 0, error: err.message };
  }
}

/**
 * Cek apakah node/key tertentu sudah diselesaikan user
 * @param {string} userId
 * @param {string} nodeKey
 * @returns {Promise<boolean>}
 */
export async function isNodeCompleted(userId, nodeKey) {
  if (!userId || !nodeKey) return false;
  try {
    const { data: profile } = await supabase
      .from("profiles")
      .select("completed_nodes")
      .eq("id", userId)
      .single();
    return !!(profile?.completed_nodes?.[nodeKey]);
  } catch {
    return false;
  }
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function getLevelName(xp) {
  if (xp >= 5000) return "Guru Inspiratif";
  if (xp >= 3000) return "Guru Produktif";
  if (xp >= 1500) return "Guru Kreatif";
  if (xp >= 500)  return "Guru Berkembang";
  return "Guru Pemula";
}

function getLevelNumber(xp) {
  if (xp >= 5000) return 5;
  if (xp >= 3000) return 4;
  if (xp >= 1500) return 3;
  if (xp >= 500)  return 2;
  return 1;
}

function computeBadges(xp, completedModules, existingBadges) {
  const badges = [...existingBadges];
  const add = (b) => { if (!badges.includes(b)) badges.push(b); };
  if (xp >= 100)  add("Pemula Bersemangat");
  if (xp >= 500)  add("Guru Berkembang");
  if (xp >= 1500) add("Guru Kreatif");
  if (xp >= 3000) add("Guru Produktif");
  if (xp >= 5000) add("Guru Inspiratif");
  if (completedModules >= 1)  add("Workshop Perdana");
  if (completedModules >= 5)  add("Workshop Enthusiast");
  if (completedModules >= 10) add("Workshop Master");
  return badges;
}
