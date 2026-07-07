import React from "react";
import ScrollAnimation from "../components/ScrollAnimation";
import joinImage from "../assets/join.jpeg";
import materiImage from "../assets/materi.jpeg";
import pelatihanImage from "../assets/pelatihan.jpeg";

// 🔥 FOTO PROFILE
import profile1 from "../assets/profile1.jpeg";
import profile2 from "../assets/profile2.jpeg";
import profile3 from "../assets/profile3.jpeg";
import profile4 from "../assets/profile4.jpeg";
import profile5 from "../assets/profile5.jpeg";

const testimonials = [
  {
    text: "Berkat Gurubermutu.id, efektivitas mengajar saya naik pesat dan siswa jadi jauh lebih antusias!",
    name: "Budi, Guru Muda Penggerak",
    image: profile1,
  },
  {
    text: "Berkat Gamified Skill Tree, saya jadi lebih semangat upgrade diri karena progresnya terlihat nyata!",
    name: "Sabrina, Guru Muda & Content Creator Pendidikan",
    image: profile2,
  },
  {
    text: "Dulu saya sering bingung mencari alat bantu mengajar yang pas, tapi sejak ada Curated Tech Stack, persiapan kelas jadi jauh lebih efisien.",
    name: "Rina, Guru Matematika SMP",
    image: profile3,
  },
  {
    text: "Fitur Gamified Skill Tree bikin proses belajar jadi ketagihan; saya merasa sangat termotivasi untuk terus naik level.",
    name: "Alea, Mahasiswa Calon Guru",
    image: profile4,
  },
  {
    text: "Resource Marketplace sangat membantu, saya bisa berbagi aset digital sekaligus belajar dari modul pedagogi kreatif.",
    name: "Fajar, Guru SD & Edu-Creator",
    image: profile5,
  },
];

const SocialProof = () => {
  return (
    <section className="relative z-10 py-16 pb-20 px-6 bg-[#FCFCFD] text-center overflow-hidden">

      {/* FADE KE CTA */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>

      {/* STATS */}
      <ScrollAnimation>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-14">

          {/* CARD 1 */}
          <div className="bg-white border border-[#E9D5FF] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">

            {/* FOTO */}
            <div className="h-36 overflow-hidden">
              <img
                src={joinImage}
                alt="guru bergabung"
                className="w-full h-full object-cover"
              />
            </div>

            {/* CONTENT */}
            <div className="p-5 text-center">
              <h3 className="text-4xl font-bold text-[#7C3AED]">
                1,200+
              </h3>

              <p className="text-black text-lg mt-1">
                Guru Bergabung
              </p>
            </div>

          </div>

          {/* CARD 2 */}
          <div className="bg-white border border-[#E9D5FF] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">

            {/* FOTO */}
            <div className="h-36 overflow-hidden">
              <img
                src={materiImage}
                alt="materi dibagikan"
                className="w-full h-full object-cover"
              />
            </div>

            {/* CONTENT */}
            <div className="p-5 text-center">
              <h3 className="text-4xl font-bold text-[#7C3AED]">
                350+
              </h3>

              <p className="text-black text-lg mt-1">
                Materi Dibagikan
              </p>
            </div>

          </div>

          {/* CARD 3 */}
          <div className="bg-white border border-[#E9D5FF] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">

            {/* FOTO */}
            <div className="h-36 overflow-hidden">
              <img
                src={pelatihanImage}
                alt="pelatihan aktif"
                className="w-full h-full object-cover"
              />
            </div>

            {/* CONTENT */}
            <div className="p-5 text-center">
              <h3 className="text-4xl font-bold text-[#7C3AED]">
                50+
              </h3>

              <p className="text-black text-lg mt-1">
                Pelatihan Aktif
              </p>
            </div>

          </div>

        </div>
      </ScrollAnimation>

      {/* TITLE */}
      <ScrollAnimation delay={0.2}>
        <h2 className="text-3xl font-bold mb-8 text-[#700087]">
          Cerita Guru yang
          <span className="text-[#700087]">
            {" "}Bertumbuh Bersama{" "}
          </span>
          Gurubermutu
        </h2>
      </ScrollAnimation>

      {/* TESTIMONIAL */}
      <ScrollAnimation delay={0.3}>
        <div className="overflow-hidden">
          <div className="flex gap-6 w-max animate-[scroll_20s_linear_infinite] pb-4">

            {[...testimonials, ...testimonials].map((item, index) => {
              return (
                <div
                  key={index}
                  className="bg-white border border-[#E9D5FF] min-w-[280px] max-w-[280px] p-6 rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >

                  {/* STARS */}
                  <div className="flex justify-center mb-3 text-yellow-400 text-lg">
                    ⭐⭐⭐⭐⭐
                  </div>

                  {/* TEXT */}
                  <p className="text-gray-600 mb-5 italic">
                    “{item.text}”
                  </p>

                  {/* PROFILE */}
                  <div className="flex items-center gap-3 mt-auto pt-6">

                    {/* FOTO PROFILE */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="
                        w-12
                        h-12
                        min-w-[48px]
                        rounded-full
                        object-cover
                        border-2
                        border-[#E9D5FF]
                      "
                    />

                    {/* NAMA */}
                    <h4 className="font-semibold text-[#700087] text-sm text-left">
                      {item.name}
                    </h4>

                  </div>

                </div>
              );
            })}

          </div>
        </div>
      </ScrollAnimation>

    </section>
  );
};

export default SocialProof;