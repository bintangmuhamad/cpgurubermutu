export const getProgress = () => {
  const data = localStorage.getItem("skillProgress");
  return data ? JSON.parse(data) : {};
};

export const saveProgress = (progress) => {
  localStorage.setItem("skillProgress", JSON.stringify(progress));
};