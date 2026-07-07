import AdminLayout from "./AdminLayout";
import games from "../data/games";
import React from "react";
import { useNavigate } from "react-router-dom";


// ── Hitung statistik dari data games ──
function useDashboardStats() {
  const totalGame = games.length;

  const topics = new Set(games.map((g) => g.topic).filter(Boolean));
  const totalTopik = topics.size;

  const avgDim = (key) =>
    (games.reduce((sum, g) => sum + (g[key] || 0), 0) / games.length).toFixed(2);

  const avgPQ = avgDim("pq");
  const avgCQ = avgDim("cq");
  const avgGQ = avgDim("gq");
  const avgEQ = avgDim("eq");
  const avgPrQ = avgDim("prq");

  const overallAvg = (
    games.reduce((sum, g) => sum + (g.expertScore || 0), 0) / games.length
  ).toFixed(2);

  const recentGames = [...games].slice(-3).reverse();

  return { totalGame, totalTopik, avgPQ, avgCQ, avgGQ, avgEQ, avgPrQ, overallAvg, recentGames };
}

function StatCard({ icon, iconBg, label, value, trend }) {
  return (
    <div className="bg-white rounded-[18px] p-3 md:p-5 border border-[#f0edfb] hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(124,58,237,0.1)] transition-all">
      <div
        className="w-8 h-8 md:w-[38px] md:h-[38px] rounded-[11px] flex items-center justify-center mb-3.5 text-[17px]"
        style={{ background: iconBg.bg, color: iconBg.color }}
      >
        {icon}
      </div>
      <p className="text-[11.5px] text-gray-400 font-medium mb-0.5">{label}</p>
      <p className="text-lg md:text-[1.7rem] font-bold text-gray-900 tracking-tight">{value}</p>
      {trend && <p className="text-[10.5px] text-emerald-500 font-semibold mt-1">{trend}</p>}
    </div>
  );
}

function DimRow({ label, score, color }) {
  const pct = Math.min(100, (score / 5) * 100);
  return (
    <div className="flex items-center gap-2.5 py-2">
      <div className="w-[75px] md:w-[130px] text-[11px] md:text-xs font-semibold text-gray-600 flex-shrink-0">{label}</div>
      <div className="flex-1 bg-[#F3F0FF] rounded-full h-[7px] overflow-hidden">
        <div
          className="h-[7px] rounded-full"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <div className="w-8 text-right text-xs font-bold text-[#7C3AED] flex-shrink-0">{score}</div>
    </div>
  );
}

