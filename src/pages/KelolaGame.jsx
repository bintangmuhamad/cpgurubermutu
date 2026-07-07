import { useState, useMemo } from "react";
import AdminLayout from "./AdminLayout";
import games from "../data/games";
import GameRow from "../components/GameRow";
import GameCard from "../components/Gamecard";
import GameFormModal from "../components/GameFormModal";

export default function KelolaGame() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingGame, setEditingGame] = useState(null);

  const filtered = useMemo(
    () => games.filter((g) => g.title.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  const openAddModal = () => {
    setEditingGame(null);
    setShowModal(true);
  };

  const openEditModal = (game) => {
    setEditingGame(game);
    setShowModal(true);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-[1.6rem] font-bold text-gray-900 tracking-tight mb-0.5">Kelola Game</h1>
          <p className="text-[13.5px] text-gray-400">Tambah, ubah, atau hapus data game edukasi</p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#7C3AED] text-white text-sm font-semibold hover:bg-[#6D28D9] transition flex-shrink-0"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Tambah Game
        </button>
      </div>

      <div className="relative mb-5">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          type="text"
          placeholder="Cari nama game..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent transition"
        />
      </div>

      {/* DESKTOP: TABLE */}
      <div className="hidden md:block bg-white rounded-[15px] border border-[#f0edfb] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[1000px] text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-[#FAFAFF]">
                <th className="text-left font-semibold text-gray-500 text-xs px-5 py-3.5">Game</th>
                <th className="text-left font-semibold text-gray-500 text-xs px-5 py-3.5">Topik</th>
                <th className="text-left font-semibold text-gray-500 text-xs px-5 py-3.5 min-w-[120px]">Grade</th>
                <th className="text-left font-semibold text-gray-500 text-xs px-5 py-3.5">Genre</th>
                <th className="text-left font-semibold text-gray-500 text-xs px-5 py-3.5">Skor Expert</th>
                <th className="text-left font-semibold text-gray-500 text-xs px-5 py-3.5">Link</th>
                <th className="text-right font-semibold text-gray-500 text-xs px-5 py-3.5">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((game) => (
                <GameRow key={game.id} game={game} onEdit={openEditModal} />
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400 text-sm">
                    Tidak ada game yang cocok dengan pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE: CARDS */}
      <div className="md:hidden space-y-3">
        {filtered.map((game) => (
          <GameCard key={game.id} game={game} onEdit={openEditModal} />
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm bg-white rounded-2xl border border-[#f0edfb]">
            Tidak ada game yang cocok dengan pencarian.
          </div>
        )}
      </div>

      {showModal && <GameFormModal editingGame={editingGame} onClose={() => setShowModal(false)} />}
    </AdminLayout>
  );
}