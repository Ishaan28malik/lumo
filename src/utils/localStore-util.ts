export const getFromLocal = (key: string) => {
  return localStorage.getItem(key);
};
export const setToLocal = (key: string, value: string) => {
  localStorage.setItem(key, value);
};
