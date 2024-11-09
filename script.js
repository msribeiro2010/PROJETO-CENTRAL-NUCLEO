document.addEventListener("DOMContentLoaded", function () {
  // Inicializa o calendário com a data atual
  flatpickr("#calendar", {
      dateFormat: "d/m/Y",
      locale: "pt",
      defaultDate: new Date(),
  });

  // Função para atualizar o relógio
  function updateClock() {
      const DateTime = luxon.DateTime;
      const now = DateTime.local().setLocale("pt-BR");
      document.getElementById("clock").innerHTML = now.toLocaleString(
          DateTime.TIME_24_WITH_SECONDS
      );
  }

  // Atualiza o relógio a cada segundo
  setInterval(updateClock, 1000);
  updateClock(); // Atualiza imediatamente ao carregar a página

  // Tema Claro/Escuro
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const currentTheme = localStorage.getItem("theme") || "light";

  // Aplica o tema armazenado
  if (currentTheme === "dark") {
      document.body.classList.add("dark");
      themeIcon.classList.remove("bi-moon-fill");
      themeIcon.classList.add("bi-sun-fill");
  }

  // Evento de clique no botão de alternância
  themeToggle.addEventListener("click", function () {
      document.body.classList.toggle("dark");
      const isDark = document.body.classList.contains("dark");

      if (isDark) {
          themeIcon.classList.remove("bi-moon-fill");
          themeIcon.classList.add("bi-sun-fill");
          localStorage.setItem("theme", "dark");
      } else {
          themeIcon.classList.remove("bi-sun-fill");
          themeIcon.classList.add("bi-moon-fill");
          localStorage.setItem("theme", "light");
      }
  });
});
