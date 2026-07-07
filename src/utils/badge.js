export const getBadges = (xp, completedModules) => {
  const badges = [];

  // 🎯 berdasarkan XP
  if (xp >= 500) badges.push("Penjelajah Kelas");
  if (xp >= 1500) badges.push("Arsitek Pembelajaran");
  if (xp >= 3000) badges.push("Inovator Edukasi");
  if (xp >= 5000) badges.push("Legenda Pengajar");

  // 🎯 berdasarkan aktivitas
  if (completedModules >= 3) badges.push("Guru On Fire");
  if (completedModules >= 5) badges.push("Konsisten Berkembang");
  if (completedModules >= 10) badges.push("Master Learner");

  return badges;
};