import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import games from "../data/games";
import NavigationButtons from "../components/NavigationButtons";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { addXP, isNodeCompleted } from "../services/xpService";
import {
  BarChart,
  Bar,
  Cell,
  LabelList,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

function InfoCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl p-3.5 border border-purple-50">
      <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-1">{title}</p>
      <p className="text-xs text-gray-700 font-medium leading-relaxed">{value}</p>
    </div>
  );
}

function ScoreCard({ title, score }) {
  const pct = Math.round((score / 5) * 100);
  return (
    <div className="bg-[#F5F3FF] rounded-xl p-3 text-center">
      <p className="text-[9px] font-bold uppercase tracking-widest text-purple-400 mb-1">{title}</p>
      <p className="text-xl font-bold text-[#7C3AED] mb-1.5">{score}</p>
      <div className="bg-purple-100 rounded-full h-1 overflow-hidden">
        <div
          className="h-1 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
const COLORS = [
  "#3B82F6", // PQ
  "#22C55E", // CQ
  "#A855F7", // GQ
  "#FACC15", // EQ
  "#6366F1", // PrQ
];

export default function GameDetail() {
  const { slug } = useParams();
  const game = games.find((g) => g.slug === slug);
  const { user } = useCurrentUser();
  const [completed, setCompleted] = useState(false);
  const [marking, setMarking] = useState(false);
  const [xpToast, setXpToast] = useState(false);

  useEffect(() => {
    if (!user?.uid || !slug) return;
    isNodeCompleted(user.uid, `game-${slug}`).then(setCompleted);
  }, [user, slug]);

  const handleMarkPlayed = async () => {
    if (!user?.uid) { alert("Silakan login terlebih dahulu."); return; }
    if (completed) return;
    setMarking(true);
    const result = await addXP(user.uid, 50, `Game dimainkan: ${game.title}`, `game-${slug}`);
    setMarking(false);
    if (result.success) {
      setCompleted(true);
      setXpToast(true);
      setTimeout(() => setXpToast(false), 3500);
    } else if (result.error === "Sudah diklaim sebelumnya.") {
      setCompleted(true);
    }
  };
  const egqiData = [
  {
    name: "PQ",
    score: Number(game.pq),
  },
  {
    name: "CQ",
    score: Number(game.cq),
  },
  {
    name: "GQ",
    score: Number(game.gq),
  },
  {
    name: "EQ",
    score: Number(game.eq),
  },
  {
    name: "PrQ",
    score: Number(game.prq),
  },
];
const radarData = [
  { subject: "PQ", score: Number(game.pq) },
  { subject: "CQ", score: Number(game.cq) },
  { subject: "GQ", score: Number(game.gq) },
  { subject: "EQ", score: Number(game.eq) },
  { subject: "PrQ", score: Number(game.prq) },
];
  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F5FF] px-6">
        <div className="text-center">
          <div className="text-6xl mb-4">🎮</div>
          <h1 className="text-xl font-bold text-gray-800 mb-3">Game tidak ditemukan</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F5FF]">
      {/* XP TOAST */}
      {xpToast && (
        <div className="fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl"
          style={{ background: "linear-gradient(135deg,#5B21B6,#7C3AED)", color: "white" }}>
          <span className="text-2xl">🎮</span>
          <div>
            <p className="font-bold text-sm">+50 XP Didapat!</p>
            <p className="text-xs text-white/80">{game.title} dimainkan</p>
          </div>
        </div>
      )}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <NavigationButtons
  showBack={true}
  showForward={false}
/>

        {/* HERO CARD */}
        <div className="bg-white rounded-3xl overflow-hidden border border-purple-50 mb-4">
          {/* Thumb */}
          <div className="h-[180px] sm:h-[220px] relative overflow-hidden">

  <img
    src={game.thumbnail}
    alt={game.title}
    className="w-full h-full object-cover"
  />

  <div className="absolute inset-0 bg-black/20" />

  <span className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 bg-black/40 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
    {game.gradeLevel}
  </span>

</div>

          <div className="p-4 sm:p-6">
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              <span className="bg-[#EEEDFE] text-[#3C3489] text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full">
                {game.category}
              </span>
              {game.platform && (
                <span className="bg-blue-50 text-blue-700 text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-full">
                  {game.platform}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900 leading-snug mb-2">
              {game.title}
            </h1>

            {/* Desc */}
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-4">
              {game.description}
            </p>

            {/* Scores */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.35 2.437c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.664 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
                </svg>
                Expert {game.expertScore}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#EEEDFE] text-[#3C3489] text-xs font-semibold px-3 py-1.5 rounded-full">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Teacher {game.teacherScore}
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-2">
              <a
                href={game.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 flex-1 px-6 py-3 sm:py-2.5 rounded-xl bg-[#7C3AED] text-white text-sm font-semibold hover:bg-[#6D28D9] transition"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.841z" />
                </svg>
                Mainkan Game
              </a>
              <button
                onClick={handleMarkPlayed}
                disabled={completed || marking}
                className="flex items-center justify-center gap-2 flex-1 px-6 py-3 sm:py-2.5 rounded-xl text-sm font-semibold transition"
                style={completed
                  ? { background: "#ECFDF5", color: "#16A34A" }
                  : { background: "#FDF2F8", color: "#EC4899", border: "1px solid #FBCFE8" }
                }
              >
                {marking ? (
                  <><div className="w-3.5 h-3.5 border-2 border-pink-300 border-t-pink-600 rounded-full animate-spin"/> Menyimpan...</>
                ) : completed ? "✅ Sudah Dimainkan (+50 XP)" : "🎮 Tandai Sudah Dimainkan (+50 XP)"}
              </button>
            </div>
          </div>
        </div>

        {/* INFORMASI */}
        <p className="text-xs sm:text-sm font-bold text-gray-800 mb-3">Informasi Game</p>
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-4">
          <InfoCard title="Topik" value={game.topic} />
          <InfoCard title="Kurikulum" value={game.curriculum} />
          <InfoCard title="Kemampuan Kognitif" value={game.cognitiveSkill} />
          <InfoCard title="Genre" value={game.genre} />
          <InfoCard title="Durasi" value={game.duration} />
          <InfoCard title="Akses" value={game.access} />
        </div>

        {/* EGQI */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-purple-50 mb-4">
          <p className="text-xs sm:text-sm font-bold text-gray-800 mb-3">Skor EGQI</p>

          {/* mobile: scroll horizontal — desktop: grid 5 col */}
          <div className="flex gap-2.5 overflow-x-auto pb-1 sm:pb-0 sm:grid sm:grid-cols-5 sm:overflow-visible">
            {[
              { title: "PQ", score: game.pq },
              { title: "CQ", score: game.cq },
              { title: "GQ", score: game.gq },
              { title: "EQ", score: game.eq },
              { title: "PrQ", score: game.prq },
            ].map((s) => (
              <div key={s.title} className="min-w-[72px] sm:min-w-0 flex-shrink-0 sm:flex-shrink">
                <ScoreCard title={s.title} score={s.score} />
              </div>
            ))}
          </div>
        </div>
{/* DASHBOARD EGQI */}
<div className="bg-white rounded-3xl p-4 sm:p-5 border border-purple-50 mb-4">

  <p className="text-xs sm:text-sm font-bold text-gray-800 mb-4">
    Dashboard EGQI
  </p>

  <div className="h-[420px]">

    <ResponsiveContainer width="100%" height="100%">

      <BarChart
        data={egqiData}
        margin={{
          top: 20,
          right: 20,
          left: -20,
          bottom: 0,
        }}
      >

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="name" />

        <YAxis
  domain={[0, 5]}
  ticks={[0,1,2,3,4,5]}
/>

        <Tooltip />

        <Bar
  dataKey="score"
  radius={[12, 12, 0, 0]}
>
  <LabelList
    dataKey="score"
    position="top"
    formatter={(value) => value.toFixed(2)}
  />

  {egqiData.map((entry, index) => (
    <Cell
      key={index}
      fill={COLORS[index]}
    />
  ))}
</Bar>

      </BarChart>

    </ResponsiveContainer>

  </div>

</div>
{/* LAPORAN EGQI */}
<div className="bg-white rounded-3xl p-6 border border-purple-50 mb-4">

  <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
    Educational Game Quality Evaluation
  </h2>

  <p className="text-sm text-gray-500 mb-6">
    Laporan evaluasi kualitas game edukasi berdasarkan EGQI.
  </p>

  <div className="h-[350px] sm:h-[450px]">

    <ResponsiveContainer width="100%" height="100%">

      <RadarChart data={radarData}>

        <PolarGrid />

        <PolarAngleAxis dataKey="subject" />

        <PolarRadiusAxis domain={[0, 5]} />

        <Radar
          dataKey="score"
          stroke="#7C3AED"
          fill="#7C3AED"
          fillOpacity={0.5}
        />

      </RadarChart>

    </ResponsiveContainer>

  </div>

</div>
<div className="bg-white rounded-3xl p-6 border border-purple-50 mb-4">

  <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-5">
    Evaluation Summary
  </h2>

  <div className="grid md:grid-cols-2 gap-4">

    <div className="bg-green-50 rounded-2xl p-5">

      <p className="text-green-700 font-semibold mb-2">
        Strength
      </p>

      <p className="text-gray-700">
        {game.bestScore}
      </p>

      <p className="text-2xl font-bold text-green-700 mt-2">
        {game.bestScoreValue}
      </p>

    </div>

    <div className="bg-yellow-50 rounded-2xl p-5">

      <p className="text-yellow-700 font-semibold mb-2">
        Secondary Strength
      </p>

      <p className="text-gray-700">
        {game.secondBest}
      </p>

      <p className="text-2xl font-bold text-yellow-700 mt-2">
        {game.secondBestValue}
      </p>

    </div>

  </div>

</div>
<div className="bg-white rounded-3xl p-6 border border-purple-50 mb-4">

  <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
    Insight & Recommendation
  </h2>

  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">

    Game <strong>{game.title}</strong> menunjukkan performa yang baik berdasarkan hasil evaluasi EGQI.

    Dimensi tertinggi berada pada <strong>{game.bestScore}</strong>, sehingga game ini sangat direkomendasikan untuk digunakan dalam proses pembelajaran sesuai dengan tujuan pedagogisnya.

  </p>

</div>
        {/* KEUNGGULAN */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-purple-50 mb-4">
          <p className="text-xs sm:text-sm font-bold text-gray-800 mb-3">Keunggulan Utama</p>
          <div className="flex items-center gap-3 bg-amber-50 rounded-2xl px-3.5 py-2.5 mb-2">
            <span className="text-base">🏆</span>
            <span className="text-xs sm:text-sm font-medium text-gray-700 flex-1">{game.bestScore}</span>
            <span className="text-xs sm:text-sm font-bold text-[#7C3AED]">{game.bestScoreValue}</span>
          </div>
          <div className="flex items-center gap-3 bg-[#F5F3FF] rounded-2xl px-3.5 py-2.5">
            <span className="text-base">⭐</span>
            <span className="text-xs sm:text-sm font-medium text-gray-700 flex-1">{game.secondBest}</span>
            <span className="text-xs sm:text-sm font-bold text-[#7C3AED]">{game.secondBestValue}</span>
          </div>
        </div>

        {/* PERSONA */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-purple-50 mb-6">
          <p className="text-xs sm:text-sm font-bold text-gray-800 mb-3">Persona yang Cocok</p>
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-4">
            <p className="text-xs sm:text-sm font-bold text-indigo-700 mb-1">🎯 {game.persona}</p>
            <p className="text-xs text-gray-500 leading-relaxed">{game.scenario}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
