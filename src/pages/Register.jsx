import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Eye, EyeOff } from "lucide-react";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Password tidak sama. Coba lagi.");
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

    setLoading(true);
    try {
      // 1. Sign up dengan Supabase Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { nama }, // simpan nama di user_metadata
        },
      });

      if (signUpError) throw signUpError;

      // 2. Buat profil di tabel profiles
      if (data?.user) {
        await supabase.from("profiles").insert([
          {
            id: data.user.id,
            nama,
            email,
            xp: 0,
            level: 1,
            level_name: "Guru Pemula",
            completed_modules: 0,
            badges: [],
            aktivitas: [],
            completed_nodes: {},
            role: "guru",
          },
        ]);
      }

      navigate("/login");
      alert("Akun berhasil dibuat! 🎉 Silakan login untuk mulai belajar.");
    } catch (err) {
      if (err.message?.includes("already registered") || err.message?.includes("already been registered")) {
        setError("Email sudah terdaftar. Silakan login.");
      } else if (err.message?.includes("invalid")) {
        setError("Format email tidak valid.");
      } else {
        setError("Terjadi kesalahan: " + (err.message || "Coba lagi."));
      }
    } finally {
      setLoading(false);
    }
  };

  const levels = [
    { name: "Guru Pemula", pts: "0 – 500 poin", active: true },
    { name: "Guru Berkembang", pts: "500 – 1.500 poin", active: false },
    { name: "Guru Kreatif", pts: "1.500 – 3.000 poin", active: false },
    { name: "Guru Produktif", pts: "3.000 – 5.000 poin", active: false },
    { name: "Guru Inspiratif", pts: "5.000+ poin", active: false },
  ];

  return (
    <div className="min-h-screen flex">
      {/* LEFT PANEL */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(155deg, #2D1B69 0%, #3D2380 50%, #4C1D95 100%)" }}
      >
        {/* Decorative */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 600 800">
          {[0,1,2,3,4,5,6,7].map(row =>
            [0,1,2,3,4,5].map(col => (
              <circle key={`${row}-${col}`} cx={col*100+30} cy={row*100+30} r="1.5" fill="white" opacity="0.1"/>
            ))
          )}
          <circle cx="500" cy="600" r="200" fill="none" stroke="white" strokeWidth="0.8" opacity="0.08"/>
          <circle cx="500" cy="600" r="140" fill="none" stroke="white" strokeWidth="0.8" opacity="0.08"/>
          <circle cx="510" cy="580" r="60" fill="#3D2380" opacity="0.8"/>
          <ellipse cx="510" cy="580" rx="75" ry="14" fill="none" stroke="white" strokeWidth="1.2" opacity="0.2" transform="rotate(-20 510 580)"/>
          {[[70,150],[180,80],[320,120],[480,90],[550,200],[60,450],[230,500],[400,470],[560,550]].map(([x,y],i) => (
            <circle key={i} cx={x} cy={y} r="1.5" fill="white" opacity="0.5"/>
          ))}
        </svg>

        {/* Logo */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <span className="text-white text-sm font-semibold">✨ GuruBermutu</span>
          </div>
        </div>

        {/* Main copy */}
        <div className="relative z-10 space-y-6">
          <div>
            <p className="text-purple-300 text-xs font-semibold uppercase tracking-widest mb-3">
              Mulai perjalananmu
            </p>
            <h1 className="text-3xl font-bold text-white leading-tight">
              Belajar → Dapat Poin →<br/>
              <span className="text-[#C084FC]">Naik Level → Hasilkan Cuan</span>
            </h1>
            <p className="mt-4 text-white/70 text-sm leading-relaxed">
              Daftar sekarang dan mulai perjalananmu sebagai <strong className="text-white">Guru Pemula</strong>. Kumpulkan poin dari setiap pelatihan!
            </p>
          </div>

          {/* Level progression */}
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-300">
              Tingkatan Level
            </p>
            {levels.map((lvl, i) => (
              <div
                key={lvl.name}
                className="flex items-center gap-3 px-3 py-2 rounded-xl transition"
                style={{
                  background: lvl.active ? "rgba(124,58,237,0.35)" : "rgba(255,255,255,0.05)",
                  border: lvl.active ? "1px solid rgba(167,139,250,0.5)" : "1px solid transparent",
                }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                  style={{
                    background: lvl.active ? "#7C3AED" : "rgba(255,255,255,0.1)",
                    color: "white",
                  }}
                >
                  {i + 1}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-white">{lvl.name}</p>
                  <p className="text-[10px] text-white/50">{lvl.pts}</p>
                </div>
                {lvl.active && (
                  <span className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-500/40 text-purple-200 flex-shrink-0">
                    Start disini
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-white/40 text-xs">© 2025 GuruBermutu. Platform Guru Gen Z.</p>
        </div>
      </div>

      {/* RIGHT PANEL — Form */}
      <div
        className="flex-1 flex flex-col justify-center items-center px-6 py-12 relative overflow-y-auto"
        style={{ background: "#F5F3FF" }}
      >
        {/* Mobile logo */}
        <div className="lg:hidden mb-8 text-center">
          <h1 className="text-2xl font-bold" style={{ color: "#5B21B6" }}>GuruBermutu</h1>
          <p className="text-sm text-gray-500 mt-1">Platform Guru Gen Z</p>
        </div>

        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Buat Akun Baru 🚀</h2>
            <p className="text-gray-500 text-sm mt-1">Mulai sebagai Guru Pemula dan terus berkembang!</p>
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            {/* NAMA LENGKAP */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Lengkap</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <input
                  type="text"
                  required
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Nama lengkap kamu"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-purple-100 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-purple-100 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-purple-100 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition">
                  {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Konfirmasi Password</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                </div>
                <input
                  type={showConfirm ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi password"
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-purple-100 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent transition"
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition">
                  {showConfirm ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 mt-2"
              style={{ background: "linear-gradient(135deg, #5B21B6, #7C3AED)" }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"/>
                  Membuat akun...
                </span>
              ) : "Daftar Sekarang 🚀"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200"/>
            <span className="text-xs text-gray-400">atau</span>
            <div className="flex-1 h-px bg-gray-200"/>
          </div>

          <p className="text-sm text-center text-gray-500">
            Sudah punya akun?{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-semibold hover:underline transition"
              style={{ color: "#5B21B6" }}
            >
              Masuk di sini
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;