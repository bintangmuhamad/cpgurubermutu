import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { subscribeWorkshops, deleteWorkshop } from "../services/workshopService";
import { useCurrentUser } from "../hooks/useCurrentUser";

const timeFilters = ["Semua", "Untukmu", "Hari Ini", "Akhir Pekan"];

const Workshop = () => {
  const navigate = useNavigate();
  const { user } = useCurrentUser();

  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("Semua Lokasi");
  const [activeTime, setActiveTime] = useState("Semua");
  const [savedIds, setSavedIds] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [detectedLocation] = useState("Yogyakarta");

  useEffect(() => {
    const unsub = subscribeWorkshops((data) => {
      setWorkshops(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const toggleSave = (id, e) => {
    e.stopPropagation();
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleDelete = async (item, e) => {
    e.stopPropagation();
    setOpenMenuId(null);
    const ok = window.confirm(`Hapus workshop "${item.title}"? Tindakan ini tidak bisa dibatalkan.`);
    if (!ok) return;
    try {
      await deleteWorkshop(item.id);
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus workshop. Coba lagi.");
    }
  };

  const handleEdit = (item, e) => {
    e.stopPropagation();
    setOpenMenuId(null);
    navigate(`/workshop/edit/${item.id}`);
  };

  const filteredWorkshop = workshops.filter((item) => {
    const matchLocation =
      selectedLocation === "Semua Lokasi" || item.location === selectedLocation;
    const matchSearch = (item.title || "").toLowerCase().includes(search.toLowerCase());
    return matchLocation && matchSearch;
  });

  return (
    <div className="min-h-screen" style={{ background: "#F5F3FF" }}>
      {/* HERO */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-4 md:pt-8">
        <div
          className="relative rounded-[24px] md:rounded-[28px] overflow-hidden"
          style={{ background: "#2D1B69", minHeight: 260 }}
        >
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 260">
            {[0, 1, 2, 3, 4, 5].map((row) =>
              [0, 1, 2, 3, 4, 5].map((col) => (
                <circle key={`d-${row}-${col}`} cx={col * 40 + 20} cy={row * 40 + 10} r="1.5" fill="white" opacity="0.12" />
              ))
            )}
            <circle cx="690" cy="120" r="150" fill="none" stroke="white" strokeWidth="0.8" opacity="0.1" />
            <circle cx="690" cy="120" r="110" fill="none" stroke="white" strokeWidth="0.8" opacity="0.1" />
            <circle cx="690" cy="120" r="70" fill="none" stroke="white" strokeWidth="0.8" opacity="0.12" />
            <circle cx="710" cy="90" r="40" fill="#3D2380" opacity="0.8" />
            <ellipse cx="710" cy="90" rx="55" ry="10" fill="none" stroke="white" strokeWidth="1.2" opacity="0.25" transform="rotate(-20 710 90)" />
            {[[120, 40], [220, 25], [360, 35], [510, 20], [600, 60], [110, 190], [320, 200], [470, 220], [640, 200], [760, 150]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="1.5" fill="white" opacity="0.6" />
            ))}
            <g transform="translate(600, 150)" opacity="0.18">
              <rect x="0" y="0" width="50" height="65" rx="4" fill="white" />
              <rect x="5" y="8" width="35" height="3" rx="1.5" fill="#2D1B69" />
              <rect x="5" y="16" width="30" height="3" rx="1.5" fill="#2D1B69" />
              <rect x="5" y="24" width="25" height="3" rx="1.5" fill="#2D1B69" />
              <rect x="5" y="32" width="32" height="3" rx="1.5" fill="#2D1B69" />
            </g>
            <g transform="translate(660, 160)" opacity="0.15">
              <rect x="0" y="0" width="8" height="55" rx="3" fill="white" transform="rotate(-20 4 27)" />
              <polygon points="0,-4 8,-4 4,4" fill="#F59E0B" transform="rotate(-20 4 27)" />
            </g>
            <g transform="translate(510, 175)" opacity="0.2">
              <ellipse cx="18" cy="10" rx="22" ry="6" fill="white" />
              <rect x="8" y="0" width="20" height="12" rx="2" fill="white" />
              <rect x="16" y="-5" width="4" height="8" rx="1" fill="white" />
              <circle cx="18" cy="-5" r="3" fill="white" />
              <line x1="30" y1="6" x2="36" y2="18" stroke="white" strokeWidth="2" />
              <circle cx="36" cy="20" r="3" fill="white" />
            </g>
          </svg>

          <button
            onClick={() => navigate("/dashboard")}
            className="absolute top-4 left-4 md:top-6 md:left-6 z-20 text-white hover:text-gray-200 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-10 py-12 md:py-16">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "#F59E0B" }}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Menampilkan event dekat {detectedLocation}
            </span>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">Workshop GuruBermutu</h1>
            <p className="text-white/75 text-sm md:text-lg max-w-2xl leading-relaxed">
              Temukan workshop, webinar, dan pelatihan terbaik untuk meningkatkan kompetensi guru.
            </p>
          </div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white border-b border-purple-100 sticky top-0 z-10 mt-4 md:mt-6">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {timeFilters.map((tf) => (
                <button
                  key={tf}
                  onClick={() => setActiveTime(tf)}
                  className="px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition"
                  style={
                    activeTime === tf
                      ? { background: "#5B21B6", color: "#fff" }
                      : { background: "#F5F3FF", color: "#6B7280" }
                  }
                >
                  {tf}
                </button>
              ))}
            </div>

            {user && (
              <button
                onClick={() => navigate("/workshop/buat")}
                className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-sm font-semibold shadow-sm hover:opacity-90 active:scale-[0.98] transition"
                style={{ background: "#5B21B6" }}
              >
                <span className="text-base leading-none">+</span> Buat Workshop
              </button>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="7" strokeLinecap="round" />
                <path strokeLinecap="round" d="M21 21l-4.3-4.3" />
              </svg>
              <input
                type="text"
                placeholder="Cari workshop, mis. 'Canva' atau 'AI'..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-purple-100 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
              />
            </div>

            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="border border-purple-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
            >
              <option>Semua Lokasi</option>
              <option>Yogyakarta</option>
              <option>Jakarta</option>
              <option>Bandung</option>
            </select>
          </div>
        </div>
      </div>

      {/* LIST */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-10">
        <div className="flex items-baseline justify-between mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Workshop Tersedia</h2>
          <span className="text-xs md:text-sm text-gray-400">{filteredWorkshop.length} workshop ditemukan</span>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Memuat workshop...</div>
        ) : filteredWorkshop.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            Tidak ada workshop yang cocok. Coba kata kunci atau lokasi lain.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            {filteredWorkshop.map((item) => {
              const isSaved = savedIds.includes(item.id);
              const slotsLeft = (item.quota || 0) - (item.registered || 0);
              const pctFull = item.quota ? Math.round((item.registered / item.quota) * 100) : 0;

              const isOwner = user && (item.created_by === user.uid || item.createdBy === user.uid);
              const isAdmin = user?.role === "admin";
              const canManage = isOwner || isAdmin;

              return (
                <div
                  key={item.id}
                  onClick={() => navigate(`/workshop/${item.id}`)}
                  className="group relative bg-white rounded-2xl overflow-hidden border border-purple-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={item.thumbnail || item.image}
                      alt={item.title}
                      className="w-full h-40 md:h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    <button
                      onClick={(e) => toggleSave(item.id, e)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow hover:scale-110 transition"
                    >
                      <svg className="w-4 h-4 transition" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                        style={isSaved ? { fill: "#EC4899", color: "#EC4899" } : { fill: "none", color: "#5B21B6" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21l-7.682-8.318a4.5 4.5 0 010-6.364z" />
                      </svg>
                    </button>

                    <span className="absolute bottom-3 left-3 text-[10px] font-semibold px-2 py-1 rounded-full text-white backdrop-blur" style={{ background: "rgba(45,27,105,0.8)" }}>
                      {item.mode}
                    </span>
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <span className="self-start text-xs font-medium px-2 py-1 rounded-full" style={{ background: "#FDF2F8", color: "#EC4899" }}>
                        {item.category}
                      </span>

                      {canManage && (
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuId(openMenuId === item.id ? null : item.id);
                            }}
                            className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                              <circle cx="5" cy="12" r="2" />
                              <circle cx="12" cy="12" r="2" />
                              <circle cx="19" cy="12" r="2" />
                            </svg>
                          </button>

                          {openMenuId === item.id && (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className="absolute right-0 top-8 z-20 w-32 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
                            >
                              <button
                                onClick={(e) => handleEdit(item, e)}
                                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 flex items-center gap-2"
                              >
                                ✏️ Edit
                              </button>
                              <button
                                onClick={(e) => handleDelete(item, e)}
                                className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                              >
                                🗑️ Hapus
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <h3 className="font-bold text-base mt-3 mb-1 text-gray-800 leading-snug line-clamp-2 min-h-[2.6em]">
                      {item.title}
                    </h3>

                    <p className="text-xs text-gray-400 mb-3">
                      oleh {item.created_by_name || item.organizer || item.createdByName}
                    </p>

                    <div className="space-y-1 text-sm text-gray-500">
                      <p className="flex items-center gap-1.5">📍 {item.location}</p>
                      <p className="flex items-center gap-1.5">📅 {item.date}</p>
                    </div>

                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>{item.registered || 0}/{item.quota || 0} peserta</span>
                        <span>{slotsLeft <= 10 && item.quota ? `Sisa ${slotsLeft} slot` : ""}</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#F3E8FF" }}>
                        <div className="h-full rounded-full transition-all" style={{ width: `${pctFull}%`, background: "#F59E0B" }} />
                      </div>
                    </div>

                    <div className="flex-1" />

                    <button
                      onClick={() => navigate(`/workshop/${item.id}`)}
                      className="w-full mt-4 text-white py-2.5 rounded-xl text-sm font-medium transition hover:opacity-90 active:scale-[0.98]"
                      style={{ background: "#5B21B6" }}
                    >
                      Lihat Detail
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Workshop;