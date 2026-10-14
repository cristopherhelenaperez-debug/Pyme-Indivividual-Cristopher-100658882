document.addEventListener("DOMContentLoaded", () => {
    // PANTALLA DE ERROR INICIAL (RECOVERY)
    const errorScreen = document.getElementById("error-screen");
    const btnRecover = document.getElementById("btn-recover");

    // Verificar si el usuario ya cerró el error en esta sesión para no molestarlo en cada página
    const systemRestored = sessionStorage.getItem("system_restored");

    if (systemRestored === "true" && errorScreen) {
        errorScreen.classList.add("hidden");
    }

    if (btnRecover && errorScreen) {
        btnRecover.addEventListener("click", () => {
            // Animación de ocultar
            errorScreen.classList.add("hidden");
            // Guardar en sesión que el sistema ya fue restaurado
            sessionStorage.setItem("system_restored", "true");
        });
    }

    // 2. MODO OSCURO (DARK MODE TOGGLE)
    const themeToggleBtn = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme");

    // Si ya tenía el tema oscuro guardado previamente
    if (currentTheme === "dark") {
        document.body.classList.add("dark-mode");
        if (themeToggleBtn) themeToggleBtn.textContent = "☀️ Modo Claro";
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            // Alternar clase .dark-mode en el <body>
            document.body.classList.toggle("dark-mode");

            let theme = "light";
            if (document.body.classList.contains("dark-mode")) {
                theme = "dark";
                themeToggleBtn.textContent = "☀️ Modo Claro";
            } else {
                themeToggleBtn.textContent = "🌙 Modo Oscuro";
            }

            // Guardar preferencia en localStorage
            localStorage.setItem("theme", theme);
        });
    }
});