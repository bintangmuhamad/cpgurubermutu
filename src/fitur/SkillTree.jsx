import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import AppLayout from "../components/AppLayout";

// ─── Data Skill Tree ────────────────────────────────────────────────────────
const baseLevels = [
  {
    level: "Level 1",
    title: "Digital Literacy",
    icon: "💻",
    color: "#7C3AED",
    bg: "#EDE9FE",
    desc: "Kuasai dasar tools digital untuk mengajar lebih efektif dan modern.",
    nodes: [
      { title: "Canva Dasar", key: "skill-canva-dasar", xpReward: 0 },
      { title: "Google Classroom", key: "skill-google-classroom", xpReward: 0 },
      { title: "Quizizz", key: "skill-quizizz", xpReward: 0 },
    ],
  },
  {
    level: "Level 2",
    title: "Interactive Media",
    icon: "🎨",
    color: "#EC4899",
    bg: "#FDF2F8",
    desc: "Ciptakan media pembelajaran interaktif yang memikat perhatian siswa.",
    nodes: [
      { title: "Canva Interaktif", key: "skill-canva-interaktif", xpReward: 0 },
      { title: "Mentimeter", key: "skill-mentimeter", xpReward: 0 },
      { title: "Padlet", key: "skill-padlet", xpReward: 0 },
    ],
  },
  {
    level: "Level 3",
    title: "Creative Teaching",
    icon: "🚀",
    color: "#059669",
    bg: "#ECFDF5",
    desc: "Terapkan metode mengajar kreatif dan inovatif yang transformatif.",
    nodes: [
      { title: "Project Based Learning", key: "skill-pbl", xpReward: 0 },
      { title: "Gamification Class", key: "skill-gamification", xpReward: 0 },
    ],
  },
];

// ─── Helpers ────────────────────────────────────────────────────────────────
function getLevelName(xp) {
  if (xp >= 5000) return "Guru Inspiratif";
  if (xp >= 3000) return "Guru Produktif";
  if (xp >= 1500) return "Guru Kreatif";
  if (xp >= 500) return "Guru Berkembang";
  return "Guru Pemula";
}
function getNextLevelXP(xp) {
  if (xp >= 5000) return 5000;
  if (xp >= 3000) return 5000;
  if (xp >= 1500) return 3000;
  if (xp >= 500) return 1500;
  return 500;
}
function getCurrentLevelXP(xp) {
  if (xp >= 5000) return 5000;
  if (xp >= 3000) return 3000;
  if (xp >= 1500) return 1500;
  if (xp >= 500) return 500;
  return 0;
}

