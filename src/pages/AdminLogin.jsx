import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Eye, EyeOff } from "lucide-react";

const ADMIN_EMAIL = "tiensvicky18@gmail.com";

function AdminLogin() {
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
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) throw signInError;

      if (email !== ADMIN_EMAIL) {
        await supabase.auth.signOut();
        setError("Akun ini bukan administrator.");
        return;
      }
      navigate("/admin");
    } catch (err) {
      setError("Email atau password salah.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "linear-gradient(155deg, #2D1B69 0%, #3D2380 60%, #4C1D95 100%)" }}
    >
      {/* Decorative BG */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1000 800">
        {[0,1,2,3,4,5,6].map(row =>
          [0,1,2,3,4,5,6,7,8,9].map(col => (
            <circle key={`${row}-${col}`} cx={col*100+30} cy={row*120+30} r="1.5" fill="white" opacity="0.08"/>
          ))
        )}
        <circle cx="850" cy="200" r="250" fill="none" stroke="white" strokeWidth="0.8" opacity="0.07"/>
        <circle cx="850" cy="200" r="180" fill="none" stroke="white" strokeWidth="0.8" opacity="0.07"/>
        <circle cx="870" cy="170" r="80" fill="#3D2380" opacity="0.7"/>
      </svg>

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm">
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
          </svg>
          Kembali ke beranda
        </button>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4"
              style={{ background: "rgba(124,58,237,0.3)", border: "1px solid rgba(167,139,250,0.4)" }}>
              ⚙️
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
            <p className="text-white/60 text-sm mt-1">Login sebagai administrator</p>
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/20 border border-red-400/30 text-red-200 text-sm">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1.5">Email Admin</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@email.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password admin"
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition">
                  {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:scale-100 mt-2"
              style={{ background: "linear-gradient(135deg, #5B21B6, #7C3AED)", color: "white" }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"/>
                  Masuk...
                </span>
              ) : "Masuk sebagai Admin"}
            </button>
          </form>

          <div className="mt-5 text-center">
            <button
              onClick={() => navigate("/login")}
              className="text-xs text-white/40 hover:text-white/70 transition"
            >
              Login sebagai Guru biasa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;