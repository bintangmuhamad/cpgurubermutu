import ScrollAnimation from "../components/ScrollAnimation";

import {
  Rocket,
  BookOpenText,
  TrendingUp,
} from "lucide-react";

import gambarjoin from "../assets/gambarjoin.jpg";
import workshop from "../assets/workshop.jpg";
import levelup from "../assets/levelup.jpg";

const steps = [
  {
    number: "01",
    badge: "Mulai",
    title: "Join",
    desc: "Daftar dan bergabung dengan komunitas.",
    icon: Rocket,
    image: gambarjoin,
    color: "from-[#8B5CF6] to-[#7C3AED]",
    bg: "bg-[#F6F0FF]",
    badgeBg: "bg-[#F1E8FF]",
    badgeText: "text-[#7C3AED]",
    points: [
      "Daftar gratis",
      "Gabung komunitas guru",
      "Mulai belajar bersama",
    ],
  },
  {
    number: "02",
    badge: "Berkembang",
    title: "Learn & Earn",
    desc: "Ikuti workshop dan kumpulkan aset di Marketplace.",
    icon: BookOpenText,
    image: workshop,
    color: "from-[#D946EF] to-[#A855F7]",
    bg: "bg-[#FDF4FF]",
    badgeBg: "bg-[#FAE8FF]",
    badgeText: "text-[#C026D3]",
    points: [
      "Workshop interaktif",
      "Akses marketplace",
      "Kumpulkan aset digital",
    ],
  },
  {
    number: "03",
    badge: "Naik Level",
    title: "Level Up",
    desc: "Lihat progres kompetensi Anda.",
    icon: TrendingUp,
    image: levelup,
    color: "from-[#0EA5E9] to-[#2563EB]",
    bg: "bg-[#F0F9FF]",
    badgeBg: "bg-[#E0F2FE]",
    badgeText: "text-[#0284C7]",
    points: [
      "Pantau perkembangan",
      "Naik level kompetensi",
      "Skill tree terstruktur",
    ],
  },
];

function HowItWorks() {
  return (
    <section
      className="
        relative
        overflow-hidden

        py-16
        md:py-20

        px-6

        bg-white
      "
    >

      {/* BACKGROUND */}
      <div
        className="
          absolute
          top-0
          right-0

          w-[300px]
          h-[300px]

          bg-[#F3F0FF]

          rounded-bl-[120px]

          opacity-80
        "
      ></div>

      <div
        className="
          absolute
          -bottom-20
          -left-20

          w-[220px]
          h-[220px]

          rounded-full

          bg-[#FAE8FF]

          blur-3xl
          opacity-70
        "
      ></div>

      {/* CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center">

          {/* BADGE */}
          <ScrollAnimation>
            <div
              className="
                inline-flex
                items-center
                gap-2

                px-5
                py-2

                rounded-full

                bg-[#F3F0FF]

                text-[#700087]

                text-xs
                md:text-sm

                font-semibold
                uppercase
                tracking-wide
              "
            >
              <span className="w-2 h-2 rounded-full bg-[#A78BFA]"></span>
              Mulai Dalam 3 Langkah
            </div>
          </ScrollAnimation>

          {/* TITLE */}
          <ScrollAnimation delay={0.1}>
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
              Mulai Bertumbuh
              <br />

              Bersama
              <span className="text-[#700087]">
                {" "}Gurubermutu
              </span>
            </h2>
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
              Proses belajar dan berkembang kini lebih terarah,
              interaktif, dan mudah diikuti dalam satu platform.
            </p>
          </ScrollAnimation>

        </div>

        {/* CARDS */}
        <div
          className="
            mt-14
            md:mt-16

            grid
            md:grid-cols-3

            gap-8
          "
        >

          {steps.map((item, index) => (
            <ScrollAnimation key={index} delay={index * 0.2}>

              <div
                className="
                  relative

                  h-full

                  border
                  border-[#EFE7FF]

                  rounded-[32px]

                  overflow-hidden

                  shadow-sm

                  hover:shadow-2xl
                  hover:-translate-y-2

                  transition-all
                  duration-300
                "
              >

                {/* BACKGROUND IMAGE */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-black/45"></div>

                {/* CONTENT */}
                <div className="relative z-10 px-7 py-8">

                  {/* TOP GRADIENT */}
                  <div
                    className={`
                      absolute
                      top-0
                      left-0

                      w-full
                      h-1.5

                      rounded-t-[32px]

                      bg-gradient-to-r
                      ${item.color}
                    `}
                  ></div>

                  {/* NUMBER */}
                  <h1
                    className="
                      text-6xl
                      md:text-7xl

                      font-bold

                      text-[#E9D5FF]
                    "
                  >
                    {item.number}
                  </h1>

                  {/* ICON */}
                  <div
                    className={`
                      mt-5

                      w-16
                      h-16

                      rounded-2xl

                      flex
                      items-center
                      justify-center

                      ${item.bg}
                    `}
                  >
                    <item.icon
                      size={30}
                      strokeWidth={2.2}
                      className="text-[#7C3AED]"
                    />
                  </div>

                  {/* BADGE */}
                  <div
                    className={`
                      mt-6

                      inline-flex

                      px-4
                      py-2

                      rounded-full

                      text-xs
                      font-semibold
                      uppercase
                      tracking-wide

                      ${item.badgeBg}
                      ${item.badgeText}
                    `}
                  >
                    {item.badge}
                  </div>

                  {/* TITLE */}
                  <h3
                    className="
                      mt-5

                      text-3xl

                      font-bold

                      text-white
                    "
                  >
                    {item.title}
                  </h3>

                  {/* DESC */}
                  <p
                    className="
                      mt-5

                      text-white/90

                      leading-relaxed

                      text-base
                    "
                  >
                    {item.desc}
                  </p>

                  {/* POINTS */}
                  <div className="mt-8 space-y-3">
                    {item.points.map((point, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3"
                      >
                        <div
                          className={`
                            mt-2

                            w-2
                            h-2

                            rounded-full

                            bg-gradient-to-r
                            ${item.color}
                          `}
                        ></div>

                        <p className="text-white/90 text-sm md:text-base">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>

                </div>

              </div>

            </ScrollAnimation>
          ))}

        </div>

      </div>

    </section>
  );
}

export default HowItWorks;