// ─── Component ──────────────────────────────────────────────────────────────
const SkillTree = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [levels, setLevels] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Load user profile from Supabase
  useEffect(() => {
    const loadProfile = async (supabaseUser) => {
      if (!supabaseUser) {
        setLoading(false);
        return;
      }
      const { data: prof } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", supabaseUser.id)
        .single();

      setProfile(prof);

      const completedNodes = prof?.completed_nodes || {};
      const updated = baseLevels.map((lvl) => ({
        ...lvl,
        nodes: lvl.nodes.map((node) => ({
          ...node,
          done: !!(completedNodes[node.key]),
        })),
      }));
      setLevels(updated);
      setLoading(false);
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      loadProfile(session?.user || null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      loadProfile(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const xp = profile?.xp || 0;
  const completedModules = profile?.completed_modules || 0;

  const nextXP = getNextLevelXP(xp);
  const currentXP = getCurrentLevelXP(xp);
  const progressPct = nextXP === currentXP ? 100 : Math.floor(((xp - currentXP) / (nextXP - currentXP)) * 100);
  const aktivitas = Array.isArray(profile?.aktivitas) ? profile.aktivitas : [];
  if (loading) {
    return (
      <AppLayout xp={xp} levelName={getLevelName(xp)}>
        <div className="min-h-screen flex items-center justify-center" style={{ background: "#F5F3FF" }}>
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-purple-700 font-medium">Memuat Skill Tree...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout xp={xp} levelName={getLevelName(xp)}>
      <div className="flex-1 min-w-0">

          {/* HERO */}
          <div className="relative overflow-hidden" style={{ background: "#2D1B69", minHeight: 220 }}>
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 900 220">
              {[0,1,2,3,4,5].map(row => [0,1,2,3,4,5,6,7,8,9,10].map(col => (
                <circle key={`${row}-${col}`} cx={col*80+20} cy={row*40+10} r="1.5" fill="white" opacity="0.1"/>
              )))}
              <circle cx="780" cy="110" r="160" fill="none" stroke="white" strokeWidth="0.8" opacity="0.08"/>
              <circle cx="780" cy="110" r="110" fill="none" stroke="white" strokeWidth="0.8" opacity="0.08"/>
              <circle cx="780" cy="110" r="65" fill="none" stroke="white" strokeWidth="0.8" opacity="0.1"/>
              <circle cx="795" cy="85" r="38" fill="#3D2380" opacity="0.8"/>
            </svg>
            <div className="relative z-10 px-6 md:px-10 py-10 md:py-14">
              <p className="text-purple-300 text-xs font-semibold uppercase tracking-widest mb-2">Jalur Belajar</p>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">🌳 Skill Tree Guru</h1>
              <p className="text-white/70 text-sm md:text-base max-w-xl leading-relaxed">
                Visualisasi perjalanan belajarmu. XP bertambah dari Workshop & Tech Stack yang kamu selesaikan.
              </p>
              {/* XP Progress in Hero */}
              <div className="mt-5 inline-flex items-center gap-4 px-5 py-3 rounded-2xl" style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <div className="text-center">
                  <p className="text-white/60 text-xs">Total XP</p>
                  <p className="text-white font-bold text-xl">{xp}</p>
                </div>
                <div className="w-px h-8 bg-white/20"/>
                <div className="text-center">
                  <p className="text-white/60 text-xs">Level</p>
                  <p className="text-white font-bold text-sm">{getLevelName(xp)}</p>
                </div>
                <div className="w-px h-8 bg-white/20"/>
                <div className="text-center">
                  <p className="text-white/60 text-xs">Selesai</p>
                  <p className="text-white font-bold text-xl">{completedModules}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-8 max-w-5xl">

            {/* XP PROGRESS BAR */}
            <div className="bg-white rounded-2xl p-5 border border-purple-100 mb-6">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-semibold text-sm text-gray-800">Progress ke Level Berikutnya</p>
                  <p className="text-xs text-gray-400 mt-0.5">{getLevelName(xp)} → {xp >= 5000 ? "Level Tertinggi 🎉" : getLevelName(nextXP)}</p>
                </div>
                <span className="font-bold text-lg" style={{ color: "#7C3AED" }}>{progressPct}%</span>
              </div>
              <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: "#F3E8FF" }}>
                <div className="h-3 rounded-full transition-all duration-700"
                  style={{ width: `${progressPct}%`, background: "linear-gradient(90deg, #5B21B6, #7C3AED)" }}/>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[10px] text-gray-400">{currentXP} poin</span>
                <span className="text-[10px] text-gray-400">{xp >= 5000 ? "Max!" : `${nextXP} poin`}</span>
              </div>
            </div>

            {/* INFO XP SOURCE */}
            <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white rounded-2xl p-4 border border-purple-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "#EDE9FE" }}>🎓</div>
                <div>
                  <p className="font-semibold text-sm text-gray-800">Workshop Selesai</p>
                  <p className="text-xs text-gray-400">+100 XP per workshop yang ditandai selesai</p>
                </div>
                <button onClick={() => navigate("/workshop")} className="ml-auto text-xs px-3 py-1.5 rounded-xl font-semibold" style={{ background: "#EDE9FE", color: "#5B21B6" }}>
                  Buka →
                </button>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-purple-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "#FDF2F8" }}>🎮</div>
                <div>
                  <p className="font-semibold text-sm text-gray-800">Game Dimainkan</p>
                  <p className="text-xs text-gray-400">+50 XP per game Tech Stack yang dimainkan</p>
                </div>
                <button onClick={() => navigate("/tech-stack")} className="ml-auto text-xs px-3 py-1.5 rounded-xl font-semibold" style={{ background: "#FDF2F8", color: "#EC4899" }}>
                  Buka →
                </button>
              </div>
            </div>

            {/* SKILL TREE LEVELS */}
            <p className="font-semibold text-sm text-gray-700 mb-3">Kompetensi Digital Guru</p>
            <div className="space-y-4">
              {levels.map((item, index) => {
                const doneNodes = item.nodes.filter((n) => n.done).length;
                const totalNodes = item.nodes.length;
                const progress = totalNodes > 0 ? Math.floor((doneNodes / totalNodes) * 100) : 0;
                const isLocked = index > 0 && levels[index - 1].nodes.some((n) => !n.done);
                const isActive = activeIndex === index;

                return (
                  <div key={index}>
                    {/* Connector line */}
                    {index > 0 && (
                      <div className="flex justify-center -mt-2 mb-2">
                        <div className="w-0.5 h-4" style={{ background: isLocked ? "#E5E7EB" : "#C4B5FD" }}/>
                      </div>
                    )}

                    <div
                      onClick={() => !isLocked && setActiveIndex(isActive ? -1 : index)}
                      className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                        isActive && !isLocked
                          ? "border-purple-300 shadow-lg shadow-purple-100"
                          : "border-purple-100 hover:border-purple-200 hover:shadow-md"
                      } ${isLocked ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <div className="p-5">
                        <div className="flex items-center gap-4">
                          {/* Icon */}
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                            style={{ background: isLocked ? "#F3F4F6" : item.bg }}>
                            {isLocked ? "🔒" : item.icon}
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: item.bg, color: item.color }}>
                                {item.level}
                              </span>
                              {doneNodes === totalNodes && !isLocked && (
                                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-50 text-green-600">✅ Selesai</span>
                              )}
                            </div>
                            <h4 className="font-bold text-gray-800 text-base">{item.title}</h4>
                            <p className="text-xs text-gray-400 mt-0.5">{doneNodes}/{totalNodes} skill dikuasai</p>
                          </div>

                          {/* Progress pct */}
                          <div className="text-right flex-shrink-0">
                            <span className="font-bold text-lg" style={{ color: item.color }}>{progress}%</span>
                            <p className="text-[10px] text-gray-400">selesai</p>
                          </div>

                          {/* Chevron */}
                          {!isLocked && (
                            <svg className={`w-5 h-5 text-gray-400 transition-transform ${isActive ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                            </svg>
                          )}
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-4 w-full h-2 rounded-full overflow-hidden" style={{ background: "#F3F4F6" }}>
                          <div className="h-2 rounded-full transition-all duration-700"
                            style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${item.color}, ${item.color}99)` }}/>
                        </div>
                      </div>

                      {/* Expanded: Node List */}
                      {isActive && !isLocked && (
                        <div className="border-t border-purple-50 px-5 pb-5 pt-4">
                          <p className="text-xs text-gray-400 mb-3 leading-relaxed">{item.desc}</p>
                          <div className="space-y-2">
                            {item.nodes.map((node, i) => (
                              <div key={i} className="flex items-center gap-3 p-3 rounded-xl"
                                style={{ background: node.done ? "#F0FDF4" : "#FAFAFF", border: `1px solid ${node.done ? "#BBF7D0" : "#EDE9FE"}` }}>
                                <div className="w-6 h-6 rounded-full flex items-center justify-center text-sm flex-shrink-0"
                                  style={{ background: node.done ? "#22C55E" : "#EDE9FE", color: node.done ? "white" : "#7C3AED" }}>
                                  {node.done ? "✓" : (i + 1)}
                                </div>
                                <span className={`text-sm font-medium ${node.done ? "text-green-700 line-through" : "text-gray-700"}`}>
                                  {node.title}
                                </span>
                                {node.done && <span className="ml-auto text-xs text-green-500 font-semibold">Selesai ✓</span>}
                              </div>
                            ))}
                          </div>
                          <p className="text-xs text-gray-400 mt-3 italic">
                            💡 Skill ini otomatis tercatat saat kamu menyelesaikan Workshop & Game terkait.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* AKTIVITAS TERKINI */}
            {aktivitas.length > 0 && (
              <div className="bg-white rounded-2xl p-5 border border-purple-100 mt-6">
                <h3 className="font-semibold text-sm text-gray-800 mb-4">⚡ Aktivitas Terkini</h3>
                <div className="space-y-2">
                  {aktivitas.slice(-5).reverse().map((item, i) => (
                    <div key={i} className="flex items-start gap-2 py-2 border-b border-purple-50 last:border-0">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: "#7C3AED" }}/>
                      <p className="text-xs text-gray-600 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
    </AppLayout>
  );
};

export default SkillTree;