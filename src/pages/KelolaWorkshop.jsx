import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { subscribeWorkshops, deleteWorkshop } from "../services/workshopService";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { migrateStaticWorkshops } from "../utils/migrateOnce";

export default function KelolaWorkshop() {
  const navigate = useNavigate();
  const { user } = useCurrentUser();
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [migrating, setMigrating] = useState(false);

  useEffect(() => {
    const unsub = subscribeWorkshops((data) => {
      setWorkshops(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleDelete = async (item) => {
    const ok = window.confirm(`Hapus workshop "${item.title}"?`);
    if (!ok) return;
    try {
      await deleteWorkshop(item.id);
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus workshop.");
    }
  };

  const handleMigrate = async () => {
    setMigrating(true);
    await migrateStaticWorkshops(user);
    setMigrating(false);
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Kelola Workshop</h1>
            <p className="text-sm text-gray-400 mt-1">{workshops.length} workshop terdaftar di platform</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleMigrate}
              disabled={migrating}
              className="px-4 py-2.5 rounded-xl border border-purple-200 text-[#5B21B6] text-sm font-medium hover:bg-purple-50 transition disabled:opacity-60"
            >
              {migrating ? "Memindahkan..." : "Migrasi Data Lama"}
            </button>

            <button
              onClick={() => navigate("/workshop/buat")}
              className="px-4 py-2.5 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition"
              style={{ background: "#5B21B6" }}
            >
              + Tambah Workshop
            </button>
          </div>
        </div>

        <div className="bg-white rounded-[20px] border border-[#f0edfb] overflow-hidden">
          {loading ? (
            <div className="text-center py-16 text-gray-400">Memuat...</div>
          ) : workshops.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              Belum ada workshop. Klik "Migrasi Data Lama" kalau kamu punya data workshop sebelumnya, atau "+ Tambah Workshop" untuk buat baru.
            </div>
          ) : (
            <div className="divide-y divide-[#f0edfb]">
              {workshops.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-[#FAFAFF] transition">
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-gray-900 truncate">{item.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      dibuat oleh: <span className="font-medium text-gray-600">{item.createdByName || "—"}</span>
                      {item.createdByRole === "admin" && (
                        <span className="ml-2 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-purple-50 text-purple-600">Admin</span>
                      )}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-gray-400 hidden md:inline">{item.date}</span>
                    <button
                      onClick={() => navigate(`/workshop/edit/${item.id}`)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-purple-50 hover:text-[#5B21B6] transition"
                      title="Edit"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-600 transition"
                      title="Hapus"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}