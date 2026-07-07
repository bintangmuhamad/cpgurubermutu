import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addWorkshop, updateWorkshop, getWorkshopById } from "../services/workshopService";
import { useCurrentUser } from "../hooks/useCurrentUser";

const emptyForm = {
  title: "",
  category: "",
  speaker: "",
  dateRaw: "",
  time: "",
  mode: "Online",
  location: "",
  thumbnail: "",
  description: "",
  registrationLink: "",
};

function formatDateID(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

const WorkshopForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, loading: userLoading } = useCurrentUser();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      const data = await getWorkshopById(id);
      if (!data) {
        setError("Workshop tidak ditemukan.");
        setLoading(false);
        return;
      }
      if (user && data.createdBy !== user.uid && user.role !== "admin") {
        setError("Kamu tidak punya izin untuk mengedit workshop ini.");
        setLoading(false);
        return;
      }
      setForm({
        title: data.title || "",
        category: data.category || "",
        speaker: data.speaker || "",
        dateRaw: data.dateRaw || "",
        time: data.time || "",
        mode: data.mode || "Online",
        location: data.location || "",
        thumbnail: data.thumbnail || "",
        description: data.description || "",
        registrationLink: data.registrationLink || "",
      });
      setLoading(false);
    })();
  }, [id, isEdit, user]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const goBackTarget = user?.role === "admin" ? "/admin/kelola-workshop" : "/workshop";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.category || !form.dateRaw || !form.time || !form.location) {
      setError("Mohon lengkapi semua field yang wajib diisi.");
      return;
    }
    if (!user) {
      setError("Kamu harus login untuk membuat workshop.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: form.title,
        category: form.category,
        speaker: form.speaker,
        dateRaw: form.dateRaw,
        date: formatDateID(form.dateRaw),
        time: form.time,
        mode: form.mode,
        location: form.location,
        thumbnail: form.thumbnail,
        description: form.description,
        registrationLink: form.registrationLink,
      };

      if (isEdit) {
        await updateWorkshop(id, payload);
      } else {
        await addWorkshop(payload, user);
      }
      navigate(goBackTarget);
    } catch (err) {
      console.error(err);
      setError("Gagal menyimpan workshop. Coba lagi.");
    } finally {
      setSaving(false);
    }
  };

  if (loading || userLoading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-400">Memuat...</div>;
  }

  if (error && isEdit && !form.title) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-gray-500" style={{ background: "#F5F3FF" }}>
        <p>{error}</p>
        <button
          onClick={() => navigate(goBackTarget)}
          className="px-4 py-2 rounded-xl text-white text-sm"
          style={{ background: "#5B21B6" }}
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#F5F3FF" }}>
      <div className="max-w-2xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 text-sm mb-6 transition"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Kembali
        </button>

        <div className="bg-white rounded-2xl border border-purple-100 shadow-sm p-6 md:p-8">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-1">
            {isEdit ? "Edit Workshop" : "Buat Workshop"}
          </h1>
          <p className="text-sm text-gray-400 mb-6">
            {isEdit ? "Perbarui informasi workshop kamu." : "Isi detail workshop yang ingin kamu selenggarakan."}
          </p>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 text-red-600 text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Judul <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={form.title}
                onChange={handleChange("title")}
                placeholder="mis. Workshop Membuat Media Belajar Interaktif"
                className="w-full border border-purple-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Kategori <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={form.category}
                  onChange={handleChange("category")}
                  placeholder="mis. Teknologi Pendidikan"
                  className="w-full border border-purple-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Narasumber</label>
                <input
                  type="text"
                  value={form.speaker}
                  onChange={handleChange("speaker")}
                  placeholder="Nama narasumber"
                  className="w-full border border-purple-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Tanggal <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  value={form.dateRaw}
                  onChange={handleChange("dateRaw")}
                  className="w-full border border-purple-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Jam <span className="text-red-500">*</span></label>
                <input
                  type="time"
                  value={form.time}
                  onChange={handleChange("time")}
                  className="w-full border border-purple-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mode <span className="text-red-500">*</span></label>
              <div className="flex gap-4">
                {["Online", "Offline"].map((m) => (
                  <label key={m} className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                    <input
                      type="radio"
                      name="mode"
                      checked={form.mode === m}
                      onChange={() => setForm((p) => ({ ...p, mode: m }))}
                      className="accent-[#5B21B6]"
                    />
                    {m}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {form.mode === "Online" ? "Link Meeting" : "Lokasi"} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.location}
                onChange={handleChange("location")}
                placeholder={form.mode === "Online" ? "Link Zoom / Google Meet" : "mis. Yogyakarta"}
                className="w-full border border-purple-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Thumbnail (URL gambar)</label>
              <input
                type="text"
                value={form.thumbnail}
                onChange={handleChange("thumbnail")}
                placeholder="https://..."
                className="w-full border border-purple-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
              />
              {form.thumbnail && (
                <img src={form.thumbnail} alt="preview" className="mt-2 w-full h-32 object-cover rounded-xl border border-purple-100" />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi</label>
              <textarea
                value={form.description}
                onChange={handleChange("description")}
                rows={4}
                placeholder="Ceritakan tentang workshop ini..."
                className="w-full border border-purple-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Link Pendaftaran</label>
              <input
                type="text"
                value={form.registrationLink}
                onChange={handleChange("registrationLink")}
                placeholder="https://..."
                className="w-full border border-purple-100 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-200"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full text-white py-3 rounded-xl text-sm font-semibold transition hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
              style={{ background: "#5B21B6" }}
            >
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WorkshopForm;