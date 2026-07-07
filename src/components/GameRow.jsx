
export default function GameRow({ game, onEdit }) {
  return (
    <tr className="border-b border-gray-50 hover:bg-[#FAFAFF] transition">
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="w-14 h-10 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
            <img
  src={game.thumbnail}
  alt={game.title}
  className="w-full h-full object-cover"
/>
          </div>
          <span className="font-semibold text-gray-900 text-[13px]">{game.title}</span>
        </div>
      </td>
      <td className="px-5 py-3.5 text-gray-600 text-xs max-w-[180px] truncate">{game.topic}</td>
      <td className="px-5 py-3.5">
        <span className="text-[10.5px] font-semibold px-2.5 py-1 rounded-full bg-[#EEEDFE] text-[#5B21B6]">
          {game.gradeLevel}
        </span>
      </td>
      <td className="px-5 py-3.5 text-gray-600 text-xs">{game.genre}</td>
      <td className="px-5 py-3.5">
        <span className="text-[10.5px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700">
          ⭐ {game.expertScore}
        </span>
      </td>
      <td className="px-5 py-3.5">
        <a href={game.url} target="_blank" rel="noopener noreferrer" className="text-[#7C3AED] text-xs font-semibold hover:underline">
          Buka ↗
        </a>
      </td>
      <td className="px-5 py-3.5">
        <div className="flex items-center justify-end gap-1.5">
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
      </td>
    </tr>
  );
}