import React from "react";
import logo from "../assets/Logo.png";

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#FAF7FF] pt-16 pb-8 px-6 md:px-16">

      {/* BACKGROUND BLUR */}
      <div
        className="
          absolute
          top-0
          right-0

          w-72
          h-72

          bg-[#E9D5FF]

          rounded-full

          blur-3xl
          opacity-40
        "
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* TOP */}
        <div className="grid md:grid-cols-5 gap-12">

          {/* BRAND */}
          <div className="md:col-span-2">

            {/* LOGO */}
            <div className="flex items-center gap-3 mb-5">

              <img
                src={logo}
                alt="logo gurubermutu"
                className="w-12 h-12 md:w-14 md:h-14 object-contain"
              />

              <div>
                <h2 className="text-2xl font-bold text-[#700087]">
                  Gurubermutu.id
                </h2>

                {/* 🔥 REVISI TAGLINE */}
                <p className="text-sm text-[#700087]/70 font-medium">
                  Scale Impact Together
                </p>
              </div>

            </div>

            {/* DESC */}
            <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-md">
              Platform pemberdayaan guru Gen Z untuk meningkatkan
              kompetensi, eksplorasi teknologi, dan membangun
              pembelajaran yang lebih relevan serta future-ready.
            </p>

            {/* GERCEB */}
            <p className="mt-6 text-sm text-gray-500 leading-relaxed">
              Dikelola oleh{" "}
              <span className="font-semibold text-[#700087]">
                Yayasan Generasi Cerdas Berdaya (GERCEB)
              </span>
            </p>

          </div>

          {/* MENU 1 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              Tentang
            </h3>

            <ul className="space-y-3 text-sm text-gray-600">
              <li className="hover:text-[#700087] cursor-pointer transition">
                Profil
              </li>

              <li className="hover:text-[#700087] cursor-pointer transition">
                Kontak
              </li>

              <li className="hover:text-[#700087] cursor-pointer transition">
                Kebijakan Privasi
              </li>
            </ul>
          </div>

          {/* MENU 2 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              Pembelajaran
            </h3>

            <ul className="space-y-3 text-sm text-gray-600">
              <li className="hover:text-[#700087] cursor-pointer transition">
                Workshop
              </li>

              <li className="hover:text-[#700087] cursor-pointer transition">
                Skill Tree
              </li>

              <li className="hover:text-[#700087] cursor-pointer transition">
                Marketplace
              </li>
            </ul>
          </div>

          {/* MENU 3 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              Komunitas
            </h3>

            <ul className="space-y-3 text-sm text-gray-600">
              <li className="hover:text-[#700087] cursor-pointer transition">
                Grup WhatsApp
              </li>

              <li className="hover:text-[#700087] cursor-pointer transition">
                Event Guru
              </li>

              <li className="hover:text-[#700087] cursor-pointer transition">
                Kolaborasi
              </li>
            </ul>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-[#E9D5FF] mt-12 pt-6">

          <div
            className="
              flex
              flex-col
              md:flex-row

              items-center
              justify-between

              gap-4
            "
          >

            {/* COPYRIGHT */}
            <p className="text-sm text-gray-500 text-center md:text-left">
              © 2026 Gurubermutu.id — All rights reserved.
            </p>

            {/* TAGLINE BOTTOM */}
            <p className="text-sm text-[#700087] font-medium text-center md:text-right">
              Scale Impact Together 🚀
            </p>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;