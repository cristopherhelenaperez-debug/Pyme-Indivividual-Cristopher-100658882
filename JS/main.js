document.addEventListener("DOMContentLoaded", () => {
    const errorScreen = document.getElementById("error-screen");
    const btnRecover = document.getElementById("btn-recover");
    const systemRestored = sessionStorage.getItem("system_restored");

    if (systemRestored === "true" && errorScreen) {
        errorScreen.classList.add("hidden");
    }

    if (btnRecover && errorScreen) {
        btnRecover.addEventListener("click", () => {
            errorScreen.classList.add("hidden");
            sessionStorage.setItem("system_restored", "true");
        });
    }

    const themeToggleBtn = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme === "dark") {
        document.body.classList.add("dark-mode");
        if (themeToggleBtn) themeToggleBtn.textContent = "☀️ Modo Claro";
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");

            let theme = "light";
            if (document.body.classList.contains("dark-mode")) {
                theme = "dark";
                themeToggleBtn.textContent = "☀️ Modo Claro";
            } else {
                themeToggleBtn.textContent = "🌙 Modo Oscuro";
            }
            localStorage.setItem("theme", theme);
        });
    }
});
