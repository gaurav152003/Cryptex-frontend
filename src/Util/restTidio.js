export const resetTidio = () => {
  document.cookie.split(";").forEach((c) => {
    if (c.includes("tidio")) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    }
  });

  Object.keys(localStorage).forEach((key) => {
    if (key.toLowerCase().includes("tidio")) {
      localStorage.removeItem(key);
    }
  });

  window.location.reload();
};
