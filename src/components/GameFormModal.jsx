export default function GameFormModal({ editingGame, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl w-full max-w-lg p-6 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-gray-900">
            {editingGame ? "Edit Game" : "Tambah Game Baru"}
          </h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nama Game</label>
            <input type="text" defaultValue={editingGame?.title} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]" placeholder="Mis: Detective X" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Deskripsi Singkat</label>
            <textarea defaultValue={editingGame?.description} rows={3} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED] resize-none" placeholder="Penjelasan 1-2 kalimat tema dan misi" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Topik Materi</label>
              <input type="text" defaultValue={editingGame?.topic} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Grade Level</label>
              <input type="text" defaultValue={editingGame?.gradeLevel} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Genre</label>
              <input type="text" defaultValue={editingGame?.genre} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Durasi</label>
              <input type="text" defaultValue={editingGame?.duration} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]" placeholder="Mis: 5-10 Menit" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Link Akses (URL)</label>
            <input type="url" defaultValue={editingGame?.url} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]" placeholder="https://..." />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition">
              Batal
            </button>
            <button
              type="submit"
              onClick={(e) => { e.preventDefault(); onClose(); }}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#7C3AED] text-white text-sm font-semibold hover:bg-[#6D28D9] transition"
            >
              {editingGame ? "Simpan Perubahan" : "Tambah Game"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}