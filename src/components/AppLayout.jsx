import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabase";

// ─── Nav Items (lengkap, sama persis dengan Dashboard) ───────────────────────
const NAV_ITEMS = [
  { icon: "⚙️", label: "Admin Panel",  path: "/admin",      adminOnly: false },
  { icon: "🏠", label: "Dashboard",   path: "/dashboard",  adminOnly: false },
  { icon: "🌳", label: "Skill Tree",  path: "/skill-tree", adminOnly: false },
  { icon: "🛠", label: "Tech Stack",  path: "/tech-stack", adminOnly: false },
  { icon: "🛒", label: "Marketplace", path: null,          adminOnly: false, comingSoon: true },
  { icon: "🎓", label: "Workshop",    path: "/workshop",   adminOnly: false },
];

/**
 * AppLayout — shared layout dengan sidebar collapsible untuk seluruh halaman fitur.
 *
 * Props:
 *  - children     : konten halaman
 *  - xp           : (opsional) nilai XP user untuk ditampilkan di sidebar
 *  - levelName    : (opsional) nama level user
 */
export default function AppLayout({ children, xp, levelName }) {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [collapsed, setCollapsed] = useState(false);   // desktop sidebar collapse
  const [mobileOpen, setMobileOpen] = useState(false); // mobile menu open

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#F5F3FF" }}>

      {/* ── DESKTOP SIDEBAR ───────────────────────────────────────────────── */}
      <aside
        className={`hidden md:flex flex-col border-r border-purple-50 transition-all duration-300 ease-in-out ${
          collapsed ? "w-[70px]" : "w-64"
        }`}
        style={{ background: "#fff", minHeight: "100vh", flexShrink: 0 }}
      >
        {/* Logo + Toggle */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-purple-50">
          {!collapsed && (
            <div className="relative">
              <svg className="absolute -top-1 -right-2 opacity-20" width="40" height="40" viewBox="0 0 60 60">
                {[0,1,2,3].map(row => [0,1,2,3].map(col => (
                  <circle key={`${row}-${col}`} cx={col*14+7} cy={row*14+7} r="2" fill="#7C3AED"/>
                )))}
              </svg>
              <span className="text-lg font-bold relative z-10" style={{ color: "#5B21B6" }}>GuruBermutu</span>
            </div>
          )}
          {collapsed && (
            <span className="text-lg font-bold mx-auto" style={{ color: "#5B21B6" }}>GB</span>
          )}
          <button
            onClick={() => setCollapsed(c => !c)}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition flex-shrink-0"
            title={collapsed ? "Perluas sidebar" : "Sembunyikan sidebar"}
          >
            {collapsed ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
              </svg>
            )}
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map(({ icon, label, path, comingSoon }) => {
            const isActive = path && location.pathname === path;
            const isAdminActive = path === "/admin" && location.pathname.startsWith("/admin");

            return (
              <button
                key={label}
                onClick={() => path && navigate(path)}
                title={collapsed ? label : ""}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                  ${isActive || isAdminActive
                    ? "bg-[#EDE9FE] text-[#5B21B6]"
                    : "text-gray-500 hover:bg-[#EDE9FE] hover:text-[#5B21B6]"
                  }
                  ${!path ? "opacity-60 cursor-default" : "cursor-pointer"}
                `}
              >
                <span className="text-base flex-shrink-0">{icon}</span>
                {!collapsed && (
                  <>
                    <span className="truncate">{label}</span>
                    {comingSoon && (
                      <span className="ml-auto text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-500 flex-shrink-0">
                        Segera
                      </span>
                    )}
                  </>
                )}
                {collapsed && isActive && (
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-l bg-purple-500"/>
                )}
              </button>
            );
          })}
        </nav>

        {/* XP Card (hanya saat tidak collapsed) */}
        {!collapsed && xp !== undefined && (
          <div className="mx-3 mb-3 rounded-2xl p-4 relative overflow-hidden" style={{ background: "#F5F3FF" }}>
            <svg className="absolute right-0 bottom-0 opacity-20" width="70" height="70" viewBox="0 0 80 80">
              <circle cx="60" cy="60" r="50" fill="none" stroke="#7C3AED" strokeWidth="1.5"/>
              <circle cx="60" cy="60" r="35" fill="none" stroke="#7C3AED" strokeWidth="1"/>
            </svg>
            <p className="text-xs font-semibold text-purple-700 mb-0.5">Total XP</p>
            <p className="text-xl font-bold" style={{ color: "#5B21B6" }}>{xp} <span className="text-xs font-normal text-purple-400">poin</span></p>
            {levelName && <p className="text-xs text-purple-500 mt-0.5">{levelName}</p>}
          </div>
        )}

        {/* Tips (hanya saat tidak collapsed) */}
        {!collapsed && xp === undefined && (
          <div className="mx-3 mb-3 rounded-2xl p-4 relative overflow-hidden" style={{ background: "#F5F3FF" }}>
            <p className="text-xs font-semibold text-purple-700 mb-1">Tips Hari Ini</p>
            <p className="text-xs text-purple-500 leading-relaxed">Kerjakan 1 pelatihan sehari untuk naik level lebih cepat! 🚀</p>
          </div>
        )}

        {/* Logout */}
        <div className={`px-3 pb-4 ${collapsed ? "flex justify-center" : ""}`}>
          <button
            onClick={handleLogout}
            title={collapsed ? "Logout" : ""}
            className={`flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-red-500 hover:bg-red-50 px-3 py-2 rounded-xl transition w-full`}
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"/>
            </svg>
            {!collapsed && "Logout"}
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT AREA ─────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* MOBILE TOP BAR */}
        <div className="md:hidden sticky top-0 z-50 flex items-center justify-between px-4 py-4 bg-white shadow-sm border-b border-purple-100">
          <button
            onClick={() => setMobileOpen(o => !o)}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-purple-700 hover:bg-purple-50 transition"
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            )}
          </button>
          <span className="font-bold text-base" style={{ color: "#5B21B6" }}>GuruBermutu</span>
          <button
            onClick={handleLogout}
            className="text-xs text-gray-400 hover:text-red-500 transition px-2 py-1 rounded-lg"
          >
            Keluar
          </button>
        </div>

        {/* MOBILE DRAWER */}
        <div className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${mobileOpen ? "visible" : "invisible"}`}>
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0"}`}
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer panel */}
          <div className={`absolute left-0 top-0 h-full w-72 bg-white shadow-2xl transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"} flex flex-col`}>
            <div className="flex items-center justify-between px-5 py-5 border-b border-purple-50">
              <span className="text-lg font-bold" style={{ color: "#5B21B6" }}>GuruBermutu</span>
              <button onClick={() => setMobileOpen(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
              {NAV_ITEMS.map(({ icon, label, path, comingSoon }) => {
                const isActive = path && location.pathname === path;
                const isAdminActive = path === "/admin" && location.pathname.startsWith("/admin");
                return (
                  <button
                    key={label}
                    onClick={() => { if (path) { navigate(path); setMobileOpen(false); } }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                      ${isActive || isAdminActive ? "bg-[#EDE9FE] text-[#5B21B6]" : "text-gray-600 hover:bg-[#EDE9FE] hover:text-[#5B21B6]"}
                      ${!path ? "opacity-60 cursor-default" : ""}
                    `}
                  >
                    <span className="text-base">{icon}</span>
                    <span>{label}</span>
                    {comingSoon && (
                      <span className="ml-auto text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-500">Segera</span>
                    )}
                  </button>
                );
              })}
            </nav>

            {xp !== undefined && (
              <div className="mx-4 mb-3 rounded-2xl p-4" style={{ background: "#F5F3FF" }}>
                <p className="text-xs font-semibold text-purple-700 mb-0.5">Total XP</p>
                <p className="text-xl font-bold" style={{ color: "#5B21B6" }}>{xp} <span className="text-xs font-normal text-purple-400">poin</span></p>
                {levelName && <p className="text-xs text-purple-500 mt-0.5">{levelName}</p>}
              </div>
            )}

            <div className="px-4 pb-6">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium text-white transition"
                style={{ background: "#5B21B6" }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"/>
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