function QuickMenuCard({ icon, iconBg, label, description, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-[18px] p-4 border border-[#f0edfb] hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(124,58,237,0.1)] transition-all text-left flex items-center gap-3"
    >
      <div
        className="w-10 h-10 rounded-[11px] flex items-center justify-center text-lg flex-shrink-0"
        style={{ background: iconBg.bg, color: iconBg.color }}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-gray-900">{label}</p>
        <p className="text-xs text-gray-400 truncate">{description}</p>
      </div>
    </button>
  );
}

export default function AdminDashboard() {
  const stats = useDashboardStats();
  const navigate = useNavigate();

  return (
  <AdminLayout>
    <div className="max-w-7xl mx-auto">

      {/* HERO ADMIN */}
      <div
        className="
          relative
          overflow-hidden
          rounded-[28px]
          p-5
          md:p-8
          mb-6
          bg-gradient-to-r
          from-[#2D1B69]
          to-[#4C1D95]
        "
      >
        {/* Background Icon */}
        <div className="absolute right-4 top-0 text-[90px] md:text-[140px] opacity-10">
          ⚙️
        </div>

        <div className="relative z-10">
          <p className="text-purple-200 text-xs uppercase tracking-widest">
            Admin Panel
          </p>

          <h1 className="text-2xl md:text-4xl font-bold text-white mt-2">
            Selamat Datang Admin ⚙️
          </h1>

          <p className="text-white/70 mt-3 max-w-xl text-sm md:text-base">
            Kelola seluruh ekosistem Gurubermutu dari satu tempat.
          </p>

          <div className="flex flex-wrap gap-3 mt-5">
            <button
              onClick={() => navigate("/admin/kelola-workshop")}
              className="px-4 py-2 rounded-xl bg-white text-[#2D1B69] font-medium text-sm hover:bg-gray-100 transition"
            >
              🗓️ Kelola Workshop
            </button>

            <button
              onClick={() => navigate("/admin/data-guru")}
              className="px-4 py-2 rounded-xl border border-white/20 text-white text-sm hover:bg-white/10 transition"
            >
              Kelola Guru
            </button>
          </div>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
        <StatCard
          icon="🎮"
          iconBg={{ bg: "#EEEDFE", color: "#7C3AED" }}
          label="Total Game"
          value={stats.totalGame}
          trend="↑ Terkurasi EGQI"
        />
        <StatCard
          icon="📚"
          iconBg={{ bg: "#DBEAFE", color: "#2563EB" }}
          label="Total Topik Materi"
          value={stats.totalTopik}
          trend="Aljabar, Rasio, dll"
        />
        <StatCard
          icon="👩‍🏫"
          iconBg={{ bg: "#D1FAE5", color: "#059669" }}
          label="Guru Terdaftar"
          value="25"
          trend="↑ 5 guru baru"
        />
        <StatCard
          icon="⭐"
          iconBg={{ bg: "#FEF3C7", color: "#D97706" }}
          label="Rata-rata EGQI"
          value={stats.overallAvg}
          trend="Skala 1–5"
        />
      </div>

      {/* QUICK ACCESS MENU */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
        <QuickMenuCard
          icon="🗓️"
          iconBg={{ bg: "#EEEDFE", color: "#7C3AED" }}
          label="Kelola Workshop"
          description="Tambah, edit, hapus workshop"
          onClick={() => navigate("/admin/kelola-workshop")}
        />
        <QuickMenuCard
          icon="👩‍🏫"
          iconBg={{ bg: "#D1FAE5", color: "#059669" }}
          label="Kelola Guru"
          description="Data guru terdaftar"
          onClick={() => navigate("/admin/data-guru")}
        />
      </div>

      {/* ROW 2 COL */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-3.5 mb-6">

        {/* RATA-RATA DIMENSI EGQI */}
        <div className="bg-white rounded-[20px] p-5 border border-[#f0edfb]">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[14.5px] font-bold text-gray-900">Rata-rata Skor per Dimensi EGQI</p>
          </div>
          <DimRow label="Pedagogical (PQ)" score={stats.avgPQ} color="linear-gradient(90deg,#7C3AED,#A78BFA)" />
          <DimRow label="Content (CQ)" score={stats.avgCQ} color="linear-gradient(90deg,#2563EB,#60A5FA)" />
          <DimRow label="Gameplay (GQ)" score={stats.avgGQ} color="linear-gradient(90deg,#059669,#34D399)" />
          <DimRow label="Engagement (EQ)" score={stats.avgEQ} color="linear-gradient(90deg,#D97706,#FBBF24)" />
          <DimRow label="Practicality (PrQ)" score={stats.avgPrQ} color="linear-gradient(90deg,#DB2777,#F472B6)" />
        </div>

        {/* PENILAIAN GURU TERBARU */}
        <div className="bg-white rounded-[20px] p-4 md:p-5 border border-[#f0edfb]">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[14.5px] font-bold text-gray-900">Penilaian Guru Terbaru</p>
          </div>

          {[
            { name: "Rini", game: "Detective X", time: "2 jam lalu", score: 4.8, color: "linear-gradient(135deg,#7C3AED,#EC4899)" },
            { name: "Andi", game: "Dirt Bike", time: "5 jam lalu", score: 4.5, color: "linear-gradient(135deg,#059669,#34D399)" },
            { name: "Sari", game: "Brainie", time: "1 hari lalu", score: 4.2, color: "linear-gradient(135deg,#D97706,#FBBF24)" },
          ].map((r) => (
            <div key={r.name} className="flex items-center gap-2.5 py-2 px-2.5 rounded-xl hover:bg-[#FAFAFF] transition">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
                style={{ background: r.color }}
              >
                {r.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] md:text-xs font-semibold text-gray-900 truncate">{r.name} · {r.game}</p>
                <p className="text-[10.5px] text-gray-400">{r.time}</p>
              </div>
              <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-amber-50 text-amber-700 flex-shrink-0">
                ⭐ {r.score}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  </AdminLayout>
  );
}