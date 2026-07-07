import { useParams } from "react-router-dom";
import games from "../data/games";

export default function TechStackDetail() {
  const { id } = useParams();

  const game = games.find(
    (item) => item.id === Number(id)
  );

  if (!game) {
    return (
      <div className="p-10 text-3xl">
        Game tidak ditemukan
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F5FF] p-8">

      <div className="bg-white rounded-3xl p-10 shadow">

        <h1 className="text-5xl font-bold mb-4">
          {game.title}
        </h1>

        <p className="text-xl text-gray-600 mb-4">
          {game.category}
        </p>

        <p className="text-lg mb-4">
          {game.gradeLevel}
        </p>

        <div className="bg-yellow-100 inline-block px-4 py-2 rounded-full">
          ⭐ Expert Score {game.expertScore}
        </div>

      </div>

    </div>
  );
}