import { useState } from "react";
import AdminLayout from "./AdminLayout";
import games from "../data/games";

const DIMENSIONS = [
  {
    key: "pq",
    label: "Pedagogical Quality (PQ)",
    desc: "Dukungan proses belajar",
    color: "#7C3AED",
    items: [
      { code: "PQ1", text: "Aktivitas dalam game mendukung pencapaian tujuan pembelajaran matematika." },
      { code: "PQ2", text: "Game mendorong siswa untuk berpikir dan memecahkan masalah matematika." },
      { code: "PQ3", text: "Game memberikan umpan balik yang membantu siswa memahami kesalahan mereka." },
      { code: "PQ4", text: "Game dapat digunakan sebagai bagian dari strategi pembelajaran di kelas." },
    ],
  },
  {
    key: "cq",
    label: "Content Quality (CQ)",
    desc: "Akurasi materi",
    color: "#2563EB",
    items: [
      { code: "CQ1", text: "Materi matematika yang disajikan dalam game akurat secara konsep." },
      { code: "CQ2", text: "Materi dalam game sesuai dengan kurikulum yang berlaku." },
      { code: "CQ3", text: "Tingkat kesulitan soal atau aktivitas matematika sesuai dengan jenjang siswa." },
      { code: "CQ4", text: "Konsep matematika disajikan secara konsisten dan tidak menimbulkan miskonsepsi." },
    ],
  },
  {
    key: "gq",
    label: "Gameplay Quality (GQ)",
    desc: "Mekanik permainan",
    color: "#059669",
    items: [
      { code: "GQ1", text: "Aturan permainan mudah dipahami." },
      { code: "GQ2", text: "Tantangan yang diberikan game sesuai dengan kemampuan siswa." },
      { code: "GQ3", text: "Mekanik permainan mendukung proses belajar, bukan hanya hiburan." },
      { code: "GQ4", text: "Game mampu mempertahankan minat siswa untuk terus bermain." },
    ],
  },
  {
    key: "eq",
    label: "Engagement Quality (EQ)",
    desc: "Keterlibatan siswa",
    color: "#D97706",
    items: [
      { code: "EQ1", text: "Game mampu menarik perhatian siswa sejak awal permainan." },
      { code: "EQ2", text: "Game membuat siswa termotivasi untuk menyelesaikan aktivitas pembelajaran." },
      { code: "EQ3", text: "Siswa menunjukkan antusiasme selama bermain game." },
      { code: "EQ4", text: "Siswa merasa senang saat menggunakan game untuk belajar matematika." },
    ],
  },
  {
    key: "prq",
    label: "Practicality Quality (PrQ)",
    desc: "Kemudahan implementasi",
    color: "#DB2777",
    items: [
      { code: "PrQ1", text: "Game mudah dipersiapkan sebelum digunakan dalam pembelajaran." },
      { code: "PrQ2", text: "Game dapat digunakan tanpa memerlukan pelatihan khusus bagi guru." },
      { code: "PrQ3", text: "Game dapat diterapkan sesuai dengan kondisi sarana dan prasarana sekolah." },
      { code: "PrQ4", text: "Waktu yang diperlukan untuk menggunakan game sesuai dengan alokasi pembelajaran." },
    ],
  },
];

const SCALE_LABELS = {
  1: "Sangat Tidak Setuju",
  2: "Tidak Setuju",
  3: "Netral",
  4: "Setuju",
  5: "Sangat Setuju",
};

function ScoreSelector({ value, onChange }) {
  return (
    <div className="flex gap-1.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          title={SCALE_LABELS[n]}
          className={`w-8 h-8 rounded-lg text-xs font-bold transition ${
            value === n
              ? "bg-[#7C3AED] text-white"
              : "bg-gray-50 text-gray-400 hover:bg-gray-100"
          }`}
        >
          {n}
        </button>
      ))}
    </div>
  );
}

