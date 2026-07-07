import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ScrollAnimation from "../components/ScrollAnimation";

const features = [
  {
    title: "Gamified Skill Tree",
    desc: "Peta kemajuan interaktif untuk memotivasi proses belajar tanpa terasa membosankan.",
    icon: "🎮",
    badge: "Gamifikasi",
  },
  {
    title: "Curated Tech Stack",
    desc: "Kumpulan tools digital pilihan untuk membantu proses mengajar lebih efektif dan modern.",
    icon: "🧠",
    badge: "Teknologi",
  },
  {
    title: "Resource Marketplace",
    desc: "Bagikan dan akses aset digital seperti RPP, template, dan materi ajar dengan mudah.",
    icon: "🛒",
    badge: "Marketplace",
  },
  {
    title: "Workshop Hub",
    desc: "Pelatihan terintegrasi yang membantu meningkatkan kompetensi secara bertahap.",
    icon: "📚",
    badge: "Pelatihan",
  },
];

const N = features.length;

const Features = () => {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const intervalRef = useRef(null);

  // AUTOPLAY
  useEffect(() => {
    if (!hovered) {
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % N);
      }, 1800);
    }

    return () => clearInterval(intervalRef.current);
  }, [hovered]);

  const next = () => setCurrent((prev) => (prev + 1) % N);
  const prev = () => setCurrent((prev) => (prev - 1 + N) % N);
  

  return (
    <section
      id="fitur"
      className="
        relative
        overflow-hidden

        py-20
        md:py-28

        px-6

       bg-white/95 backdrop-blur-sm
        text-center
      "
    >

      {/* BACKGROUND CIRCLE */}
      <div
        className="
          absolute
          -top-32
          -left-32

          w-[320px]
          h-[320px]

          md:w-[500px]
          md:h-[500px]

          rounded-full

          bg-gradient-to-br from-[#F3F0FF] to-[#E9D5FF]

          opacity-90
        "
      ></div>

      {/* HEADER */}
      <div className="relative z-10">

        {/* BADGE */}
        <ScrollAnimation>
          <div
            className="
              inline-flex
              items-center
              gap-2

              px-5
              py-2.5

              rounded-full

              bg-[#EEE8FF]

              text-[#700087]

              text-xs
              md:text-sm

              font-semibold
              tracking-wide
              uppercase
            "
          >
            <span className="w-2 h-2 rounded-full bg-[#A78BFA]"></span>
            Yang Kamu Dapatkan
          </div>
        </ScrollAnimation>

        {/* TITLE */}
        <ScrollAnimation delay={0.1}>
          <h2
            className="
              mt-8

              text-3xl
              md:text-4xl

              font-bold
              leading-tight

              text-gray-900
            "
          >
           Pusat <span className="text-[#700087]">Pemberdayaan</span> Guru Gen Z          </h2>
        </ScrollAnimation>

        {/* DESC */}
        <ScrollAnimation delay={0.2}>
          <p
            className="
              mt-6

              max-w-3xl
              mx-auto

              text-gray-600

              text-sm
              md:text-lg

              leading-relaxed
            "
          >
            Platform terpadu yang dirancang untuk membantu
guru Gen Z berkembang, beradaptasi dengan teknologi,
dan menciptakan pembelajaran yang lebih relevan.
          </p>
        </ScrollAnimation>

      </div>

      {/* CAROUSEL */}
      <div
        className="relative mx-auto mt-20"
        style={{
          perspective: "1200px",
          maxWidth: "1000px",
          height: "340px",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >

        {/* ARROW LEFT */}
        <button
          onClick={prev}
          className="
            absolute
            left-0
            top-1/2
            -translate-y-1/2

            z-20

            bg-white

            shadow-lg

            w-10
            h-10

            rounded-full

            flex
            items-center
            justify-center

            hover:scale-110

            transition
          "
        >
          ←
        </button>

        {/* ARROW RIGHT */}
        <button
          onClick={next}
          className="
            absolute
            right-0
            top-1/2
            -translate-y-1/2

            z-20

            bg-white

            shadow-lg

            w-10
            h-10

            rounded-full

            flex
            items-center
            justify-center

            hover:scale-110

            transition
          "
        >
          →
        </button>

        <div className="relative w-full h-full flex items-center justify-center">

          {features.map((item, i) => {
            const offset = ((i - current) % N + N) % N;
            const pos = offset <= N / 2 ? offset : offset - N;

            return (
              <motion.div
                key={i}
                onClick={() => pos !== 0 && setCurrent(i)}
                className="
                  absolute

                  bg-white

                  rounded-[28px]

                  border
                  border-[#E9D5FF]

                  flex
                  flex-col

                  text-left

                  overflow-hidden
                "
                style={{
                  width: "260px",
                  height: "300px",
                  cursor: pos !== 0 ? "pointer" : "default",
                }}

                animate={{
                  x:
                    pos === 0
                      ? 0
                      : pos === 1
                      ? 240
                      : pos === -1
                      ? -240
                      : pos > 0
                      ? 420
                      : -420,

                  scale:
                    pos === 0
                      ? 1
                      : pos === 1 || pos === -1
                      ? 0.82
                      : 0.6,

                  rotateY:
                    pos === 0
                      ? 0
                      : pos === 1
                      ? -20
                      : pos === -1
                      ? 20
                      : pos > 0
                      ? -35
                      : 35,

                  opacity:
                    pos === 0
                      ? 1
                      : pos === 1 || pos === -1
                      ? 0.55
                      : 0,

                  filter:
                    pos === 0
                      ? "blur(0px)"
                      : pos === 1 || pos === -1
                      ? "blur(1px)"
                      : "blur(3px)",

                  boxShadow:
                    pos === 0
                      ? "0px 20px 50px rgba(124,58,237,0.12)"
                      : "0px 5px 15px rgba(0,0,0,0.05)",
                }}

                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 18,
                  mass: 0.8,
                }}
              >

                {/* TOP LINE */}
                {/* TOP LINE */}
<div
  className="
    absolute
    top-0
    left-0

    w-full
    h-[4px]

    bg-gradient-to-r
    from-[#700087]
    to-[#700087]

    z-20
  "
></div>

                {/* CONTENT */}
                <div className="p-7 flex flex-col h-full">

                  {/* ICON BOX */}
                  <div
                    className="
                      w-14
                      h-14

                      rounded-2xl

                      bg-[#F3F0FF]

                      flex
                      items-center
                      justify-center

                      text-2xl
                    "
                  >
                    {item.icon}
                  </div>

                  {/* BADGE */}
                  <div
                    className="
                      mt-5

                      inline-flex
                      items-center
                      gap-2

                      w-fit

                      px-3
                      py-1.5

                      rounded-full

                      bg-[#F3F0FF]

                      text-[#700087]

                      text-xs
                      font-bold
                      uppercase
                    "
                  >
                    ✨ {item.badge}
                  </div>

                  {/* TITLE */}
                  <h3
                    className="
                      mt-5

                      text-xl

                      font-bold

                      leading-snug

                      text-gray-900
                    "
                  >
                    {item.title}
                  </h3>

                  {/* DESC */}
                  <p
                    className="
                      mt-4

                      text-gray-600

                      text-sm
                      md:text-base

                      leading-relaxed
                    "
                  >
                    {item.desc}
                  </p>

                </div>

              </motion.div>
            );
          })}

        </div>
      </div>

      {/* DOT / PILL */}
      <div className="flex justify-center gap-3 mt-10">
        {features.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current
                ? "w-8 bg-[#700087]"
                : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </div>

    </section>
  );
};

export default Features;