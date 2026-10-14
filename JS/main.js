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
        if (themeToggleBtn) themeToggleBtn.textContent = "☀️";
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            // Alternar clase .dark-mode en el <body>
            document.body.classList.toggle("dark-mode");

            let theme = "light";
            if (document.body.classList.contains("dark-mode")) {
                theme = "dark";
                themeToggleBtn.textContent = "☀️";
            } else {
                themeToggleBtn.textContent = "🌙";
            }

            // Guardar preferencia en localStorage
            localStorage.setItem("theme", theme);
        });
    }
});
    // 3. CHATBOT INTERACTIVO (ABBABOT)
    const chatToggle = document.getElementById("chatbot-toggle");
    const chatWindow = document.getElementById("chatbot-window");
    const chatClose = document.getElementById("chatbot-close");
    const chatMessages = document.getElementById("chatbot-messages");
    const chatForm = document.getElementById("chatbot-form");
    const chatInput = document.getElementById("chatbot-input");
    const chatOptions = document.getElementById("chatbot-options");

    // Respuestas preprogramadas según palabras clave o botones
    const botAnswers = {
        servicios: "Ofrecemos computadoras, laptops, smartphones y periféricos con la nueva arquitectura de seguridad blindada AbbaTech.",
        incidente: "Sufriremos una brecha en los servidores legacy, pero reconstruimos el sistema desde cero con cifrado de extremo a extremo.",
        contacto: "Puedes llenar el formulario en la página de 'Contacto & Evidencias' o llamarnos directamente al +1 (809) 415-4343.",
        hola: "¡Hola! Soy AbbaBot 🤖. ¿En qué puedo ayudarte hoy en esta nueva era de AbbaTech?",
        precio: "Todos nuestros precios y catálogo actualizado los encuentras en la página principal.",
        default: "Entiendo. Mi sistema está procesando tu consulta. Para asistencia directa, te sugiero utilizar las opciones de abajo o nuestra página de Contacto."
    };

    let greeted = false;

    if (chatToggle && chatWindow) {
        chatToggle.addEventListener("click", () => {
            chatWindow.classList.toggle("hidden");
            
            if (!greeted) {
                addBotMessage("¡Hola! Bienvenido al nuevo portal de **AbbaTech**. Soy AbbaBot, tu asistente virtual. ¿Cómo puedo ayudarte hoy?");
                greeted = true;
            }
        });

        chatClose.addEventListener("click", () => {
            chatWindow.classList.add("hidden");
        });
    }

    // Función para agregar mensaje del Bot
    function addBotMessage(text) {
        const msgDiv = document.createElement("div");
        msgDiv.className = "msg msg-bot";
        msgDiv.innerHTML = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Función para agregar mensaje del Usuario
    function addUserMessage(text) {
        const msgDiv = document.createElement("div");
        msgDiv.className = "msg msg-user";
        msgDiv.textContent = text;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    if (chatForm) {
        chatForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const text = chatInput.value.trim().toLowerCase();
            if (!text) return;

            addUserMessage(chatInput.value);
            chatInput.value = "";

            // Responder con retraso simulación de "escribiendo..."
            setTimeout(() => {
                if (text.includes("servicio") || text.includes("producto") || text.includes("laptop")) {
                    addBotMessage(botAnswers.servicios);
                } else if (text.includes("ataque") || text.includes("incidente") || text.includes("paso") || text.includes("error")) {
                    addBotMessage(botAnswers.incidente);
                } else if (text.includes("contacto") || text.includes("telefono") || text.includes("correo") || text.includes("llam")) {
                    addBotMessage(botAnswers.contacto);
                } else if (text.includes("hola") || text.includes("buenas")) {
                    addBotMessage(botAnswers.hola);
                } else if (text.includes("precio") || text.includes("costo") || text.includes("cuanto")) {
                    addBotMessage(botAnswers.precio);
                } else {
                    addBotMessage(botAnswers.default);
                }
            }, 600);
        });
    }

    // Manejar clics en los botones de opciones rápidas
    if (chatOptions) {
        chatOptions.addEventListener("click", (e) => {
            if (e.target.classList.contains("chat-opt-btn")) {
                const responseKey = e.target.getAttribute("data-response");
                addUserMessage(e.target.textContent);

                setTimeout(() => {
                    addBotMessage(botAnswers[responseKey] || botAnswers.default);
                }, 500);
            }
        });
    }
