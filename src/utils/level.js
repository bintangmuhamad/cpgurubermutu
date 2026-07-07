export const getLevel = (xp) => {
  if (xp >= 5000) return { level: 5, name: "Guru Inspiratif" };
  if (xp >= 3000) return { level: 4, name: "Guru Produktif" };
  if (xp >= 1500) return { level: 3, name: "Guru Kreatif" };
  if (xp >= 500) return { level: 2, name: "Guru Berkembang" };
  return { level: 1, name: "Guru Pemula" };
};