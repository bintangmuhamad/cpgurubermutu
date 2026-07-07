import { useState } from "react";
import ScrollAnimation from "../components/ScrollAnimation";

import {
  Plus,
  Minus,

  Lightbulb,
  GitBranch,
  Database,
  MonitorSmartphone,
  Lock,
} from "lucide-react";

const faqs = [
  {
    icon: Lightbulb,

    question:
      "Apa itu framework TPACK X yang digunakan di Gurubermutu.id?",

    answer:
      "TPACK X adalah framework integrasi antara penguasaan konten, pedagogi kreatif, dan teknologi mutakhir untuk menciptakan pembelajaran yang relevan dan future-ready.",
  },

  {
    icon: GitBranch,

    question:
      "Bagaimana cara kerja Gamified Skill Tree dalam meningkatkan kompetensi saya?",

    answer:
      "Ini adalah peta kemajuan interaktif berbasis level; setiap kali Anda menyelesaikan pelatihan atau aktivitas, progres kompetensi Anda akan meningkat secara visual untuk menjaga motivasi belajar.",
  },

  {
    icon: Database,

    question:
      "Apakah aset digital di Resource Marketplace bisa saya gunakan langsung untuk mengajar?",

    answer:
      "Ya, marketplace kami menyediakan aset siap pakai seperti RPP, template, dan media ajar yang dikurasi untuk meningkatkan efisiensi Anda di dalam kelas.",
  },

  {
    icon: MonitorSmartphone,

    question:
      "Bagaimana jika saya ingin mengikuti workshop atau seminar?",

    answer:
      "Anda dapat mengakses Workshop & Seminar Hub untuk melihat jadwal pelatihan aktif, di mana partisipasi Anda akan otomatis terintegrasi sebagai poin progres dalam Skill Tree Anda.",
  },

  {
    icon: Lock,

    question:
      "Apakah platform ini hanya untuk guru yang sudah mahir teknologi?",

    answer:
      "Tidak, platform ini dirancang untuk guru muda (Gen Z) hingga pendidik yang ingin memulai transformasi digital, dengan kurasi alat (Tech Stack) yang memudahkan siapa saja untuk mengajar secara efisien.",
  },
];

function FAQ() {
  const [active, setActive] = useState(null);

  const toggleFAQ = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section
      className="
        relative
        overflow-hidden

        py-16
        md:py-20

        px-6

        bg-[#FCFCFD]
      "
    >

      {/* BACKGROUND */}
      <div
        className="
          absolute
          top-0
          left-0

          w-[260px]
          h-[260px]

          bg-[#F3F0FF]

          rounded-br-[120px]

          opacity-70
        "
      ></div>

      {/* CONTAINER */}
      <div className="relative z-10 max-w-4xl mx-auto">

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

                bg-[#EEE8FF]

                text-[#700087]

                text-xs
                md:text-sm

                font-semibold
                uppercase
                tracking-wide
              "
            >
              <span className="w-2 h-2 rounded-full bg-[#A78BFA]"></span>
              FAQ
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
              Pertanyaan yang
              <span className="text-[#700087]">
                {" "}Sering Ditanyakan
              </span>
            </h2>
          </ScrollAnimation>

          {/* DESC */}
          <ScrollAnimation delay={0.2}>
            <p
              className="
                mt-5

                text-sm
                md:text-lg

                text-gray-600

                leading-relaxed
              "
            >
              Temukan jawaban mengenai fitur,
              pembelajaran, dan pengalaman menggunakan
              platform Gurubermutu.
            </p>
          </ScrollAnimation>

        </div>

        {/* FAQ LIST */}
        <div className="mt-14 space-y-5">

          {faqs.map((faq, index) => (
            <ScrollAnimation
              key={index}
              delay={index * 0.1}
            >

              <div
                className="
                  bg-white

                  border
                  border-[#E9D5FF]

                  rounded-3xl

                  overflow-hidden

                  shadow-sm
                "
              >

                {/* QUESTION */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="
                    w-full

                    flex
                    items-start
                    justify-between

                    gap-4

                    text-left

                    px-6
                    py-5

                    hover:bg-[#FAF7FF]

                    transition
                  "
                >

                  {/* LEFT */}
                  <div className="flex items-start gap-4">

                    {/* ICON */}
                    <div
                      className="
                        min-w-[56px]
                        h-[56px]

                        rounded-2xl

                        bg-[#F5F0FF]

                        flex
                        items-center
                        justify-center
                      "
                    >
                      <faq.icon
                        size={24}
                        strokeWidth={2.2}
                        className="text-[#8B5CF6]"
                      />
                    </div>

                    {/* QUESTION */}
                    <h3
                      className="
                        pt-3

                        text-sm
                        md:text-lg

                        font-semibold

                        text-gray-900
                      "
                    >
                      {faq.question}
                    </h3>

                  </div>

                  {/* PLUS MINUS */}
                  <div
                    className="
                      min-w-[40px]
                      min-h-[40px]

                      rounded-full

                      bg-[#F3F0FF]

                      flex
                      items-center
                      justify-center
                    "
                  >
                    {active === index ? (
                      <Minus
                        size={20}
                        className="text-[#7C3AED]"
                      />
                    ) : (
                      <Plus
                        size={20}
                        className="text-[#7C3AED]"
                      />
                    )}
                  </div>

                </button>

                {/* ANSWER */}
                <div
                  className={`
                    transition-all
                    duration-300
                    ease-in-out

                    overflow-hidden

                    ${
                      active === index
                        ? "max-h-[300px] opacity-100"
                        : "max-h-0 opacity-0"
                    }
                  `}
                >

                  <div
                    className="
                      px-6
                      pb-6

                      text-gray-600

                      text-sm
                      md:text-base

                      leading-relaxed
                    "
                  >
                    {faq.answer}
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

export default FAQ;