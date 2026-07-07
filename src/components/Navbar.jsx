import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // SCROLL HOME
  const scrollToHome = () => {
    setOpen(false);

    const element = document.getElementById("home");

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");

      setTimeout(() => {
        const el = document.getElementById("home");
        el?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  // SCROLL FITUR
  const scrollToFitur = () => {
    setOpen(false);

    const element = document.getElementById("fitur");

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");

      setTimeout(() => {
        const el = document.getElementById("fitur");
        el?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <nav className="w-full bg-white/95 backdrop-blur-md shadow-sm fixed top-0 left-0 z-50">

      {/* CONTAINER */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <div
          onClick={scrollToHome}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img
            src={logo}
            alt="logo gurubermutu"
            className="w-8 h-8 object-contain"
          />

          <h1 className="font-bold text-xl text-[#700087]">
            Gurubermutu.id
          </h1>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">

          <button
            onClick={scrollToHome}
            className="hover:text-[#5B21B6] transition"
          >
            Home
          </button>

          <button
            onClick={scrollToFitur}
            className="hover:text-[#5B21B6] transition"
          >
            Fitur
          </button>
          <button
            onClick={() => navigate("/admin-login")}
            className="hover:text-[#5B21B6] transition"
        >
            Admin
          </button>
          <button
            onClick={() => navigate("/login")}
            className="
              bg-[#700087]
              text-white
              px-5
              py-2.5
              rounded-xl
              hover:scale-105
              transition
              shadow-md
            "
          >
            Sign in
          </button>
        </div>

        {/* HAMBURGER */}
        <button
          onClick={() => setOpen(!open)}
          className="
            md:hidden
            text-3xl
            text-gray-800
            transition
          "
        >
          {open ? "✕" : "☰"}
        </button>

      </div>

      {/* MOBILE MENU */}
      <div
        className={`
          md:hidden
          overflow-hidden
          transition-all
          duration-300
          ease-in-out

          ${
            open
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >
        <div
          className="
            px-6
            pb-6
            pt-2

            bg-white/95
            backdrop-blur-md

            shadow-lg
            border-t

            flex
            flex-col
            gap-4
          "
        >

          <button
            onClick={scrollToHome}
            className="
              w-full
              text-left
              text-lg
              font-medium
              text-gray-700

              py-2

              hover:text-[#5B21B6]
              transition
            "
          >
            Home
          </button>

          <button
            onClick={scrollToFitur}
            className="
              w-full
              text-left
              text-lg
              font-medium
              text-gray-700

              py-2

              hover:text-[#5B21B6]
              transition
            "
          >
            Fitur
          </button>
          <button
           onClick={() => {
             setOpen(false);
             navigate("/admin-login");
             }}
  className="
    w-full
    text-left
    text-lg
    font-medium
    text-gray-700
    py-2
    hover:text-[#5B21B6]
    transition
  "
>
  Admin
</button>
          <button
            onClick={() => {
              setOpen(false);
              navigate("/login");
            }}
            className="
              w-full
              mt-2

              bg-[#700087]
              text-white

              px-4
              py-3

              rounded-xl
              font-medium

              shadow-md
              hover:scale-[1.02]

              transition
            "
          >
            Sign in
          </button>

        </div>
      </div>

    </nav>
  );
}

export default Navbar;