import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Eye, EyeOff, X } from "lucide-react";

export default function EditProfileModal({ isOpen, onClose, user, profile, onUpdateSuccess }) {
  const [nama, setNama] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (isOpen && profile) {
      setNama(profile.nama || "");
      setPassword(""); // Reset password field
      setError("");
      setSuccess("");
    }
  }, [isOpen, profile]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // 1. Update nama di tabel profiles
      if (nama !== profile.nama) {
        const { error: dbError } = await supabase
          .from("profiles")
          .update({ nama })
          .eq("id", user.id);
        
        if (dbError) throw dbError;
      }

      // 2. Update Auth User (Nama & Password jika diisi)
      const updates = {};
      if (nama !== profile.nama) {
        updates.data = { nama }; // update user_metadata
      }
      if (password) {
        if (password.length < 6) {
          throw new Error("Password baru minimal 6 karakter.");
        }
        updates.password = password;
      }

      if (Object.keys(updates).length > 0) {
        const { error: authError } = await supabase.auth.updateUser(updates);
        if (authError) throw authError;
      }

      setSuccess("Profil berhasil diperbarui!");
      if (onUpdateSuccess) onUpdateSuccess();
      
      // Tutup modal setelah sukses (dengan sedikit jeda agar user bisa baca pesan sukses)
      setTimeout(() => {
        onClose();
        setSuccess("");
      }, 1500);

    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat memperbarui profil.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-1">Edit Profil</h2>
        <p className="text-sm text-gray-500 mb-6">Perbarui informasi dasar akun kamu.</p>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        {success && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm flex items-center gap-2">
            <span>✅</span> {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email (Disabled) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 text-sm cursor-not-allowed"
            />
            <p className="text-[11px] text-gray-400 mt-1">Email tidak dapat diubah untuk saat ini.</p>
          </div>

          {/* Nama Lengkap */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Lengkap</label>
            <input
              type="text"
              required
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-purple-100 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
              placeholder="Masukkan nama lengkap"
            />
          </div>

          {/* Password Baru */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password Baru (Opsional)</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Biarkan kosong jika tidak ingin mengubah"
                className="w-full pl-4 pr-12 py-3 rounded-xl border border-purple-100 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              >
                {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl text-gray-700 font-semibold text-sm bg-gray-100 hover:bg-gray-200 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-xl text-white font-semibold text-sm transition shadow-md hover:shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(135deg, #5B21B6, #7C3AED)" }}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"/>
                  Menyimpan...
                </>
              ) : (
                "Simpan Perubahan"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
