import { useEffect, useState, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import EditProfileModal from "../components/EditProfileModal";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
      setCurrentDate(now.toLocaleDateString("id-ID", options));
    };
    updateDate();
    const interval = setInterval(updateDate, 60000);
    return () => clearInterval(interval);
  }, []);

  const loadProfile = useCallback(async (supabaseUser) => {
    if (!supabaseUser) return;
    setUser(supabaseUser);
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", supabaseUser.id)
      .single();
    if (profile) setUserData(profile);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) loadProfile(session.user);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session?.user) loadProfile(session.user);
      else setUser(null);
    });
    return () => subscription.unsubscribe();
  }, [loadProfile]);

  const xp = userData?.xp || 0;
  const completed = userData?.completed_modules || 0;
  const nama = userData?.nama || user?.user_metadata?.nama || user?.email?.split("@")[0] || "Guru";

  const getLevelName = (xp) => {
    if (xp >= 5000) return "Guru Inspiratif";
    if (xp >= 3000) return "Guru Produktif";
    if (xp >= 1500) return "Guru Kreatif";
    if (xp >= 500)  return "Guru Berkembang";
    return "Guru Pemula";
  };
  const getNextLevelXP = (xp) => {
    if (xp >= 5000) return 5000;
    if (xp >= 3000) return 5000;
    if (xp >= 1500) return 3000;
    if (xp >= 500)  return 1500;
    return 500;
  };
  const getCurrentLevelXP = (xp) => {
    if (xp >= 5000) return 5000;
    if (xp >= 3000) return 3000;
    if (xp >= 1500) return 1500;
    if (xp >= 500)  return 500;
    return 0;
  };

  const nextXP = getNextLevelXP(xp);
  const currentXP = getCurrentLevelXP(xp);
  const progressPct = nextXP === currentXP ? 100 : Math.floor(((xp - currentXP) / (nextXP - currentXP)) * 100);
  const badges   = Array.isArray(userData?.badges)   ? userData.badges   : [];
  const aktivitas = Array.isArray(userData?.aktivitas) ? userData.aktivitas : [];

  const shortcuts = [
    { icon: "🎓", label: "Ikut Pelatihan",   desc: "Tambah poin & skill baru",        path: "/workshop",   bg: "#EDE9FE", color: "#5B21B6" },
    { icon: "🛒", label: "Buka Marketplace", desc: "Jual & beli aset digital",         path: null,          bg: "#FDF2F8", color: "#EC4899" },
    { icon: "📤", label: "Upload Karya",     desc: "Bagikan karyamu ke guru lain",     path: null,          bg: "#ECFDF5", color: "#059669" },
    { icon: "🌳", label: "Skill Tree",       desc: "Lihat jalur belajarmu",            path: "/skill-tree", bg: "#FFF7ED", color: "#D97706" },
  ];

  return (
    <AppLayout xp={xp} levelName={getLevelName(xp)}>
      <div className="flex flex-1 justify-center gap-6 px-3 md:px-0 py-4 md:py-6">

        {/* CENTER */}
        <div className="w-full max-w-[900px] space-y-5 md:space-y-6">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
              </svg>
              <input type="text" placeholder="Cari pelatihan, materi..." className="bg-white pl-10 pr-4 py-3 rounded-xl text-sm w-full md:w-64 border border-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-200"/>
            </div>
            <p className="text-xs text-gray-500 md:text-right">{currentDate}</p>
          </div>

          {/* HERO */}
          <div className="relative rounded-[28px] overflow-hidden" style={{ background: "#2D1B69", minHeight: 200 }}>
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 220">
              {[0,1,2,3,4,5].map(row => [0,1,2,3,4,5].map(col => (
                <circle key={`d-${row}-${col}`} cx={col*40+20} cy={row*40+10} r="1.5" fill="white" opacity="0.12"/>
              )))}
              <circle cx="680" cy="110" r="150" fill="none" stroke="white" strokeWidth="0.8" opacity="0.1"/>
              <circle cx="680" cy="110" r="110" fill="none" stroke="white" strokeWidth="0.8" opacity="0.1"/>
              <circle cx="680" cy="110" r="70"  fill="none" stroke="white" strokeWidth="0.8" opacity="0.12"/>
              <circle cx="700" cy="80"  r="40"  fill="#3D2380" opacity="0.8"/>
              <ellipse cx="700" cy="80" rx="55" ry="10" fill="none" stroke="white" strokeWidth="1.2" opacity="0.25" transform="rotate(-20 700 80)"/>
              {[[120,40],[200,20],[350,30],[500,15],[580,50],[100,160],[300,170],[450,190],[620,175],[750,130]].map(([x,y],i) => (
                <circle key={i} cx={x} cy={y} r="1.5" fill="white" opacity="0.6"/>
              ))}
            </svg>
            <div className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-center gap-2 p-4 md:p-6">
              <div>
                <p className="text-purple-300 text-xs font-semibold uppercase tracking-widest mb-2">Selamat datang kembali</p>
                <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug">Halo, {nama} 👋</h2>
                <p className="text-sm mt-2 leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                  Yuk lanjut belajar dan naik level hari ini!
                </p>
                <button onClick={() => navigate("/workshop")}
                  className="mt-5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                  style={{ background: "#fff", color: "#5B21B6" }}>
                  Ikut Pelatihan →
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3 md:flex md:flex-col md:min-w-[160px]">
                <div className="rounded-2xl p-4 text-center border border-white/20" style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}>
                  <p className="text-xs font-medium mb-1" style={{ color: "rgba(255,255,255,0.7)" }}>Poin Kamu</p>
                  <h3 className="text-2xl font-bold text-white">{xp}</h3>
                </div>
                <div className="rounded-2xl p-4 text-center border border-white/20" style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }}>
                  <p className="text-xs font-medium mb-1" style={{ color: "rgba(255,255,255,0.7)" }}>🔥 Level</p>
                  <h3 className="text-sm font-bold text-white">{getLevelName(xp)}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white p-3 rounded-xl border border-purple-100">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-2" style={{ background: "#FDF2F8" }}><span className="text-sm">⭐</span></div>
              <p className="text-gray-400 text-[10px] uppercase tracking-widest font-semibold">Total Poin</p>
              <h3 className="text-2xl font-bold mt-0.5" style={{ color: "#EC4899" }}>{xp}</h3>
            </div>
            <div className="bg-white p-3 rounded-xl border border-purple-100">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-2" style={{ background: "#EDE9FE" }}><span className="text-sm">🏅</span></div>
              <p className="text-gray-400 text-[10px] uppercase tracking-widest font-semibold">Level</p>
              <h3 className="text-sm font-bold mt-0.5" style={{ color: "#7C3AED" }}>{getLevelName(xp)}</h3>
            </div>
            <div className="bg-white p-3 rounded-xl border border-purple-100">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center mb-2" style={{ background: "#EDE9FE" }}><span className="text-sm">📚</span></div>
              <p className="text-gray-400 text-[10px] uppercase tracking-widest font-semibold">Pelatihan</p>
              <h3 className="text-2xl font-bold mt-0.5" style={{ color: "#5B21B6" }}>{completed}</h3>
            </div>
          </div>

          {/* XP PROGRESS */}
          <div className="bg-white p-4 rounded-2xl border border-purple-100">
            <div className="flex justify-between items-center mb-1">
              <div>
                <p className="font-semibold text-sm text-gray-800">Progress ke Level Berikutnya</p>
                <p className="text-xs text-gray-400 mt-0.5">{getLevelName(xp)} → {xp >= 5000 ? "Level Tertinggi 🎉" : getLevelName(nextXP)}</p>
              </div>
              <span className="font-bold text-lg" style={{ color: "#7C3AED" }}>{progressPct}%</span>
            </div>
            <div className="w-full h-3 rounded-full mt-3 overflow-hidden" style={{ background: "#F3E8FF" }}>
              <div className="h-3 rounded-full transition-all duration-700"
                style={{ width: `${progressPct}%`, background: "linear-gradient(90deg, #5B21B6, #7C3AED)" }}/>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[10px] text-gray-400">{currentXP} poin</span>
              <span className="text-[10px] text-gray-400">{xp >= 5000 ? "Max!" : `${nextXP} poin`}</span>
            </div>
          </div>

          {/* SHORTCUT CARDS */}
          <div>
            <p className="font-semibold text-sm text-gray-700 mb-3">Menu Cepat</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {shortcuts.map((sc) => (
                <button key={sc.label} onClick={() => sc.path && navigate(sc.path)}
                  className={`bg-white rounded-2xl p-4 border border-purple-100 text-left transition-all hover:shadow-md hover:-translate-y-0.5 active:scale-95 ${!sc.path ? "opacity-70 cursor-default" : ""}`}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3" style={{ background: sc.bg }}>
                    {sc.icon}
                  </div>
                  <p className="text-sm font-semibold text-gray-800 leading-tight">{sc.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{sc.desc}</p>
                  {!sc.path && <span className="inline-block mt-2 text-[9px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-400">Segera Hadir</span>}
                </button>
              ))}
            </div>
          </div>

          {/* BADGES */}
          {badges.length > 0 && (
            <div className="bg-white p-4 rounded-2xl border border-purple-100">
              <p className="font-semibold text-sm text-gray-800 mb-3">Badge Kamu 🎖</p>
              <div className="flex flex-wrap gap-2">
                {badges.map((badge, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-full text-xs font-semibold" style={{ background: "#EDE9FE", color: "#5B21B6" }}>
                    🏅 {badge}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* MOBILE PROFILE CARD (hanya tampil di mobile) */}
          <div className="md:hidden bg-white p-5 rounded-2xl border border-purple-100 mt-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 text-white rounded-full flex items-center justify-center text-lg font-bold"
                  style={{ background: "linear-gradient(135deg, #5B21B6, #7C3AED)" }}>
                  {nama.charAt(0).toUpperCase()}
                </div>
                <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white" style={{ background: "#10B981" }}/>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{nama}</h3>
                <p className="text-xs text-gray-400">{user?.email}</p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: "#EDE9FE", color: "#5B21B6" }}>
                  {getLevelName(xp)}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <button onClick={() => setIsEditModalOpen(true)} className="w-full border border-purple-600 text-purple-600 py-2.5 rounded-xl text-sm transition hover:bg-purple-50">Edit Profil</button>
            </div>
          </div>

        </div>

        {/* RIGHT PANEL DESKTOP */}
        <div className="hidden lg:flex w-[280px] shrink-0 flex-col border-l border-purple-50 px-6 py-6 self-start mt-0 bg-white"
          style={{ minHeight: "100vh" }}>
          
          {/* Avatar */}
          <div className="text-center mt-4">
            <div className="relative mx-auto w-fit">
              <div className="w-20 h-20 mx-auto text-white rounded-full flex items-center justify-center text-3xl font-bold shadow-lg"
                style={{ background: "linear-gradient(135deg, #5B21B6, #7C3AED)" }}>
                {nama.charAt(0).toUpperCase()}
              </div>
              <span className="absolute bottom-0 right-1 w-5 h-5 rounded-full border-2 border-white" style={{ background: "#10B981" }}/>
            </div>
            <h3 className="mt-4 font-bold text-gray-800 text-lg">{nama}</h3>
            <p className="text-xs text-gray-400 mt-1 break-all">{user?.email}</p>
            <div className="mt-3 inline-block px-4 py-1.5 rounded-full text-xs font-bold shadow-sm" style={{ background: "#EDE9FE", color: "#5B21B6" }}>
              {getLevelName(xp)}
            </div>
          </div>

          <hr className="my-6 border-purple-50"/>

          {/* Aktivitas di Kanan (Desktop) */}
          <div className="flex-1 overflow-hidden">
            <h3 className="font-semibold mb-4 text-sm text-gray-800 flex items-center gap-2">
              <span>⚡</span> Aktivitas Terkini
            </h3>
            {aktivitas.length === 0 ? (
              <p className="text-xs text-gray-400">Belum ada aktivitas. Ikut pelatihan pertamamu! 🚀</p>
            ) : (
              <div className="space-y-3 text-sm">
                {aktivitas.slice(-4).reverse().map((item, index) => (
                  <div key={index} className="flex items-start gap-3 py-2 border-b border-purple-50/50 last:border-0">
                    <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: "#7C3AED" }}/>
                    <p className="leading-relaxed text-gray-600 text-[13px]">{item}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="mt-auto space-y-3 pt-6">
            <button onClick={() => setIsEditModalOpen(true)} className="w-full border-2 py-2.5 rounded-xl text-sm font-bold transition hover:bg-purple-50"
              style={{ borderColor: "#7C3AED", color: "#7C3AED" }}>
              Edit Profil
            </button>
            <button onClick={async () => { await supabase.auth.signOut(); navigate("/"); }}
              className="w-full text-white py-2.5 rounded-xl text-sm font-bold transition shadow-md hover:shadow-lg hover:-translate-y-0.5"
              style={{ background: "linear-gradient(90deg, #5B21B6, #7C3AED)" }}>
              Keluar
            </button>
          </div>
        </div>
      </div>

      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        user={user} 
        profile={userData}
        onUpdateSuccess={() => loadProfile(user)}
      />
    </AppLayout>
  );
}

export default Dashboard;