import { supabase } from "../lib/supabase";
import workshopsLocal from "../data/dataworkshop";

// Migrasi data workshop lokal ke Supabase (jalankan sekali saja)
export async function migrateStaticWorkshops(user) {
  if (!user) {
    alert("Login sebagai admin dulu sebelum migrasi.");
    return;
  }

  const toInsert = workshopsLocal.map((w) => ({
    title: w.title || "",
    category: w.category || "",
    speaker: w.speaker || w.organizer || "",
    date: w.date || "",
    date_raw: w.dateRaw || "",
    time: w.time || "",
    mode: w.mode || "Online",
    location: w.location || "",
    thumbnail: w.thumbnail || w.image || "",
    description: w.description || "",
    registration_link: w.registerLink || w.registrationLink || "",
    quota: w.quota || 30,
    registered: w.registered || 0,
    created_by: user.uid,
    created_by_name: user.name,
    created_by_role: "admin",
  }));

  const { error } = await supabase.from("workshops").insert(toInsert);

  if (error) {
    console.error("Migrasi gagal:", error);
    alert("Migrasi gagal: " + error.message);
  } else {
    alert(`Berhasil migrasi ${toInsert.length} workshop!`);
  }
}