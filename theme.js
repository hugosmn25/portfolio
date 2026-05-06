var themeToggleBtn = document.getElementById("theme-toggle");
var darkIcon = document.getElementById("theme-toggle-dark-icon");
var lightIcon = document.getElementById("theme-toggle-light-icon");

// --- INITIALISATION AU CHARGEMENT ---
if (
  localStorage.getItem("color-theme") === "dark" ||
  (!("color-theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark"); // <-- Ligne ajoutée ici
  if (lightIcon) lightIcon.classList.remove("hidden");
} else {
  document.documentElement.classList.remove("dark"); // <-- Ligne ajoutée ici
  if (darkIcon) darkIcon.classList.remove("hidden");
}

// --- GESTION DU CLIC ---
if (themeToggleBtn) { // Sécurité au cas où le bouton n'est pas sur la page
  themeToggleBtn.addEventListener("click", function () {
    darkIcon.classList.toggle("hidden");
    lightIcon.classList.toggle("hidden");

    if (localStorage.getItem("color-theme")) {
      if (localStorage.getItem("color-theme") === "light") {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
      }
    } else {
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
      }
    }
  });
}