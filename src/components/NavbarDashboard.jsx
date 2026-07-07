import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function NavbarDashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* LOGO */}
        <h1 className="font-bold text-xl text-[#DC1416]">
          Gurubermutu.id
        </h1>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="bg-[#DC1416] text-white px-4 py-2 rounded-lg hover:scale-105 transition"
        >
          Logout
        </button>

      </div>
    </nav>
  );
}

export default NavbarDashboard;