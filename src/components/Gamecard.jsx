
export default function Gamecard({ game, onEdit }) {
    console.log(game.thumbnail);
  return (
    <div className="bg-white rounded-2xl border border-[#f0edfb] p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-16 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
          <img
  src={game.thumbnail}
  alt={game.title}
  className="w-full h-full object-cover"
/>
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-gray-900 text-sm truncate">{game.title}</p>
          <p className="text-xs text-gray-400 truncate">{game.topic}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 mb-3">
        <span className="text-[10.5px] font-semibold px-2.5 py-1 rounded-full bg-[#EEEDFE] text-[#5B21B6]">
          {game.gradeLevel}
        </span>
        <span className="text-[10.5px] font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
          {game.genre}
        </span>
        <span className="text-[10.5px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700">
          ⭐ {game.expertScore}
        </span>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <a
          href={game.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#7C3AED] text-xs font-semibold hover:underline"
        >
          Buka ↗
        </a>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onEdit(game)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-[#7C3AED] hover:border-[#C4B5FD] transition"
            title="Edit"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition"
            title="Hapus"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}