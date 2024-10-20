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
});
