import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate("/dashboard");
    } catch (err) {
      setError("Email atau password salah. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT PANEL — Dark hero, setema landing page */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(155deg, #2D1B69 0%, #3D2380 50%, #4C1D95 100%)" }}
      >
        {/* Decorative dots */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 600 800">
          {[0,1,2,3,4,5,6,7].map(row =>
            [0,1,2,3,4,5].map(col => (
              <circle key={`${row}-${col}`} cx={col*100+30} cy={row*100+30} r="1.5" fill="white" opacity="0.1"/>
            ))
          )}
          <circle cx="500" cy="200" r="200" fill="none" stroke="white" strokeWidth="0.8" opacity="0.08"/>
          <circle cx="500" cy="200" r="150" fill="none" stroke="white" strokeWidth="0.8" opacity="0.08"/>
          <circle cx="500" cy="200" r="100" fill="none" stroke="white" strokeWidth="0.8" opacity="0.1"/>
          <circle cx="520" cy="170" r="55" fill="#3D2380" opacity="0.8"/>
          <ellipse cx="520" cy="170" rx="70" ry="14" fill="none" stroke="white" strokeWidth="1.2" opacity="0.2" transform="rotate(-20 520 170)"/>
          {[[80,100],[140,60],[300,80],[450,50],[520,150],[60,300],[200,350],[380,320],[530,400],[120,500]].map(([x,y],i) => (
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
              Platform Guru Gen Z
            </p>
            <h1 className="text-4xl font-bold text-white leading-tight">
              Dari Kelas ke Karya,<br/>
              <span className="text-[#C084FC]">Dari Karya ke Cuan</span>
            </h1>
            <p className="mt-4 text-white/70 text-base leading-relaxed">
              Belajar, kumpulkan poin, naik level, dan hasilkan penghasilan dari karyamu sendiri.
            </p>
          </div>

          {/* Level badges preview */}
          <div className="flex flex-wrap gap-2">
            {["Guru Pemula", "Guru Berkembang", "Guru Kreatif", "Guru Inspiratif"].map((lvl, i) => (
              <span
                key={lvl}
                className="px-3 py-1 rounded-full text-xs font-medium border"
                style={{
                  background: i === 1 ? "rgba(124,58,237,0.4)" : "rgba(255,255,255,0.08)",
                  borderColor: i === 1 ? "rgba(167,139,250,0.6)" : "rgba(255,255,255,0.15)",
                  color: i === 1 ? "#DDD6FE" : "rgba(255,255,255,0.6)",
                }}
              >
                {lvl}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <div className="flex -space-x-2">
              {["R","A","S","D"].map((l, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-[#3D2380]"
                  style={{ background: ["#7C3AED","#EC4899","#059669","#D97706"][i] }}
                >
                  {l}
                </div>
              ))}
            </div>
            <p className="text-white/60 text-xs">
              Bergabung bersama <span className="text-white font-semibold">1.200+</span> guru aktif
            </p>
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="relative z-10">
          <p className="text-white/40 text-xs">© 2025 GuruBermutu. Platform Guru Gen Z.</p>
        </div>
      </div>

      {/* RIGHT PANEL — Form */}
      <div
        className="flex-1 flex flex-col justify-center items-center px-6 py-12 relative"
        style={{ background: "#F5F3FF" }}
      >
        {/* Mobile logo */}
        <div className="lg:hidden mb-8 text-center">
          <h1 className="text-2xl font-bold" style={{ color: "#5B21B6" }}>GuruBermutu</h1>
          <p className="text-sm text-gray-500 mt-1">Platform Guru Gen Z</p>
        </div>

        <div className="w-full max-w-sm">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Selamat datang kembali 👋</h2>
            <p className="text-gray-500 text-sm mt-1">Masuk ke akunmu dan lanjutkan perjalanan belajarmu.</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
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
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-gray-700">Password</label>
              </div>
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
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
              style={{ background: "linear-gradient(135deg, #5B21B6, #7C3AED)" }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"/>
                  Masuk...
                </span>
              ) : "Masuk Sekarang"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200"/>
            <span className="text-xs text-gray-400">atau</span>
            <div className="flex-1 h-px bg-gray-200"/>
          </div>

          {/* Footer */}
          <p className="text-sm text-center text-gray-500">
            Belum punya akun?{" "}
            <button
              onClick={() => navigate("/register")}
              className="font-semibold hover:underline transition"
              style={{ color: "#5B21B6" }}
            >
              Daftar di sini
            </button>
          </p>

          <p className="text-center mt-4">
            <button
              onClick={() => navigate("/admin-login")}
              className="text-xs text-gray-400 hover:text-gray-600 transition"
            >
              Login sebagai Admin
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;