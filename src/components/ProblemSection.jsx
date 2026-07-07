import ScrollAnimation from "../components/ScrollAnimation";
import {
  BookOpen,
  MonitorSmartphone,
  TrendingUp
} from "lucide-react";

// 🔥 FOTO
import fotoproblem from "../assets/fotoproblem.jpeg";

function ProblemSection() {
  return (
    <section
      id="problem"
      className="relative overflow-hidden bg-[#FCFCFD]"
    >

      {/* BACKGROUND CIRCLE */}
      <div
        className="
          absolute
          -top-32
          -right-32
          w-[350px]
          h-[350px]
          md:w-[700px]
          md:h-[700px]
          rounded-full
          bg-[#F3F0FF]
          opacity-80
        "
      ></div>

      {/* CONTENT */}
      <div
        className="
          relative
          max-w-7xl
          mx-auto
          px-6
          md:px-16
          py-20
          md:py-28
          grid
          md:grid-cols-2
          gap-14
          items-stretch
        "
      >

        {/* LEFT SIDE */}
        <div>

          {/* LABEL */}
          <ScrollAnimation>
            <div
              className="
                inline-flex
                items-center
                gap-2

                px-4
                py-2

                rounded-full

                bg-[#EEE8FF]
                text-[#6D28D9]

                text-xs
                md:text-sm

                font-semibold
                tracking-wide
                uppercase
              "
            >
            </div>
          </ScrollAnimation>

          {/* LINE */}
          <div className="w-14 h-1 bg-[#7C3AED] rounded-full mt-6 mb-6"></div>

          {/* TITLE */}
          <ScrollAnimation delay={0.1}>
            <h2
              className="
                text-3xl
                md:text-5xl
                font-bold
                leading-tight
                text-gray-900
              "
            >
              Masih Merasa
              <br />

              <span className="text-[#700087]">
                Tertinggal
              </span>

              <br />
              di Era Digital?🤔
            </h2>
          </ScrollAnimation>

          {/* DESC */}
          <ScrollAnimation delay={0.2}>
            <p
              className="
                mt-6
                text-gray-600
                text-sm
                md:text-lg
                leading-relaxed
                max-w-xl
              "
            >
              Apakah Anda merasa metode mengajar mulai
              tertinggal zaman dan sulit mengikuti
              perkembangan teknologi yang begitu cepat?

              <br />
              <br />

              Menjadi guru Gen Z bukan hanya tentang
              mengajar, tetapi juga menciptakan dampak
              dan pengalaman belajar yang relevan.
            </p>
          </ScrollAnimation>

          {/* PROBLEM LIST */}
          <div className="mt-10 space-y-5">

            {/* ITEM 1 */}
            <ScrollAnimation delay={0.3}>
              <div
                className="
                  flex
                  items-start
                  gap-4

                  bg-white
                  border
                  border-[#E9D5FF]

                  rounded-2xl

                  p-5

                  shadow-sm
                  hover:shadow-md

                  transition
                "
              >

                {/* ICON */}
                <div
                  className="
                    w-10
                    h-10

                    rounded-xl

                    bg-[#F3F0FF]

                    flex
                    items-center
                    justify-center

                    text-[#700087]
                    font-bold
                    text-lg

                    flex-shrink-0
                  "
                >
                  <BookOpen size={22} strokeWidth={2.5} />
                </div>

                {/* TEXT */}
                <div>
                  <h3
                    className="
                      text-lg
                      md:text-xl
                      font-bold
                      text-gray-900
                    "
                  >
                    Metode belajar terasa kurang relevan?
                  </h3>

                  <p
                    className="
                      mt-2
                      text-sm
                      md:text-base
                      text-gray-600
                      leading-relaxed
                    "
                  >
                    Siswa semakin cepat berubah,
                    namun metode mengajar masih terasa
                    monoton dan kurang interaktif.
                  </p>
                </div>

              </div>
            </ScrollAnimation>

            {/* ITEM 2 */}
            <ScrollAnimation delay={0.4}>
              <div
                className="
                  flex
                  items-start
                  gap-4

                  bg-white
                  border
                  border-[#E9D5FF]

                  rounded-2xl

                  p-5

                  shadow-sm
                  hover:shadow-md

                  transition
                "
              >

                {/* ICON */}
                <div
                  className="
                    w-10
                    h-10

                    rounded-xl

                    bg-[#F3F0FF]

                    flex
                    items-center
                    justify-center

                    text-[#7C3AED]
                    font-bold
                    text-lg

                    flex-shrink-0
                  "
                >
                  <MonitorSmartphone size={22} strokeWidth={2.5} />
                </div>

                {/* TEXT */}
                <div>
                  <h3
                    className="
                      text-lg
                      md:text-xl
                      font-bold
                      text-gray-900
                    "
                  >
                    Kesulitan mengikuti perkembangan teknologi?
                  </h3>

                  <p
                    className="
                      mt-2
                      text-sm
                      md:text-base
                      text-gray-600
                      leading-relaxed
                    "
                  >
                    Perkembangan tools dan platform digital
                    yang cepat membuat proses adaptasi menjadi
                    tantangan tersendiri.
                  </p>
                </div>

              </div>
            </ScrollAnimation>

            {/* ITEM 3 */}
            <ScrollAnimation delay={0.5}>
              <div
                className="
                  flex
                  items-start
                  gap-4

                  bg-white
                  border
                  border-[#E9D5FF]

                  rounded-2xl

                  p-5

                  shadow-sm
                  hover:shadow-md

                  transition
                "
              >

                {/* ICON */}
                <div
                  className="
                    w-10
                    h-10

                    rounded-xl

                    bg-[#F3F0FF]

                    flex
                    items-center
                    justify-center

                    text-[#7C3AED]
                    font-bold
                    text-lg

                    flex-shrink-0
                  "
                >
                  <TrendingUp size={22} strokeWidth={2.5} />
                </div>

                {/* TEXT */}
                <div>
                  <h3
                    className="
                      text-lg
                      md:text-xl
                      font-bold
                      text-gray-900
                    "
                  >
                    Sudah belajar, tapi belum terasa berkembang?
                  </h3>

                  <p
                    className="
                      mt-2
                      text-sm
                      md:text-base
                      text-gray-600
                      leading-relaxed
                    "
                  >
                    Belajar banyak hal tanpa arah yang jelas
                    sering membuat proses pengembangan diri
                    terasa stagnan.
                  </p>
                </div>

              </div>
            </ScrollAnimation>

          </div>

          {/* TEXT CTA */}
          <ScrollAnimation delay={0.6}>
            <div
              className="
                mt-12

                inline-flex
                items-center
                gap-3

                px-5
                py-3

                rounded-full

                bg-[#F3F0FF]

                text-[#7C3AED]
                font-semibold

                text-sm
                md:text-base
              "
            >
              <span className="text-lg">✨</span>
              Gurubermutu hadir untuk membantu guru berkembang di era digital.
            </div>
          </ScrollAnimation>

        </div>

        {/* RIGHT SIDE */}
        <ScrollAnimation delay={0.3}>
          <div className="relative w-full">

            {/* IMAGE CARD */}
            <div
              className="
                relative
                overflow-hidden
                rounded-[32px]
                shadow-2xl
                min-h-[350px]
                md:min-h-[760px]
              "
            >

              {/* FOTO */}
              <img
                src={fotoproblem}
                alt="guru berkembang"
                className="
                  absolute
                  inset-0
                  w-full
                  h-full
                  object-cover
                "
              />

              {/* OVERLAY */}
              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/70
                  via-black/20
                  to-transparent
                "
              ></div>

              {/* CONTENT */}
              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  p-6
                  md:p-10
                  text-white
                "
              >

                <p
                  className="
                    inline-block
                    bg-white/20
                    backdrop-blur-md
                    border
                    border-white/20
                    px-4
                    py-2
                    rounded-full
                    text-sm
                    mb-4
                  "
                >
                  Komunitas Guru Modern 🚀
                </p>

                <h3 className="text-2xl md:text-4xl font-bold leading-tight mb-4">
                  Belajar Bersama,
                  <br />
                  Bertumbuh Bersama
                </h3>
              </div>

            </div>

          </div>
        </ScrollAnimation>

      </div>
    </section>
  );
}

export default ProblemSection;