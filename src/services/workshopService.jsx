import { supabase } from "../lib/supabase";
import workshopsLocal from "../data/dataworkshop";

// ─── Normalise local data agar field-nya sama dengan Supabase ────────────────
function normaliseLocal(w) {
  return {
    id: String(w.id),
    title: w.title || "",
    category: w.category || "",
    speaker: w.speaker || w.organizer || "",
    date: w.date || "",
    date_raw: w.dateRaw || "",
    time: w.time || "",
    mode: w.mode || "Online",
    location: w.location || "",
    thumbnail: w.thumbnail || w.image || "",
    description: w.description || "",
    registration_link: w.registerLink || w.registrationLink || "",
    quota: w.quota || 30,
    registered: w.registered || 0,
    created_by: null,
    created_by_name: w.organizer || "",
    created_by_role: "admin",
    // preserve original fields for WorkshopDetail compat
    organizer: w.organizer || "",
    registerLink: w.registerLink || "",
    reward: w.reward || 100,
    followers: w.followers || "",
    images: w.images || [],
    _isLocal: true,
  };
}

// ─── Real-time listener ───────────────────────────────────────────────────────
// Dipakai di Workshop.jsx & KelolaWorkshop.jsx
// Fallback: jika Supabase error / kosong → gunakan data lokal
export function subscribeWorkshops(callback) {
  let usedLocal = false;

  // Initial fetch dari Supabase
  supabase
    .from("workshops")
    .select("*")
    .order("created_at", { ascending: false })
    .then(({ data, error }) => {
      if (!error && data && data.length > 0) {
        // Supabase punya data
        callback(data);
      } else {
        // Supabase kosong atau error → pakai data lokal
        usedLocal = true;
        callback(workshopsLocal.map(normaliseLocal));
      }
    });

  // Real-time subscription (hanya aktif kalau Supabase sudah punya data)
  const subscription = supabase
    .channel("workshops-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "workshops" },
      async () => {
        const { data, error } = await supabase
          .from("workshops")
          .select("*")
          .order("created_at", { ascending: false });
        if (!error && data && data.length > 0) {
          usedLocal = false;
          callback(data);
        } else if (!usedLocal) {
          usedLocal = true;
          callback(workshopsLocal.map(normaliseLocal));
        }
      }
    )
    .subscribe();

  return () => supabase.removeChannel(subscription);
}

// ─── getWorkshopById ─────────────────────────────────────────────────────────
// Coba Supabase dulu; jika gagal/tidak ada → fallback ke data lokal
export async function getWorkshopById(id) {
  try {
    const { data, error } = await supabase
      .from("workshops")
      .select("*")
      .eq("id", id)
      .single();

    if (!error && data) return data;
  } catch (_) { /* ignore */ }

  // Fallback: cari di data lokal
  const local = workshopsLocal.find((w) => String(w.id) === String(id));
  return local ? normaliseLocal(local) : null;
}

// ─── addWorkshop ─────────────────────────────────────────────────────────────
export async function addWorkshop(data, user) {
  const { data: inserted, error } = await supabase
    .from("workshops")
    .insert([
      {
        ...data,
        registered: 0,
        created_by: user.uid,
        created_by_name: user.name,
        created_by_role: user.role,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return inserted;
}

// ─── updateWorkshop ───────────────────────────────────────────────────────────
export async function updateWorkshop(id, data) {
  const { error } = await supabase
    .from("workshops")
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw error;
}

// ─── deleteWorkshop ───────────────────────────────────────────────────────────
export async function deleteWorkshop(id) {
  const { error } = await supabase.from("workshops").delete().eq("id", id);
  if (error) throw error;
}