import games from "../data/games";

export default function AllTechStack() {
  return (
    <div className="min-h-screen bg-[#F8F5FF] p-6 md:p-8">

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Semua Game Edukasi
        </h1>

        <p className="text-gray-500 mt-2">
          Daftar lengkap game yang telah dikurasi menggunakan EGQI.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <div
            key={game.id}
            className="
              bg-white
              rounded-[24px]
              overflow-hidden
              border
              border-gray-100
              shadow-sm
              hover:shadow-xl
              transition
            "
          >
            <div className="relative h-48 bg-gradient-to-br from-[#6D28D9] to-[#EC4899] flex items-center justify-center">
              <span className="text-5xl">🎮</span>
            </div>

            <div className="p-5">
              <h3 className="font-bold text-lg min-h-[60px]">
                {game.title}
              </h3>

              <p className="text-gray-500 text-sm">
                {game.category}
              </p>

              <div className="mt-3">
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                  ⭐ {game.expertScore}
                </span>
              </div>

              <button
                className="
                  mt-4
                  w-full
                  py-3
                  rounded-xl
                  border
                  border-gray-300
                  font-semibold
                "
              >
                Lihat Detail
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}