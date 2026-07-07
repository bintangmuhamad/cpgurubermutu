import { useNavigate } from "react-router-dom";

export default function NavigationButtons({
  showBack = true,
  showForward = true,
}) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center w-full mb-6">

      <div>
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="
              w-10 h-10
              rounded-xl
              bg-white
              border border-gray-200
              shadow-sm
              flex items-center justify-center
              hover:bg-gray-50
              transition
            "
          >
            &lt;
          </button>
        )}
      </div>

      <div>
        {showForward && (
          <button
            onClick={() => navigate(1)}
            className="
              w-10 h-10
              rounded-xl
              bg-white
              border border-gray-200
              shadow-sm
              flex items-center justify-center
              hover:bg-gray-50
              transition
            "
          >
            &gt;
          </button>
        )}
      </div>

    </div>
  );
}