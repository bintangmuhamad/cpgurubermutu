import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import games from "../data/games";
import curatedImage from "../assets/curated1.jpg";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { addXP, isNodeCompleted } from "../services/xpService";

const ITEMS_PER_PAGE = 6;

const TOPICS = [
  "Aljabar",
  "Aritmetika",
  "Rasio",
  "Perkalian",
  "Penjumlahan",
  "Nilai Tempat",
  "Counting",
  "Pola Bilangan",
  "Perbandingan",
];
const DIFFICULTIES = ["Beginner", "Intermediate", "Expert"];
const RATINGS = [
  { label: "4 ke atas", min: 4, stars: 4 },
  { label: "3 ke atas", min: 3, stars: 3 },
  { label: "2 ke atas", min: 2, stars: 2 },
  { label: "1 ke atas", min: 1, stars: 1 },
];

function StarRow({ filled, total = 4 }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: total }).map((_, i) => (
        <svg
          key={i}
          className={`w-3 h-3 ${i < filled ? "text-amber-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118L10 14.347l-3.35 2.437c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.664 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
        </svg>
      ))}
    </span>
  );
}

function FilterChip({ label, active, onClick, extra }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-2.5 text-sm px-3 py-2 rounded-xl text-left transition
        ${active
          ? "bg-[#EEEDFE] text-[#3C3489] font-medium"
          : "text-gray-500 hover:bg-gray-50"
        }
      `}
    >
      <span
        className={`
          w-4 h-4 flex-shrink-0 rounded flex items-center justify-center border transition
          ${active
            ? "bg-[#534AB7] border-[#534AB7]"
            : "border-gray-300 bg-white"
          }
        `}
      >
        {active && (
          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
            <path d="M1.5 5l2.5 2.5 4.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {extra && <span>{extra}</span>}
      <span>{label}</span>
    </button>
  );
}

export default function TechStack() {
  const navigate = useNavigate();
  const { user } = useCurrentUser();

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("terbaru");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [completedGames, setCompletedGames] = useState({});
  const [playingId, setPlayingId] = useState(null);
  const [xpToast, setXpToast] = useState(null);

  // Load which games this user has already played
  useEffect(() => {
    if (!user?.uid) return;
    const checkAll = async () => {
      const results = {};
      await Promise.all(
        games.map(async (g) => {
          const done = await isNodeCompleted(user.uid, `game-${g.slug}`);
          if (done) results[g.slug] = true;
        })
      );
      setCompletedGames(results);
    };
    checkAll();
  }, [user]);

  const handleMarkPlayed = async (game, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user?.uid) { alert("Silakan login terlebih dahulu."); return; }
    if (completedGames[game.slug]) return;
    setPlayingId(game.slug);
    const result = await addXP(
      user.uid,
      50,
      `Game dimainkan: ${game.title}`,
      `game-${game.slug}`
    );
    setPlayingId(null);
    if (result.success) {
      setCompletedGames(prev => ({ ...prev, [game.slug]: true }));
      setXpToast({ title: game.title, xp: 50 });
      setTimeout(() => setXpToast(null), 3500);
    } else if (result.error === "Sudah diklaim sebelumnya.") {
      setCompletedGames(prev => ({ ...prev, [game.slug]: true }));
    }
  };
  
  const toggleTopic = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
    setCurrentPage(1);
  };

  const getDifficulty = (score) => {
    if (score >= 4.5) return "Expert";
    if (score >= 4.0) return "Intermediate";
    return "Beginner";
  };

  const filteredGames = useMemo(() => {
  return [...games]
    .filter((game) => {
      const keyword = search.toLowerCase();

      const matchSearch =
        game.title?.toLowerCase().includes(keyword) ||
        game.topic?.toLowerCase().includes(keyword) ||
        game.category?.toLowerCase().includes(keyword);

      const matchTopic =
      selectedTopics.length === 0 ||
      selectedTopics.some((t) =>
        game.topic?.toLowerCase().includes(t.toLowerCase())
  );

      const matchDifficulty =
      !selectedDifficulty ||
      getDifficulty(game.expertScore) ===
      selectedDifficulty;

      const matchRating =
        !selectedRating ||
        game.expertScore >= selectedRating;

      return (
        matchSearch &&
        matchTopic &&
        matchDifficulty &&
        matchRating
      );
    })

    .sort((a, b) => {
      if (sortBy === "rating") {
        return b.expertScore - a.expertScore;
      }

      if (sortBy === "name") {
        return a.title.localeCompare(b.title);
      }

      if (sortBy === "terbaru") {
        return (
          new Date(b.createdAt) -
          new Date(a.createdAt)
        );
      }

      return 0;
    });
}, [
  search,
  sortBy,
  selectedTopics,
  selectedDifficulty,
  selectedRating,
]);

  const totalPages = Math.max(1, Math.ceil(filteredGames.length / ITEMS_PER_PAGE));
  const paginated = filteredGames.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      )
        pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-[#F8F5FF] p-6 md:p-8">
      {/* XP TOAST */}
      {xpToast && (
        <div className="fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl"
          style={{ background: "linear-gradient(135deg,#5B21B6,#7C3AED)", color: "white", animation: "fadeInUp 0.3s ease" }}>
          <span className="text-2xl">🎮</span>
          <div>
            <p className="font-bold text-sm">+{xpToast.xp} XP Didapat!</p>
            <p className="text-xs text-white/80">{xpToast.title} dimainkan</p>
          </div>
        </div>
      )}
     {/* HERO */}
      <div className="relative min-h-[520px] md:min-h-[320px] rounded-[32px] overflow-hidden mb-10">
        <button
  onClick={() => navigate(-1)}
  className="absolute top-6 left-6 z-20 text-white hover:text-gray-200 transition"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-8 h-8"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 19l-7-7 7-7"
    />
  </svg>
</button>
        <img
          src={curatedImage}
          alt="Curated Tech Stack"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
        <div className="relative z-10 h-full flex items-start md:items-center">
          <div className="max-w-3xl px-6 md:px-12 pt-10 md:pt-0 text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-sm font-semibold mb-5 mt-8 md:mt-0">
              🔬 EGQI VERIFIED
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
              Curated Tech Stack
            </h1>
            <p className="text-base md:text-lg text-white/85 leading-relaxed max-w-xl">
              Temukan game edukasi terbaik yang telah dikurasi menggunakan
              Educational Game Quality Instrument (EGQI) untuk membantu
              pembelajaran yang lebih interaktif dan efektif.
            </p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="grid lg:grid-cols-[220px_1fr] gap-6">

        {/* ── SIDEBAR ── */}
        <div className="bg-white rounded-2xl p-5 h-fit border border-gray-100 shadow-sm lg:mt-[50px]">

          <p className="text-base font-semibold text-gray-900 mb-4">Filter</p>

          {/* Topik */}
          <div className="mb-5">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Topik</p>
            <div className="space-y-0.5">
              <FilterChip
                label="Semua Topik"
                active={selectedTopics.length === 0}
                onClick={() => { setSelectedTopics([]); setCurrentPage(1); }}
              />
              {TOPICS.map((t) => (
                <FilterChip
                  key={t}
                  label={t}
                  active={selectedTopics.includes(t)}
                  onClick={() => toggleTopic(t)}
                />
              ))}
            </div>
          </div>

          {/* Tingkat Kesulitan */}
          <div className="mb-5">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Tingkat Kesulitan</p>
            <div className="space-y-0.5">
              <FilterChip
                label="Semua Tingkat"
                active={!selectedDifficulty}
                onClick={() => { setSelectedDifficulty(null); setCurrentPage(1); }}
              />
              {DIFFICULTIES.map((d) => (
                <FilterChip
                  key={d}
                  label={d}
                  active={selectedDifficulty === d}
                  onClick={() => { setSelectedDifficulty(d); setCurrentPage(1); }}
                />
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2">Rating</p>
            <div className="space-y-0.5">
              <FilterChip
                label="Semua Rating"
                active={!selectedRating}
                onClick={() => { setSelectedRating(null); setCurrentPage(1); }}
              />
              {RATINGS.map((r) => (
                <FilterChip
                  key={r.min}
                  label={r.label}
                  active={selectedRating === r.min}
                  onClick={() => { setSelectedRating(r.min); setCurrentPage(1); }}
                  extra={<StarRow filled={r.stars} />}
                />
              ))}
            </div>
          </div>

        </div>

        {/* ── CONTENT ── */}
        <div>
{/* SEARCH */}
  <div className="mb-5">
    <div className="relative">
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>

      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        placeholder="Cari game..."
        className="
          w-full
          bg-white
          border border-gray-200
          rounded-2xl
          pl-12
          pr-4
          py-3
          text-sm
          focus:outline-none
          focus:ring-2
          focus:ring-[#7C3AED]
          focus:border-transparent
        "
      />
    </div>
  </div>
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <p className="text-sm text-gray-500">
              Total <span className="font-semibold text-gray-800">{filteredGames.length} game</span> yang telah dikurasi
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Urutkan</span>
              <select
                value={sortBy}
                onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent cursor-pointer"
              >
                <option value="terbaru">Terbaru</option>
                <option value="rating">Rating Tertinggi</option>
                <option value="name">Nama A-Z</option>
              </select>
            </div>
          </div>

          {/* Game list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
            {paginated.map((game, index) => (
              <div
                key={game.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#C4B5FD] hover:shadow-md transition-all group flex flex-col h-full"
          >
                {/* THUMBNAIL */}
<div className="h-[110px] relative overflow-hidden">

  <span className="absolute top-3 left-3 z-10 bg-black/35 text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
    {game.gradeLevel}
  </span>

  <img
    src={game.thumbnail}
    alt={game.title}
    className="w-full h-full object-cover"
  />

</div>

                {/* CONTENT */}
                <div className="p-4 flex flex-col flex-1">

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    <span className="bg-[#EEEDFE] text-[#3C3489] px-2.5 py-0.5 rounded-full text-xs font-medium">
                      {game.category}
                    </span>
                    {game.topic && (
                      <span className="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full text-xs font-medium">
                        {game.topic}
                      </span>
                    )}
                    {game.platform && (
                      <span className="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full text-xs font-medium">
                        {game.platform}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-[#534AB7] transition leading-snug">
                    {game.title}
                  </h2>

                  {/* Description */}
                  {game.description && (
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 min-h-[40px]">
                      {game.description}
                    </p>
                  )}

                  {/* Scores */}
                  <div className="flex flex-wrap gap-2 mt-3 mb-3">
                    <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-medium">
                      ⭐ Expert {game.expertScore}
                    </span>
                    <span className="bg-[#EEEDFE] text-[#3C3489] px-3 py-1 rounded-full text-xs font-medium">
                      👩‍🏫 Teacher {game.teacherScore}
                    </span>
                  </div>

                  {/* CTA Buttons */}
                  <div className="grid grid-cols-2 gap-2 mt-auto">
                    <Link
                      to={`/game/${game.slug}`}
                      className="w-full text-center px-4 py-2 border border-[#7C3AED] text-[#7C3AED] rounded-xl text-xs font-semibold hover:bg-[#EEEDFE] transition"
                    >
                      📄 Lihat Detail
                    </Link>
                    <a
                      href={game.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center px-4 py-2 bg-[#7C3AED] text-white rounded-xl text-xs font-semibold hover:bg-[#6D28D9] transition"
                    >
                      ▶ Mainkan
                    </a>
                  </div>
                  {/* Mark as Played */}
                  <button
                    onClick={(e) => handleMarkPlayed(game, e)}
                    disabled={completedGames[game.slug] || playingId === game.slug}
                    className="w-full mt-2 py-2 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5"
                    style={
                      completedGames[game.slug]
                        ? { background: "#ECFDF5", color: "#16A34A", cursor: "default" }
                        : { background: "#FDF2F8", color: "#EC4899" }
                    }
                  >
                    {playingId === game.slug ? (
                      <><div className="w-3 h-3 border-2 border-pink-300 border-t-pink-600 rounded-full animate-spin"/> Menyimpan...</>
                    ) : completedGames[game.slug] ? (
                      "✅ Sudah Dimainkan (+50 XP)"
                    ) : (
                      "🎮 Sudah Mainkan (+50 XP)"
                    )}
                  </button>

                </div>
              </div>
            ))}
          </div>

          {/* EMPTY STATE */}
          {filteredGames.length === 0 && (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
              <div className="text-5xl mb-4">🎮</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">Game tidak ditemukan</h3>
              <p className="text-gray-400 text-sm">Coba gunakan kata kunci atau filter lain.</p>
            </div>
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1.5 mt-6">

              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {getPageNumbers().map((page, idx) =>
                page === "..." ? (
                  <span key={`ellipsis-${idx}`} className="w-8 h-8 flex items-center justify-center text-gray-400 text-sm">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition ${
                      currentPage === page
                        ? "bg-[#7C3AED] text-white"
                        : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

