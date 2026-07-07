import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import workshopsLocal from "../data/dataworkshop";
import { supabase } from "../lib/supabase";
import { addXP, isNodeCompleted } from "../services/xpService";

const WorkshopDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isSaved, setIsSaved] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [_hasRegistered, setHasRegistered] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [completingLoading, setCompletingLoading] = useState(false);
  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [xpAdded, setXpAdded] = useState(null); // show toast

  // Load current user
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setCurrentUser(session?.user || null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setCurrentUser(session?.user || null);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Load workshop data (Supabase first, fallback local)
  useEffect(() => {
    const loadWorkshop = async () => {
      try {
        const { data, error } = await supabase
          .from("workshops")
          .select("*")
          .eq("id", id)
          .single();

        if (!error && data) {
          setWorkshop({
            ...data,
            organizer: data.created_by_name || data.speaker,
            registerLink: data.registration_link,
            xp: 100,
          });
        } else {
          // Fallback to local data
          const local = workshopsLocal.find((w) => String(w.id) === String(id));
          setWorkshop(local ? { ...local, xp: 100 } : null);
        }
      } catch {
        const local = workshopsLocal.find((w) => String(w.id) === String(id));
        setWorkshop(local ? { ...local, xp: 100 } : null);
      } finally {
        setLoading(false);
      }
    };
    loadWorkshop();
  }, [id]);

  // Check if already completed by current user
  useEffect(() => {
    if (!currentUser || !id) return;
    isNodeCompleted(currentUser.id, `workshop-${id}`).then(setCompleted);
  }, [currentUser, id]);

  // ── Tandai Selesai ──────────────────────────────────────────────────────
  const handleComplete = async () => {
    if (!currentUser) {
      alert("Silakan login terlebih dahulu.");
      return;
    }
    if (completed) return;

    setCompletingLoading(true);
    const result = await addXP(
      currentUser.id,
      100,
      `Workshop selesai: ${workshop?.title}`,
      `workshop-${id}`
    );
    setCompletingLoading(false);

    if (result.success) {
      setCompleted(true);
      setXpAdded(100);
      setTimeout(() => setXpAdded(null), 3500);
    } else if (result.error === "Sudah diklaim sebelumnya.") {
      setCompleted(true);
    } else {
      alert("Gagal menyimpan progress. Coba lagi.");
    }
  };

  const handleRegisterRedirect = () => {
    const link = workshop?.registerLink || workshop?.registration_link;
    if (!link) { alert("Link pendaftaran belum tersedia."); return; }
    setHasRegistered(true);
    window.open(link, "_blank", "noopener,noreferrer");
  };

  // ── Loading ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#F5F3FF" }}>
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-purple-700 font-medium">Memuat workshop...</p>
        </div>
      </div>
    );
  }

  if (!workshop) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4" style={{ background: "#F5F3FF" }}>
        <div className="text-6xl">🎓</div>
        <h2 className="text-2xl font-bold text-gray-800">Workshop tidak ditemukan</h2>
        <button onClick={() => navigate("/workshop")}
          className="px-6 py-2.5 rounded-xl text-white font-medium" style={{ background: "#5B21B6" }}>
          Kembali ke Workshop
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-16" style={{ background: "#F5F3FF" }}>

      {/* XP TOAST */}
      {xpAdded && (
        <div className="fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl animate-bounce"
          style={{ background: "linear-gradient(135deg,#5B21B6,#7C3AED)", color: "white" }}>
          <span className="text-2xl">🎉</span>
          <div>
            <p className="font-bold text-sm">+{xpAdded} XP Didapat!</p>
            <p className="text-xs text-white/80">Workshop berhasil diselesaikan</p>
          </div>
        </div>
      )}

      {/* HERO */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 pt-4 md:pt-6">
        <div className="relative rounded-[24px] md:rounded-[28px] overflow-hidden shadow-[0_20px_45px_-15px_rgba(45,27,105,0.45)]"
          style={{ background: "linear-gradient(155deg, #2D1B69 0%, #3D2380 65%, #4C2A99 100%)", minHeight: 240 }}>

          {/* Dot pattern */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 240">
            {[0,1,2,3,4].map(row => [0,1,2,3,4,5,6].map(col => (
              <circle key={`${row}-${col}`} cx={col*40+20} cy={row*40+10} r="1.5" fill="white" opacity="0.12"/>
            )))}
            <circle cx="700" cy="110" r="140" fill="none" stroke="white" strokeWidth="0.8" opacity="0.1"/>
            <circle cx="700" cy="110" r="100" fill="none" stroke="white" strokeWidth="0.8" opacity="0.1"/>
            <circle cx="720" cy="80" r="36" fill="#3D2380" opacity="0.8"/>
            {[[110,35],[220,20],[330,30],[470,15],[560,45],[120,170],[330,185],[470,200]].map(([x,y],i) => (
              <circle key={i} cx={x} cy={y} r="1.5" fill="white" opacity="0.6"/>
            ))}
          </svg>

          {/* Back button */}
          <button onClick={() => navigate("/workshop")}
            className="absolute top-4 left-4 md:top-6 md:left-6 z-20 p-2 text-white hover:text-gray-200 hover:-translate-x-1 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          {/* Save button */}
          <button onClick={() => setIsSaved(s => !s)}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg hover:scale-110 transition">
            <svg className="w-4 h-4" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              style={isSaved ? { fill:"#EC4899", color:"#EC4899" } : { fill:"none", color:"#5B21B6" }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21l-7.682-8.318a4.5 4.5 0 010-6.364z"/>
            </svg>
          </button>

          <div className="relative z-10 flex flex-col justify-end h-full px-6 md:px-10 pt-16 pb-8">
            <span className="inline-flex items-center gap-1.5 w-fit text-[10.5px] font-semibold px-3 py-1 rounded-full mb-3 backdrop-blur"
              style={{ background:"rgba(255,255,255,0.14)", color:"#E9D5FF" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: workshop?.mode === "Online" ? "#34D399" : "#FBBF24" }}/>
              {workshop?.mode === "Online" ? "Workshop Online" : "Workshop Tatap Muka"}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2.5 leading-snug">{workshop?.title}</h1>
            <p className="text-white/70 text-xs md:text-sm flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              {workshop?.date}
              {workshop?.time && <><span className="text-white/30">·</span> {workshop.time}</>}
            </p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">

        {/* LEFT: Detail */}
        <div className="md:col-span-2 flex flex-col gap-5">

          {/* ORGANIZER */}
          <div className="flex items-center justify-between bg-white border border-purple-100 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm"
                style={{ background:"linear-gradient(135deg,#EDE9FE,#DDD6FE)", color:"#5B21B6" }}>
                {(workshop?.organizer || workshop?.speaker || "?").charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-[10.5px] font-semibold uppercase tracking-wide mb-0.5" style={{ color:"#A78BFA" }}>Penyelenggara</p>
                <p className="text-sm font-semibold text-gray-800">{workshop?.organizer || workshop?.speaker || workshop?.created_by_name}</p>
              </div>
            </div>
            <button onClick={() => setIsFollowing(f => !f)}
              className="text-sm font-medium px-4 py-2 rounded-xl transition"
              style={isFollowing ? { background:"#EDE9FE", color:"#5B21B6" } : { background:"#5B21B6", color:"#fff" }}>
              {isFollowing ? "Mengikuti" : "Ikuti"}
            </button>
          </div>

          {/* DESKRIPSI */}
          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-wide mb-2.5" style={{ color:"#A78BFA" }}>Tentang workshop ini</h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">{workshop?.description}</p>
          </div>

          {/* INFO AKSES */}
          <div className="bg-white border border-purple-100 rounded-2xl p-4 shadow-sm">
            <h2 className="text-[11px] font-semibold uppercase tracking-wide mb-3" style={{ color:"#A78BFA" }}>Info akses</h2>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background:"#EDE9FE" }}>
                <span className="text-sm">{workshop?.mode === "Online" ? "🔗" : "📍"}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{workshop?.location || "Lokasi belum ditentukan"}</p>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  {workshop?.mode === "Online"
                    ? "Tautan meeting akan dikirim ke email menjelang acara oleh penyelenggara."
                    : "Tunjukkan e-tiket atau kode QR dari penyelenggara saat check-in di lokasi."}
                </p>
              </div>
            </div>
          </div>

          {/* KUOTA */}
          {workshop?.quota && (
            <div className="bg-white border border-purple-100 rounded-2xl p-4 shadow-sm">
              <h2 className="text-[11px] font-semibold uppercase tracking-wide mb-3" style={{ color:"#A78BFA" }}>Kapasitas</h2>
              <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                <span>{workshop.registered || 0} / {workshop.quota} peserta</span>
                <span className="font-medium" style={{ color: "#5B21B6" }}>
                  {Math.max(0, workshop.quota - (workshop.registered || 0))} slot tersisa
                </span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background:"#F3E8FF" }}>
                <div className="h-2 rounded-full transition-all"
                  style={{ width:`${Math.min(100,Math.round(((workshop.registered||0)/workshop.quota)*100))}%`, background:"#7C3AED" }}/>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Action Card */}
        <div className="md:col-span-1">
          <div className="bg-white border border-purple-100 rounded-2xl p-5 md:sticky md:top-6 shadow-lg space-y-4">

            {/* Completed Badge */}
            {completed && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ background:"#ECFDF5", border:"1px solid #BBF7D0" }}>
                <span className="text-lg">✅</span>
                <div>
                  <p className="text-sm font-semibold text-green-700">Sudah Diselesaikan!</p>
                  <p className="text-xs text-green-500">+100 XP telah ditambahkan</p>
                </div>
              </div>
            )}

            {/* DAFTAR BUTTON */}
            <div>
              <button onClick={handleRegisterRedirect}
                className="w-full py-3 rounded-xl font-medium text-white transition hover:opacity-90 hover:-translate-y-0.5 shadow-md flex items-center justify-center gap-2"
                style={{ background:"linear-gradient(135deg,#6D28D9,#5B21B6)" }}>
                Daftar Workshop
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </button>
              <p className="text-[11px] text-gray-400 mt-1.5 text-center">Pendaftaran via situs penyelenggara.</p>
            </div>

            {/* TANDAI SELESAI */}
            <div className="border-t border-purple-50 pt-4">
              <div className="flex items-center gap-1.5 mb-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="#A78BFA" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                <p className="text-xs text-gray-400">Reward menyelesaikan di GuruBermutu</p>
              </div>

              <p className="text-2xl font-bold mb-3" style={{ color:"#EC4899" }}>+100 XP</p>

              <button onClick={handleComplete}
                disabled={completed || completingLoading}
                className="w-full py-3 rounded-xl font-medium transition active:scale-[0.98] flex items-center justify-center gap-2"
                style={completed
                  ? { background:"#EDE9FE", color:"#9CA3AF", cursor:"not-allowed" }
                  : { background:"linear-gradient(135deg,#F472B6,#EC4899)", color:"#fff", boxShadow:"0 6px 18px -6px rgba(236,72,153,0.55)" }
                }>
                {completingLoading ? (
                  <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"/> Menyimpan...</>
                ) : completed ? "✅ Sudah Diselesaikan" : "✅ Tandai Selesai (+100 XP)"}
              </button>
              <p className="text-[11px] text-gray-400 mt-1.5 text-center leading-relaxed">
                Tandai setelah kamu benar-benar mengikuti seluruh sesi.
              </p>
            </div>

            {/* SHARE */}
            <button
              onClick={async () => {
                if (navigator.share) {
                  await navigator.share({ title: workshop?.title, text: workshop?.description, url: window.location.href });
                } else {
                  await navigator.clipboard.writeText(window.location.href);
                  alert("Link berhasil disalin.");
                }
              }}
              className="w-full py-3 rounded-xl font-medium border transition hover:bg-purple-50 flex items-center justify-center gap-2"
              style={{ borderColor:"#EDE9FE", color:"#5B21B6" }}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342a3 3 0 100-2.684m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 8.658a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
              </svg>
              Bagikan Workshop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopDetail;