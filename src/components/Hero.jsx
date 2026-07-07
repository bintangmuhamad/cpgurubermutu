import heroImg from "../assets/gurugenz.jpg";
import { useNavigate } from "react-router-dom";
import ScrollAnimation from "../components/ScrollAnimation";
import { useEffect, useState } from "react";

function Hero() {
  const navigate = useNavigate();

  const words = ["inspiratif", "Interaktif", "Inovatif"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section
      id="home"
      className="
        relative
        min-h-screen
        flex
        items-center
        overflow-hidden
      "
    >

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="guru gen z mengajar digital"
          className="
            w-full
            h-full
            object-cover

            object-[65%_20%]
            md:object-[center_10%]

            scale-105
          "
        />
      </div>

      {/* DARK OVERLAY */}
      <div
        className="
          absolute
          inset-0
          bg-black/50
        "
      ></div>

      {/* GRADIENT GLOW */}
      <div
        className="
          absolute
          bottom-0
          left-0

          w-[400px]
          h-[400px]

          bg-[#7C3AED]/20

          rounded-full
          blur-3xl
        "
      ></div>

      {/* CONTENT */}
      <div
        className="
          relative
          z-10

          max-w-7xl
          mx-auto

          w-full

          px-6
          md:px-16

          pt-28
          pb-20
        "
      >

        <ScrollAnimation>

          <div className="max-w-3xl">

            {/* BADGE */}
            <div
              className="
                inline-flex
                items-center
                gap-2

                px-4
                py-2

                rounded-full

                bg-white/10
                border
                border-white/20

                backdrop-blur-md

                text-white/90
                text-sm
                font-medium
              "
            >
              ✨ Platform Pemberdayaan Guru Gen Z
            </div>

            {/* TITLE */}
<h1
  className="
    mt-8

    text-4xl
    md:text-5xl
    lg:text-6xl

    font-bold
    leading-tight

    text-white

    text-left

    drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]
  "
>

  Jadilah{" "}

  <span className="text-[#C084FC]">
    Guru Gen Z
  </span>{" "}

  <span
    className="
      text-[#F9A8D4]
      transition-all
      duration-500
    "
  >
    {words[index]}
  </span>

  <br />

  yang Relevan dan Berdampak
  <br />

  di Era Digital.

</h1>

            {/* DESCRIPTION */}
<p
  className="
    mt-7

    max-w-2xl

    text-white/85

    text-base
    md:text-lg

    leading-relaxed

    text-left
  "
>
  Tingkatkan kompetensi pedagogi kreatif dan
  penguasaan teknologi mutakhir dalam satu
  platform masa depan.
</p>

            {/* BUTTON */}
            <div
              className="
                mt-10

                flex
                flex-col
                sm:flex-row

                items-start

                gap-4
              "
            >

<button
  onClick={() => navigate("/register")}
  className="
    w-full
    sm:w-auto

    bg-[#700087]
    hover:bg-[#700087]

    text-white
    font-semibold

    px-7
    py-4

    rounded-2xl

    shadow-xl
    hover:scale-105

    transition
  "
>
  Join Komunitas Guru Masa Depan
</button>

            </div>

          </div>

        </ScrollAnimation>

      </div>

    </section>
  );
}

export default Hero;