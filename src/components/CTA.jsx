import React from "react";
import { useNavigate } from "react-router-dom";
import ScrollAnimation from "../components/ScrollAnimation";

const CTA = () => {
  const navigate = useNavigate();

  return (
    <ScrollAnimation>
      <section
        className="
          relative
          overflow-hidden

          py-20
          md:py-24

          px-6

          bg-gradient-to-b
          from-white
          via-[#F7F2FF]
          to-[#EEE7FF]
        "
      >

        {/* BACKGROUND BLUR */}
        <div
          className="
            absolute
            top-0
            left-1/2
            -translate-x-1/2

            w-[450px]
            h-[450px]

            bg-[#E9D5FF]

            rounded-full

            blur-3xl
            opacity-40
          "
        ></div>

        {/* CONTENT */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">

          {/* BADGE */}
          <div
            className="
              inline-flex
              items-center
              gap-2

              px-5
              py-2

              rounded-full

              bg-[#EEE8FF]

              text-[#7C3AED]

              text-xs
              md:text-sm

              font-semibold
              uppercase
              tracking-wide
            "
          >
            <span className="w-2 h-2 rounded-full bg-[#A78BFA]"></span>
            Join Gurubermutu
          </div>

          {/* TITLE */}
          <h2
            className="
              mt-6

              text-3xl
              md:text-5xl

              font-bold
              leading-tight

              text-gray-900
            "
          >
            Siap Menjadi Pendidik
            <br />

            Masa Depan yang
            <span className="text-[#700087]">
              {" "}Future-Ready?
            </span>
          </h2>

          {/* DESC */}
          <p
            className="
              mt-6

              text-sm
              md:text-lg

              text-gray-600

              leading-relaxed

              max-w-2xl
              mx-auto
            "
          >
            Tingkatkan kompetensi, eksplorasi teknologi,
            dan berkembang bersama komunitas guru Gen Z
            dalam satu platform terintegrasi.
          </p>

          {/* BUTTON */}
          <div className="mt-10 flex justify-center">

            <button
              onClick={() => navigate("/register")}
              className="
                relative
                overflow-hidden

                px-8
                md:px-10

                py-4

                rounded-2xl

                bg-[#700087]
                text-white

                font-semibold

                shadow-lg
                shadow-purple-200

                transition-all
                duration-300

                hover:scale-105
                hover:bg-[#700087]
                hover:shadow-2xl

                active:scale-95
              "
            >

              <span className="relative z-10">
                Join Komunitas Guru Masa Depan
              </span>

              {/* SHINE */}
              <div
                className="
                  absolute
                  inset-0

                  opacity-0
                  hover:opacity-100

                  transition

                  bg-gradient-to-r
                  from-transparent
                  via-white/20
                  to-transparent

                  -translate-x-full
                  hover:translate-x-full

                  duration-1000
                "
              ></div>

            </button>

          </div>

        </div>

      </section>
    </ScrollAnimation>
  );
};

export default CTA;