export default function PenilaianAhli() {
  const [selectedGameId, setSelectedGameId] = useState(games[0]?.id);
  const [scores, setScores] = useState({});

  const selectedGame = games.find((g) => g.id === selectedGameId);

  const setScore = (code, value) => {
    setScores((prev) => ({ ...prev, [code]: value }));
  };

  const dimensionAverage = (dim) => {
    const vals = dim.items.map((i) => scores[i.code]).filter(Boolean);
    if (vals.length === 0) return null;
    return (vals.reduce((a, b) => a + b, 0) / dim.items.length).toFixed(2);
  };

  const allAnswered = DIMENSIONS.every((d) =>
    d.items.every((i) => scores[i.code] !== undefined)
  );

  const handleSubmit = () => {
    const payload = {
      gameId: selectedGame.id,
      scores,
      dimensionAverages: Object.fromEntries(
        DIMENSIONS.map((d) => [d.key, dimensionAverage(d)])
      ),
    };
    console.log("Submit penilaian:", payload);
    alert("Penilaian berhasil disimpan! (cek console untuk payload)");
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-[1.6rem] font-bold text-gray-900 tracking-tight mb-0.5">
          Penilaian Ahli (EGQI)
        </h1>
        <p className="text-[13.5px] text-gray-400">
          Educational Game Quality Evaluation Instrument
        </p>
      </div>

      <div className="bg-white rounded-[20px] p-5 border border-[#f0edfb] mb-5">
        <label className="block text-xs font-semibold text-gray-600 mb-2">Pilih Game yang Akan Dinilai</label>
        <select
          value={selectedGameId}
          onChange={(e) => { setSelectedGameId(Number(e.target.value)); setScores({}); }}
          className="w-full sm:w-96 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] cursor-pointer"
        >
          {games.map((g) => (
            <option key={g.id} value={g.id}>{g.title}</option>
          ))}
        </select>

        {selectedGame && (
          <div className="flex items-center gap-3 mt-4 p-3 bg-[#FAFAFF] rounded-2xl">
            <div className="w-16 h-11 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0">
   <img
  src={selectedGame.thumbnail}
  alt={selectedGame.title}
  className="w-full h-full object-cover"
/>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{selectedGame.title}</p>
              <p className="text-xs text-gray-400 truncate">{selectedGame.topic}</p>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {DIMENSIONS.map((dim) => {
          const avg = dimensionAverage(dim);
          return (
            <div key={dim.key} className="bg-white rounded-[20px] p-5 border border-[#f0edfb]">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: dim.color }} />
                  <p className="text-sm font-bold text-gray-900">{dim.label}</p>
                </div>
                {avg && (
                  <span className="text-xs font-bold px-3 py-1 rounded-full flex-shrink-0" style={{ background: `${dim.color}1A`, color: dim.color }}>
                    Rata-rata: {avg}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 mb-4 ml-5">{dim.desc}</p>

              <div className="space-y-3">
                {dim.items.map((item) => (
                  <div key={item.code} className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-4 p-3 rounded-xl hover:bg-[#FAFAFF] transition">
                    <div className="flex-1 flex items-start gap-2.5">
                      <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md flex-shrink-0 mt-0.5">
                        {item.code}
                      </span>
                      <p className="text-xs text-gray-600 leading-relaxed">{item.text}</p>
                    </div>
                    <ScoreSelector value={scores[item.code]} onChange={(v) => setScore(item.code, v)} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between mt-6 bg-white rounded-[20px] p-5 border border-[#f0edfb]">
        <p className="text-xs text-gray-500">
          {allAnswered ? "Semua item sudah dinilai. Siap disimpan." : "Lengkapi semua item penilaian sebelum menyimpan."}
        </p>
        <button
          onClick={handleSubmit}
          disabled={!allAnswered}
          className="px-6 py-2.5 rounded-xl bg-[#7C3AED] text-white text-sm font-semibold hover:bg-[#6D28D9] disabled:opacity-40 disabled:cursor-not-allowed transition flex-shrink-0"
        >
          Simpan Penilaian
        </button>
      </div>
    </AdminLayout>
  );
}