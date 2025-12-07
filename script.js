function initializeFavorites() {
  console.log("Inicializando sistema de favoritos...");
  const favoritesList = document.getElementById("favorites-list");
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  // Adiciona o botão de favorito em cada botão
  document.querySelectorAll(".button-container button").forEach((button) => {
    // Verifica se o botão já tem uma estrela
    const existingStar = button.querySelector(
      ".favorite-star, .favorite-star-fill"
    );
    if (existingStar) {
      existingStar.remove();
    }

    // Cria o botão de estrela
    const starBtn = document.createElement("i");
    starBtn.className = `bi bi-star${
      isFavorite(button) ? "-fill favorite-star-fill" : " favorite-star"
    }`;

    // Configura o estilo da estrela
    Object.assign(starBtn.style, {
      position: "absolute",
      top: "8px",
      right: "8px",
      fontSize: "1.4rem",
      cursor: "pointer",
      zIndex: "10",
      color: isFavorite(button) ? "#fbbf24" : "#6b7280",
      opacity: isFavorite(button) ? "1" : "0.7",
      transition: "all 0.2s ease",
    });

    starBtn.title = isFavorite(button)
      ? "Remover dos favoritos"
      : "Adicionar aos favoritos";

    // Adiciona evento de clique na estrela
    starBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleFavorite(button);

      // Atualiza a aparência da estrela
      const isFav = isFavorite(button);
      starBtn.className = `bi bi-star${
        isFav ? "-fill favorite-star-fill" : " favorite-star"
      }`;
      starBtn.style.color = isFav ? "#fbbf24" : "#6b7280";
      starBtn.style.opacity = isFav ? "1" : "0.7";
      starBtn.title = isFav
        ? "Remover dos favoritos"
        : "Adicionar aos favoritos";
    });

    // Adiciona evento de hover
    starBtn.addEventListener("mouseover", () => {
      starBtn.style.opacity = "1";
      starBtn.style.transform = "scale(1.3)";
    });

    starBtn.addEventListener("mouseout", () => {
      if (!isFavorite(button)) {
        starBtn.style.opacity = "0.7";
      }
      starBtn.style.transform = "scale(1)";
    });

    // Garante que o botão tenha posição relativa para o posicionamento absoluto da estrela
    button.style.position = "relative";
    button.appendChild(starBtn);
  });

  // Renderiza a lista de favoritos
  renderFavorites();
}

// Inicialização quando a página carrega
document.addEventListener("DOMContentLoaded", function () {
  // Inicializa o relógio e data
  updateClock();
  updateDate();
  setInterval(updateClock, 1000);
  setInterval(updateDate, 60000);

  // Inicializa os acordeões
  initializeAccordions();

  // Inicializa os links da navbar
  initializeNavbarLinks();

  // Inicializa o tema
  initializeTheme();

  // Carrega os aniversariantes
  carregarAniversariantes();

  // Inicializa o modal de feriados
  const modal = document.getElementById("holiday-modal");
  if (modal) {
    // Reseta o estado do modal
    modal.style.display = "none";
    modal.classList.remove("show");
    // Define o mês atual
    currentMonthIndex = new Date().getMonth();
  }

  // Inicializa o Sortable para os grupos
  const groupsRow = document.querySelector(".groups-row");
  if (groupsRow) {
    new Sortable(groupsRow, {
      animation: 150,
      handle: ".accordion-header",
      ghostClass: "sortable-ghost",
      chosenClass: "sortable-chosen",
      dragClass: "sortable-drag",
      onEnd: function (evt) {
        // Salva a nova ordem no localStorage
        const groups = Array.from(groupsRow.children).map((group) => group.id);
        localStorage.setItem("groupsOrder", JSON.stringify(groups));
      },
    });

    // Restaura a ordem salva
    const savedOrder = JSON.parse(localStorage.getItem("groupsOrder") || "[]");
    if (savedOrder.length > 0) {
      const groupsArray = Array.from(groupsRow.children);
      savedOrder.forEach((id) => {
        const element = groupsArray.find((el) => el.id === id);
        if (element) {
          groupsRow.appendChild(element);
        }
      });
    }
  }

  // Inicializa a busca e favoritos por último
  setTimeout(() => {
    initializeSearch();
    initializeFavorites();

    // Verifica se há um novo grupo de Links Rápidos para inicializar favoritos
    const linksRapidosButtons = document.querySelectorAll(
      "#links-rapidos-content .button-container button"
    );
    if (linksRapidosButtons.length > 0) {
      console.log("Inicializando favoritos para Links Rápidos");
      linksRapidosButtons.forEach((button) => {
        // Verifica se o botão já tem uma estrela
        const existingStar = button.querySelector(
          ".favorite-star, .favorite-star-fill"
        );
        if (existingStar) {
          existingStar.remove();
        }

        // Cria o botão de estrela
        const starBtn = document.createElement("i");
        starBtn.className = `bi bi-star${
          isFavorite(button) ? "-fill favorite-star-fill" : " favorite-star"
        }`;

        // Configura o estilo da estrela
        Object.assign(starBtn.style, {
          position: "absolute",
          top: "8px",
          right: "8px",
          fontSize: "1.4rem",
          cursor: "pointer",
          zIndex: "10",
          color: isFavorite(button) ? "#fbbf24" : "#6b7280",
          opacity: isFavorite(button) ? "1" : "0.7",
          transition: "all 0.2s ease",
        });

        starBtn.title = isFavorite(button)
          ? "Remover dos favoritos"
          : "Adicionar aos favoritos";

        // Adiciona evento de clique na estrela
        starBtn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(button);

          // Atualiza a aparência da estrela
          const isFav = isFavorite(button);
          starBtn.className = `bi bi-star${
            isFav ? "-fill favorite-star-fill" : " favorite-star"
          }`;
          starBtn.style.color = isFav ? "#fbbf24" : "#6b7280";
          starBtn.style.opacity = isFav ? "1" : "0.7";
          starBtn.title = isFav
            ? "Remover dos favoritos"
            : "Adicionar aos favoritos";
        });

        // Adiciona evento de hover
        starBtn.addEventListener("mouseover", () => {
          starBtn.style.opacity = "1";
          starBtn.style.transform = "scale(1.3)";
        });

        starBtn.addEventListener("mouseout", () => {
          if (!isFavorite(button)) {
            starBtn.style.opacity = "0.7";
          }
          starBtn.style.transform = "scale(1)";
        });

        // Garante que o botão tenha posição relativa para o posicionamento absoluto da estrela
        button.style.position = "relative";
        button.appendChild(starBtn);
      });
    }

    console.log("Sistema de busca e favoritos inicializado");
  }, 100);

  // Inicializar o relógio do Windows
  updateWindowsClock();

  // Atualizar o relógio a cada minuto
  setInterval(updateWindowsClock, 60000);

  // Inicializa o sistema de usuários web
  const { userId, username } = registerWebUser();
  updateActiveUsers();
  registerUserActivity();

  // Atualiza a lista de usuários web a cada 30 segundos
  setInterval(updateActiveUsers, 30000);

  console.log(`Usuário web registrado: ${username} (${userId})`);

  // Funcionalidade de toggle para o container de grupos
  const toggleButton = document.getElementById("toggle-groups");
  const groupsContainer = document.getElementById("groups-container");

  if (toggleButton && groupsContainer) {
    toggleButton.addEventListener("click", function () {
      const isExpanded = toggleButton.getAttribute("aria-expanded") === "true";

      // Atualiza o estado do botão
      toggleButton.setAttribute("aria-expanded", !isExpanded);

      // Toggle da classe no container
      groupsContainer.classList.toggle("collapsed");
      groupsContainer.classList.toggle("expanded");

      // Atualiza o ícone
      const icon = toggleButton.querySelector("i");
      if (!isExpanded) {
        icon.className = "bi bi-chevron-up";
        groupsContainer.setAttribute("aria-hidden", "false");
      } else {
        icon.className = "bi bi-chevron-down";
        groupsContainer.setAttribute("aria-hidden", "true");
      }

      // Salva o estado no localStorage
      localStorage.setItem(
        "groupsContainerState",
        !isExpanded ? "expanded" : "collapsed"
      );
    });

    // Restaura o estado salvo ou define como encolhido por padrão
    const savedState = localStorage.getItem("groupsContainerState");
    if (savedState === "expanded") {
      toggleButton.setAttribute("aria-expanded", "true");
      groupsContainer.classList.remove("collapsed");
      groupsContainer.classList.add("expanded");
      toggleButton.querySelector("i").className = "bi bi-chevron-up";
    } else {
      // Por padrão, inicia encolhido
      toggleButton.setAttribute("aria-expanded", "false");
      groupsContainer.classList.add("collapsed");
      groupsContainer.classList.remove("expanded");
      toggleButton.querySelector("i").className = "bi bi-chevron-down";
      localStorage.setItem("groupsContainerState", "collapsed");
    }
  }

  // Função para exibir uma saudação com base na hora do dia
  const greetingElement = document.getElementById("greeting-message");
  const now = new Date();
  const hours = now.getHours();
  let greeting = "";

  if (hours >= 5 && hours < 12) {
    greeting = "Bom dia";
  } else if (hours >= 12 && hours < 18) {
    greeting = "Boa tarde";
  } else {
    greeting = "Boa noite";
  }

  greetingElement.textContent = `${greeting}, tenha um ótimo trabalho!`;

  // Sistema Info Tooltip
  const systemIcon = document.getElementById("system-info-icon");
  const tooltip = document.getElementById("system-info-tooltip");
  let isTooltipVisible = false;

  if (systemIcon && tooltip) {
    systemIcon.addEventListener("click", function (e) {
      e.stopPropagation();
      isTooltipVisible = !isTooltipVisible;
      tooltip.classList.toggle("show", isTooltipVisible);
    });

    // Fechar tooltip ao clicar fora
    document.addEventListener("click", function (e) {
      if (!tooltip.contains(e.target) && !systemIcon.contains(e.target)) {
        isTooltipVisible = false;
        tooltip.classList.remove("show");
      }
    });

    // Fechar tooltip ao pressionar ESC
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isTooltipVisible) {
        isTooltipVisible = false;
        tooltip.classList.remove("show");
      }
    });
  }

  // Contador de cliques para botões de atalho
  const buttons = document.querySelectorAll(".button-container button");

  buttons.forEach((btn, idx) => {
    let btnId = btn.textContent.trim() + "_" + idx;
    btnId = btnId.replace(/\s+/g, "_").replace(/[^\w\d_]/g, "");
    const counterSpan = btn.querySelector(".click-counter");
    if (!counterSpan) return;

    let count = parseInt(localStorage.getItem("btnClick_" + btnId)) || 0;
    counterSpan.textContent = count > 0 ? count : "";
    counterSpan.style.display = count > 0 ? "flex" : "none";
    btn.style.position = "relative";
    if (btn.lastElementChild !== counterSpan) {
      btn.appendChild(counterSpan);
    }
    btn.addEventListener("click", function (e) {
      count = parseInt(localStorage.getItem("btnClick_" + btnId)) || 0;
      count++;
      localStorage.setItem("btnClick_" + btnId, count);
      counterSpan.textContent = count;
      counterSpan.style.display = count > 0 ? "flex" : "none";
      if (count > 3 && !isFavorite(btn)) {
        toggleFavorite(btn);
      }
    });
  });
});

// Funções para o modal de feriados
let currentMonthIndex = new Date().getMonth();
const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

// Dados dos feriados 2025 embutidos para evitar problemas de CORS
const holidaysData = [
  { data: "01/01/2025", nome: "Recesso de Janeiro 2025", tipo: "RECESSO" },
  { data: "02/01/2025", nome: "Recesso de Janeiro 2025", tipo: "RECESSO" },
  { data: "03/01/2025", nome: "Recesso de Janeiro 2025", tipo: "RECESSO" },
  { data: "04/01/2025", nome: "Recesso de Janeiro 2025", tipo: "RECESSO" },
  { data: "05/01/2025", nome: "Recesso de Janeiro 2025", tipo: "RECESSO" },
  { data: "06/01/2025", nome: "Recesso de Janeiro 2025", tipo: "RECESSO" },
  { data: "03/03/2025", nome: "Carnaval", tipo: "Nacional" },
  { data: "04/03/2025", nome: "Carnaval", tipo: "Nacional" },
  { data: "05/03/2025", nome: "Quarta-feira de Cinzas", tipo: "Facultativo" },
  { data: "16/04/2025", nome: "Semana Santa", tipo: "Nacional" },
  { data: "17/04/2025", nome: "Semana Santa", tipo: "Nacional" },
  { data: "18/04/2025", nome: "Sexta-feira Santa", tipo: "Nacional" },
  { data: "21/04/2025", nome: "Tiradentes", tipo: "Nacional" },
  { data: "01/05/2025", nome: "Dia do Trabalho", tipo: "Nacional" },
  { data: "02/05/2025", nome: "Emenda de Feriado", tipo: "Facultativo" },
  { data: "19/06/2025", nome: "Corpus Christi", tipo: "Nacional" },
  { data: "20/06/2025", nome: "Emenda de Feriado", tipo: "Facultativo" },
  {
    data: "09/07/2025",
    nome: "Revolução Constitucionalista",
    tipo: "Estadual",
  },
  { data: "11/08/2025", nome: "Dia do Estudante", tipo: "Nacional" },
  { data: "07/09/2025", nome: "Independência do Brasil", tipo: "Nacional" },
  { data: "12/10/2025", nome: "Nossa Senhora Aparecida", tipo: "Nacional" },
  { data: "27/10/2025", nome: "Dia do Servidor Público", tipo: "Nacional" },
  { data: "02/11/2025", nome: "Finados", tipo: "Nacional" },
  { data: "15/11/2025", nome: "Proclamação da República", tipo: "Nacional" },
  { data: "20/11/2025", nome: "Dia da Consciência Negra", tipo: "Municipal" },
  { data: "21/11/2025", nome: "Emenda de Feriado", tipo: "Facultativo" },
  {
    data: "08/12/2025",
    nome: "Dia de Nossa Senhora da Conceição",
    tipo: "Municipal",
  },
  { data: "25/12/2025", nome: "Natal", tipo: "Nacional" },
  { data: "20/12/2025", nome: "Recesso de Final de Ano", tipo: "RECESSO" },
  { data: "21/12/2025", nome: "Recesso de Final de Ano", tipo: "RECESSO" },
  { data: "22/12/2025", nome: "Recesso de Final de Ano", tipo: "RECESSO" },
  { data: "23/12/2025", nome: "Recesso de Final de Ano", tipo: "RECESSO" },
  { data: "24/12/2025", nome: "Recesso de Final de Ano", tipo: "RECESSO" },
  { data: "26/12/2025", nome: "Recesso de Final de Ano", tipo: "RECESSO" },
  { data: "27/12/2025", nome: "Recesso de Final de Ano", tipo: "RECESSO" },
  { data: "28/12/2025", nome: "Recesso de Final de Ano", tipo: "RECESSO" },
  { data: "29/12/2025", nome: "Recesso de Final de Ano", tipo: "RECESSO" },
  { data: "30/12/2025", nome: "Recesso de Final de Ano", tipo: "RECESSO" },
  { data: "31/12/2025", nome: "Recesso de Final de Ano", tipo: "RECESSO" },
];

async function showHolidays() {
  const modal = document.getElementById("holiday-modal");
  modal.style.display = "block";
  // Força um reflow para que a transição funcione
  modal.offsetHeight;
  modal.classList.add("show");
  await loadHolidays();
}

function closeHolidayModal() {
  const modal = document.getElementById("holiday-modal");
  modal.classList.remove("show");
  // Aguarda a transição terminar antes de esconder o modal
  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
}

async function loadHolidays() {
  const holidaysList = document.getElementById("holidays-list");

  try {
    console.log("Iniciando carregamento dos feriados...");
    // Mostra o estado de loading
    holidaysList.innerHTML = `
            <div class="loading-state">
                <i class="bi bi-arrow-repeat spin"></i>
                <p>Carregando feriados...</p>
            </div>
        `;

    console.log("Usando dados embarcados dos feriados...");

    // Usar dados embarcados ao invés de fetch
    console.log("Processando dados dos feriados...");

    // Os dados já estão no formato correto
    const holidays = holidaysData;
    console.log("Feriados carregados:", holidays.length, "items");

    // Atualiza o mês atual no título
    document.getElementById(
      "current-month"
    ).textContent = `${months[currentMonthIndex]} 2025`;

    // Filtra os feriados do mês atual
    const currentMonthHolidays = holidays.filter((holiday) => {
      const holidayMonth = parseInt(holiday.data.split("/")[1]) - 1;
      return holidayMonth === currentMonthIndex;
    });

    // Renderiza os feriados
    holidaysList.innerHTML = "";

    if (currentMonthHolidays.length === 0) {
      holidaysList.innerHTML =
        '<p class="no-holidays">Não há feriados neste mês.</p>';
      return;
    }

    currentMonthHolidays.forEach((holiday) => {
      const holidayElement = document.createElement("div");
      holidayElement.className = `holiday-item ${holiday.tipo}`;

      const date = holiday.data.split("/");
      const holidayDate = new Date(
        2025,
        parseInt(date[1]) - 1,
        parseInt(date[0])
      );
      const weekday = holidayDate.toLocaleDateString("pt-BR", {
        weekday: "long",
      });

      // Calcular dias restantes
      const today = new Date();
      const diffTime = holidayDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // Texto para exibir os dias restantes
      let daysRemainingText = "";
      let countdownClass = "";

      if (diffDays < 0) {
        daysRemainingText = "Já passou";
        countdownClass = "passed";
      } else if (diffDays === 0) {
        daysRemainingText = "Hoje!";
        countdownClass = "today";
      } else if (diffDays === 1) {
        daysRemainingText = "Amanhã!";
        countdownClass = "tomorrow";
      } else {
        daysRemainingText = `Faltam ${diffDays} dias`;
      }

      holidayElement.innerHTML = `
                <span class="holiday-date">${holiday.data}</span>
                <span class="holiday-weekday">${weekday}</span>
                <span class="holiday-name">${holiday.nome}</span>
                <span class="holiday-type ${holiday.tipo}">${holiday.tipo}</span>
                <span class="holiday-countdown ${countdownClass}">${daysRemainingText}</span>
            `;

      holidaysList.appendChild(holidayElement);
    });

    // Atualiza o próximo feriado
    updateNextHoliday(holidays);
  } catch (error) {
    console.error("Erro ao carregar feriados:", error);
    holidaysList.innerHTML = `
            <div class="error-state">
                <i class="bi bi-exclamation-circle"></i>
                <p>Erro ao carregar feriados</p>
                <button onclick="loadHolidays()" class="retry-button">
                    <i class="bi bi-arrow-clockwise"></i>
                    Tentar novamente
                </button>
            </div>
        `;
  }
}

function updateNextHoliday(holidays) {
  // Filtrar feriados do mês atual ou futuros
  const today = new Date();
  const currentViewDate = new Date(2025, currentMonthIndex, 1);

  const relevantHolidays = holidays.filter((holiday) => {
    const [day, month] = holiday.data.split("/");
    const holidayDate = new Date(2025, parseInt(month) - 1, parseInt(day));

    // Se estamos visualizando um mês futuro, mostrar feriados desse mês
    if (currentViewDate > today) {
      return holidayDate.getMonth() === currentMonthIndex;
    }
    // Se estamos no mês atual ou passado, mostrar próximos feriados
    return holidayDate >= today;
  });

  if (relevantHolidays.length > 0) {
    const nextHoliday = relevantHolidays[0];
    const [day, month] = nextHoliday.data.split("/");
    const holidayDate = new Date(2025, parseInt(month) - 1, parseInt(day));
    const weekday = holidayDate.toLocaleDateString("pt-BR", {
      weekday: "long",
    });

    // Calcular dias restantes
    const timeDiff = holidayDate - today;
    const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    let daysText = "";
    if (daysRemaining > 0) {
      daysText = `<small>(em ${daysRemaining} dia${
        daysRemaining > 1 ? "s" : ""
      })</small>`;
    } else if (daysRemaining === 0) {
      daysText =
        '<small style="color: #C4965F; font-weight: bold;">(HOJE!)</small>';
    } else {
      daysText = "<small>(passou)</small>";
    }

    document.getElementById("next-holiday").innerHTML = `
            <div class="next-holiday-content">
                <div class="next-holiday-date">
                    <i class="bi bi-calendar-heart"></i>
                    ${nextHoliday.data} (${weekday}) ${daysText}
                </div>
                <div class="next-holiday-name">
                    ${nextHoliday.nome}
                </div>
                <div class="next-holiday-type ${nextHoliday.tipo}">
                    ${nextHoliday.tipo}
                </div>
            </div>
        `;
  } else {
    if (currentViewDate > today) {
      document.getElementById("next-holiday").innerHTML =
        "<p>Não há feriados neste mês.</p>";
    } else {
      document.getElementById("next-holiday").innerHTML =
        "<p>Não há feriados próximos.</p>";
    }
  }
}

function prevMonth() {
  const holidaysList = document.getElementById("holidays-list");
  holidaysList.style.opacity = "0";
  holidaysList.style.transform = "translateX(20px)";

  setTimeout(() => {
    currentMonthIndex = (currentMonthIndex - 1 + 12) % 12;
    loadHolidays();

    setTimeout(() => {
      holidaysList.style.opacity = "1";
      holidaysList.style.transform = "translateX(0)";
    }, 50);
  }, 300);
}

function nextMonth() {
  const holidaysList = document.getElementById("holidays-list");
  holidaysList.style.opacity = "0";
  holidaysList.style.transform = "translateX(-20px)";

  setTimeout(() => {
    currentMonthIndex = (currentMonthIndex + 1) % 12;
    loadHolidays();

    setTimeout(() => {
      holidaysList.style.opacity = "1";
      holidaysList.style.transform = "translateX(0)";
    }, 50);
  }, 300);
}

// Event listener para fechar o modal quando clicar fora dele
document.addEventListener("click", function (event) {
  const modal = document.getElementById("holiday-modal");
  const modalContent = modal.querySelector(".modal-content");

  if (event.target === modal && !modalContent.contains(event.target)) {
    closeHolidayModal();
  }
});

// Event listener para fechar o modal com a tecla ESC
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    const modal = document.getElementById("holiday-modal");
    if (modal.style.display === "block") {
      closeHolidayModal();
    }
  }
});

// Funções para o relógio e data
function updateClock() {
  const now = new Date();
  const clock = document.getElementById("clock");
  clock.textContent = now.toLocaleTimeString("pt-BR");
}

function updateDate() {
  const now = new Date();
  const weekday = document.getElementById("weekday");
  const currentDate = document.getElementById("current-date");

  const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  weekday.textContent = weekdays[now.getDay()];
  currentDate.textContent = now.toLocaleDateString("pt-BR");
}

// Funções para os favoritos
function isFavorite(button) {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  return favorites.includes(button.textContent.trim());
}

function toggleFavorite(button) {
  const buttonText = button.textContent.trim();
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  const index = favorites.indexOf(buttonText);

  if (index === -1) {
    favorites.push(buttonText);
    showToast("Adicionado aos favoritos");
  } else {
    favorites.splice(index, 1);
    showToast("Removido dos favoritos");
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderFavorites();
}

function renderFavorites() {
  const favoritesList = document.getElementById("favorites-list");
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

  // Destruir instância anterior do Sortable se existir
  if (favoritesList.sortableInstance) {
    favoritesList.sortableInstance.destroy();
  }

  favoritesList.innerHTML = "";

  if (favorites.length === 0) {
    favoritesList.innerHTML = `
            <div class="no-favorites">
                <i class="bi bi-star"></i>
                <p class="message-primary">Seus atalhos favoritos aparecerão aqui!</p>
                <p class="message-secondary">
                    Para começar, procure o ícone <span class="highlight"><i class="bi bi-star"></i> Favoritar</span> 
                    nos botões e clique para adicionar aos seus favoritos.
                </p>
                <p class="message-secondary">
                    Organize seus atalhos mais usados aqui para ter acesso rápido às suas ferramentas preferidas.
                </p>
            </div>
        `;
    return;
  }

  // Criar um container para os itens favoritos
  const favoritesContainer = document.createElement("div");
  favoritesContainer.className = "favorites-items-container";
  favoritesList.appendChild(favoritesContainer);

  favorites.forEach((favorite) => {
    const button = Array.from(
      document.querySelectorAll(".button-container button")
    ).find((btn) => btn.textContent.trim() === favorite);

    if (button) {
      const favoriteItem = document.createElement("div");
      favoriteItem.className = "favorite-item";
      favoriteItem.draggable = true;

      const icon = button.querySelector("i")?.className || "";
      let url =
        button.getAttribute("onclick")?.match(/window\.open\('([^']+)'/)?.[1] ||
        "";
      let clickHandler;

      // Tratamento especial para o botão de Feriados
      if (favorite.includes("Feriados-2025")) {
        clickHandler = (e) => {
          if (!e.target.closest(".remove-favorite")) {
            showHolidays();
          }
        };
      } else {
        clickHandler = (e) => {
          if (!e.target.closest(".remove-favorite") && url) {
            window.open(url, "_blank");
          }
        };
      }

      favoriteItem.innerHTML = `
                <button class="remove-favorite" title="Desfavoritar">
                    <i class="bi bi-star-fill"></i>
                </button>
                <i class="${icon}"></i>
                <span>${favorite}</span>
            `;

      favoriteItem.onclick = (e) => {
        if (e.target.closest(".remove-favorite")) {
          e.preventDefault();
          e.stopPropagation();
          const favorites = JSON.parse(
            localStorage.getItem("favorites") || "[]"
          );
          const index = favorites.indexOf(favorite);
          if (index !== -1) {
            favorites.splice(index, 1);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            // Zera o contador de cliques do botão correspondente
            const btnIdx = Array.from(
              document.querySelectorAll(".button-container button")
            ).findIndex((btn) => btn.textContent.trim() === favorite);
            if (btnIdx !== -1) {
              let btnId = favorite + "_" + btnIdx;
              btnId = btnId.replace(/\s+/g, "_").replace(/[^\w\d_]/g, "");
              localStorage.removeItem("btnClick_" + btnId);
              // Atualiza o badge se existir
              const btn = document.querySelectorAll(".button-container button")[
                btnIdx
              ];
              const counterSpan = btn?.querySelector(".click-counter");
              if (counterSpan) counterSpan.textContent = "";
            }
            renderFavorites();
            showToast("Removido dos favoritos");
          }
          return;
        }
        clickHandler(e);
      };

      favoritesContainer.appendChild(favoriteItem);
    }
  });

  // Inicializar Sortable na nova lista
  if (favorites.length > 0) {
    favoritesList.sortableInstance = new Sortable(favoritesContainer, {
      animation: 150,
      ghostClass: "sortable-ghost",
      chosenClass: "sortable-chosen",
      dragClass: "sortable-drag",
      handle: ".favorite-item",
      onEnd: function (evt) {
        const newOrder = Array.from(
          favoritesContainer.querySelectorAll(".favorite-item span")
        ).map((span) => span.textContent.trim());

        if (newOrder.length > 0) {
          localStorage.setItem("favorites", JSON.stringify(newOrder));
          showToast("Ordem dos favoritos atualizada");
        }
      },
    });
  }
}

// Funções para os accordions
function initializeAccordions() {
  // Primeiro, garantir que todos os accordions iniciem fechados
  document.querySelectorAll(".accordion-header").forEach((header) => {
    const content = header.nextElementSibling;
    const icon = header.querySelector(".accordion-icon");

    // Definir estado inicial como fechado
    header.setAttribute("aria-expanded", "false");
    if (content) {
      content.style.display = "none";
    }
    if (icon) {
      icon.style.transform = "rotate(0deg)";
    }

    // Adicionar event listener para toggle
    header.addEventListener("click", () => {
      // Toggle aria-expanded
      const isExpanded = header.getAttribute("aria-expanded") === "true";
      header.setAttribute("aria-expanded", !isExpanded);

      // Toggle content display
      content.style.display = isExpanded ? "none" : "block";

      // Rotate icon
      icon.style.transform = isExpanded ? "rotate(0deg)" : "rotate(180deg)";
    });
  });
}

// Funções para a navegação
function initializeNavbarLinks() {
  document.querySelectorAll(".navbar-links a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("data-target");
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });

        // Expande o accordion se estiver fechado
        const header = targetElement.querySelector(".accordion-header");
        const content = targetElement.querySelector(".accordion-content");
        if (header && content && content.style.display !== "block") {
          header.click();
        }
      }
    });
  });
}

// Funções para o tema
function initializeTheme() {
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const isDark = localStorage.getItem("darkMode") === "true";

  if (isDark) {
    document.documentElement.classList.add("dark");
    document.body.classList.add("dark");
    themeIcon.className = "bi bi-sun-fill";
  }

  themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    document.body.classList.toggle("dark");
    const isDarkMode = document.body.classList.contains("dark");
    localStorage.setItem("darkMode", isDarkMode);
    themeIcon.className = isDarkMode ? "bi bi-sun-fill" : "bi bi-moon-fill";
  });
}

// Funções para a busca
// Função para detectar se o input é uma data de nascimento ou ano
function isDateOfBirth(input) {
  const trimmed = input.trim();
  // Formatos aceitos: DD/MM/YYYY, DD-MM-YYYY, DD.MM.YYYY ou apenas YYYY
  const fullDateRegex = /^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})$/;
  const yearOnlyRegex = /^(\d{4})$/;
  return fullDateRegex.test(trimmed) || yearOnlyRegex.test(trimmed);
}

// Função para detectar se é apenas um ano
function isYearOnly(input) {
  const yearOnlyRegex = /^(\d{4})$/;
  return yearOnlyRegex.test(input.trim());
}

// Função para detectar se é um nome
function isName(query) {
  // Remove espaços extras e verifica se contém apenas letras, espaços e acentos
  const cleanQuery = query.trim().toLowerCase();
  const namePattern = /^[a-zA-ZÀ-ÿ\s]{2,}$/;

  // Lista de nomes dos funcionários do NAPje que DEVEM gerar mensagens motivacionais
  const napjeNames = [
    "marta",
    "marcelo",
    "silvio",
    "sílvio",
    "nathany",
    "lloyd",
    "wagner",
    "tatiana",
    "natalia",
    "natália",
    "edson",
    "caetano",
  ];

  // Lista de termos que definitivamente NÃO são nomes pessoais
  const systemTerms = [
    "contra",
    "contracheque",
    "folha",
    "pagamento",
    "salario",
    "salário",
    "ferias",
    "férias",
    "licenca",
    "licença",
    "atestado",
    "prevjud",
    "ponto",
    "frequencia",
    "frequência",
    "banco",
    "horas",
    "sistema",
    "portal",
    "acesso",
    "login",
    "senha",
    "cadastro",
    "dados",
    "informacao",
    "informação",
    "documento",
    "certidao",
    "certidão",
    "declaracao",
    "declaração",
    "comprovante",
    "extrato",
    "relatorio",
    "relatório",
    "consulta",
    "pesquisa",
    "busca",
    "procurar",
    "ajuda",
    "suporte",
    "contato",
    "telefone",
    "endereco",
    "endereço",
    "email",
    "site",
    "internet",
    "download",
    "arquivo",
    "pdf",
    "excel",
    "word",
    "impressao",
    "impressão",
    "imprimir",
    "visualizar",
    "calendario",
    "calendário",
    "agenda",
    "evento",
    "reuniao",
    "reunião",
    "meeting",
    "zoom",
    "teams",
    "trabalho",
    "servico",
    "serviço",
    "funcao",
    "função",
    "cargo",
    "departamento",
    "setor",
    "unidade",
    "tribunal",
    "justica",
    "justiça",
    "processo",
    "juridico",
    "jurídico",
  ];

  // Verifica se é um termo do sistema (não é nome)
  if (systemTerms.includes(cleanQuery)) {
    return false;
  }

  // Verifica se é um nome da equipe NAPje
  if (napjeNames.includes(cleanQuery)) {
    return true;
  }

  // Para outros nomes, não exibe mensagem motivacional
  return false;
}

// Sistema de frases motivacionais
const motivationalQuotes = [
  "Acredite em si mesmo e todo o resto se encaixará. Tenha fé em suas próprias habilidades, trabalhe duro e não há nada que você não possa realizar.",
  "O sucesso não é final, o fracasso não é fatal: é a coragem de continuar que conta.",
  "Você é mais corajoso do que acredita, mais forte do que parece e mais inteligente do que pensa.",
  "A única maneira de fazer um excelente trabalho é amar o que você faz.",
  "Não espere por oportunidades extraordinárias. Agarre ocasiões comuns e as torne grandiosas.",
  "O futuro pertence àqueles que acreditam na beleza de seus sonhos.",
  "Seja você mesmo; todos os outros já foram tomados.",
  "A vida é 10% do que acontece com você e 90% de como você reage a isso.",
  "Grandes coisas nunca vêm de zonas de conforto.",
  "Você não precisa ser perfeito, você só precisa ser você mesmo.",
  "Cada dia é uma nova oportunidade para ser melhor do que ontem.",
  "Acredite que você pode e você já está no meio do caminho.",
  "O único limite para nossa realização de amanhã serão nossas dúvidas de hoje.",
  "Seja a mudança que você quer ver no mundo.",
  "A persistência é o caminho do êxito.",
  "Você é capaz de coisas incríveis quando acredita em si mesmo.",
  "Sonhe grande e ouse falhar.",
  "A felicidade não é algo pronto. Ela vem de suas próprias ações.",
  "Seja gentil consigo mesmo. Você está fazendo o melhor que pode.",
  "Cada pequeno passo conta. Continue caminhando.",
];

// Função para obter uma frase motivacional aleatória
function getMotivationalQuote() {
  const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
  return motivationalQuotes[randomIndex];
}

// Função para criar resultado motivacional
function createMotivationalResult(name, quote) {
  const resultItem = document.createElement("div");
  resultItem.className = "motivational-result";
  resultItem.innerHTML = `
        <div class="motivational-header">
            <i class="bi bi-heart-fill" style="color: #e91e63;"></i>
            <span>Mensagem Especial${name ? ` para ${name}` : ""}</span>
        </div>
        <div class="motivational-content">
            <div class="quote-text">
                <i class="bi bi-quote quote-icon"></i>
                ${quote}
            </div>
            ${
              name
                ? `<div class="personal-message">Continue brilhando, ${name}! ✨</div>`
                : ""
            }
        </div>
        <div class="motivational-footer">
            <small><i class="bi bi-lightbulb"></i> Uma dose de inspiração para o seu dia</small>
        </div>
    `;

  return resultItem;
}

// Função para calcular estatísticas de vida
function calculateLifeStats(birthDate) {
  const now = new Date();
  const birth = new Date(birthDate);

  if (birth > now) {
    return null; // Data futura
  }

  const diffMs = now - birth;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffSeconds = Math.floor(diffMs / 1000);

  // Cálculo de anos, meses e dias precisos
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  // Estatísticas criativas (valores médios)
  const heartbeats = Math.floor(diffMinutes * 70); // 70 bpm médio
  const breaths = Math.floor(diffMinutes * 16); // 16 respirações por minuto
  const steps = Math.floor(diffDays * 7500); // 7500 passos por dia médio
  const blinks = Math.floor(diffMinutes * 17); // 17 piscadas por minuto
  const sleepHours = Math.floor(diffHours * 0.33); // 8 horas de sono por dia

  return {
    years,
    months,
    days: days,
    totalDays: diffDays,
    totalHours: diffHours,
    totalMinutes: diffMinutes,
    totalSeconds: diffSeconds,
    heartbeats,
    breaths,
    steps,
    blinks,
    sleepHours,
  };
}

// Função para formatar números grandes
function formatNumber(num) {
  return num.toLocaleString("pt-BR");
}

// Função para calcular apenas a idade quando informado só o ano
function calculateSimpleAge(year) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - year;

  if (age < 0) {
    return null; // Ano futuro
  }

  return age;
}

// Função para criar resultado simples de idade (apenas ano)
function createSimpleAgeResult(age, year) {
  const resultItem = document.createElement("div");
  resultItem.className = "age-curiosity-result simple-age";
  resultItem.innerHTML = `
        <div class="age-result-header">
            <i class="bi bi-calendar-check" style="color: #4CAF50;"></i>
            <span>Idade Calculada</span>
        </div>
        <div class="simple-age-display">
            <div class="age-number">${age}</div>
            <div class="age-label">anos de idade</div>
            <div class="birth-year">nascido(a) em ${year}</div>
        </div>
        <div class="age-result-footer">
            <small><i class="bi bi-info-circle"></i> Cálculo baseado no ano de nascimento</small>
        </div>
    `;

  return resultItem;
}

// Função para criar o resultado da curiosidade de idade
function createAgeResult(stats, birthDateStr) {
  const resultItem = document.createElement("div");
  resultItem.className = "age-curiosity-result";
  resultItem.innerHTML = `
        <div class="age-result-header">
            <i class="bi bi-calendar-heart" style="color: #e91e63;"></i>
            <span>Curiosidade: Sua Jornada de Vida</span>
        </div>
        <div class="age-stats-grid">
            <div class="age-stat-card primary">
                <div class="stat-icon"><i class="bi bi-cake2"></i></div>
                <div class="stat-content">
                    <div class="stat-number">${stats.years}</div>
                    <div class="stat-label">anos, ${stats.months} meses e ${
    stats.days
  } dias</div>
                </div>
            </div>
            
            <div class="age-stat-card">
                <div class="stat-icon"><i class="bi bi-clock"></i></div>
                <div class="stat-content">
                    <div class="stat-number">${formatNumber(
                      stats.totalHours
                    )}</div>
                    <div class="stat-label">horas vividas</div>
                </div>
            </div>
            
            <div class="age-stat-card">
                <div class="stat-icon"><i class="bi bi-heart-pulse"></i></div>
                <div class="stat-content">
                    <div class="stat-number">${formatNumber(
                      stats.heartbeats
                    )}</div>
                    <div class="stat-label">batimentos cardíacos</div>
                </div>
            </div>
            
            <div class="age-stat-card">
                <div class="stat-icon"><i class="bi bi-wind"></i></div>
                <div class="stat-content">
                    <div class="stat-number">${formatNumber(
                      stats.breaths
                    )}</div>
                    <div class="stat-label">respirações</div>
                </div>
            </div>
            
            <div class="age-stat-card">
                <div class="stat-icon"><i class="bi bi-person-walking"></i></div>
                <div class="stat-content">
                    <div class="stat-number">${formatNumber(stats.steps)}</div>
                    <div class="stat-label">passos dados</div>
                </div>
            </div>
            
            <div class="age-stat-card">
                <div class="stat-icon"><i class="bi bi-eye"></i></div>
                <div class="stat-content">
                    <div class="stat-number">${formatNumber(stats.blinks)}</div>
                    <div class="stat-label">piscadas</div>
                </div>
            </div>
        </div>
        <div class="age-result-footer">
            <small><i class="bi bi-info-circle"></i> Baseado em médias estatísticas para data: ${birthDateStr}</small>
        </div>
    `;

  return resultItem;
}

// Função para detectar se o texto é um número de processo
function isProcessNumber(input) {
  // Formato: NNNNNNN-DD.AAAA.J.TR.OOOO
  const processPattern = /^\d{7}-\d{2}\.\d{4}\.\d{1}\.\d{2}\.\d{4}$/;
  return processPattern.test(input.trim());
}

// Função para extrair os últimos 4 dígitos do número de processo
function extractCourtCode(processNumber) {
  const cleanNumber = processNumber.trim();
  // Os últimos 4 dígitos estão no final do número
  const lastFourDigits = cleanNumber.slice(-4);
  return lastFourDigits;
}

// Função para buscar o órgão correspondente no arquivo JSON
async function findCourtByCode(code) {
  try {
    const response = await fetch("orgaos_1grau.json");
    if (!response.ok) {
      throw new Error("Erro ao carregar arquivo de órgãos");
    }

    const orgaos = await response.json();
    const orgao = orgaos.find((item) => item.codigo === code);

    return orgao ? orgao.orgao : null;
  } catch (error) {
    console.error("Erro ao buscar órgão:", error);
    return null;
  }
}

// Função para criar o resultado da busca por processo
function createProcessResult(processNumber, courtName) {
  const resultDiv = document.createElement("div");
  resultDiv.className = "search-result-item process-result";

  resultDiv.innerHTML = `
        <div class="process-info" style="width: 100%;">
            <div class="court-info" style="display: flex; align-items: center; justify-content: space-between; width: 100%; gap: 10px;">
                <div style="display: flex; align-items: center; gap: 8px; flex: 1;">
                    <i class="bi bi-building"></i>
                    <span class="court-name">${courtName}</span>
                </div>
                <div style="display: flex; gap: 8px;">
                    <button class="copy-court-btn" title="Copiar nome da vara" style="background: #e2e8f0; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 4px;">
                        <i class="bi bi-copy"></i>
                    </button>
                    <button class="consultar-processo-btn" title="Consultar detalhes do processo" style="background: linear-gradient(135deg, #1e3a5f, #2d5a87); color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 6px; font-weight: 500;">
                        <i class="bi bi-search"></i>
                        Consultar Detalhes
                    </button>
                </div>
            </div>
        </div>
    `;

  // Adiciona evento de clique para copiar o nome da vara
  const copyCourtBtn = resultDiv.querySelector(".copy-court-btn");
  copyCourtBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    navigator.clipboard
      .writeText(courtName)
      .then(() => {
        showToast("Nome da vara copiado para a área de transferência!");
      })
      .catch(() => {
        showToast("Erro ao copiar nome da vara");
      });
  });

  // Adiciona evento de clique para consultar detalhes do processo
  const consultarBtn = resultDiv.querySelector(".consultar-processo-btn");
  consultarBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    // Preenche o campo de busca do modal e abre
    if (typeof openProcessoModal === 'function') {
      openProcessoModal();
      setTimeout(() => {
        const modalInput = document.getElementById('processo-search-input');
        if (modalInput) {
          modalInput.value = processNumber;
          // Dispara a busca automaticamente
          if (typeof buscarProcesso === 'function') {
            buscarProcesso();
          }
        }
      }, 100);
    } else {
      // Fallback: busca direta via API
      consultarProcessoDirecto(processNumber);
    }
  });

  return resultDiv;
}

// Função para consultar processo diretamente (fallback)
async function consultarProcessoDirecto(numero) {
  showToast("Buscando dados do processo...");
  try {
    const response = await fetch(`/api/processo/${numero}/completo`);
    if (!response.ok) {
      throw new Error('Processo não encontrado');
    }
    const data = await response.json();
    
    // Mostra os dados em um alert formatado (fallback simples)
    const info = `
PROCESSO: ${data.numero}
CLASSE: ${data.classe?.nome || 'N/A'}
ÓRGÃO: ${data.orgaoJulgador?.nome || 'N/A'}
VALOR: R$ ${data.valorCausa?.toLocaleString('pt-BR') || '0,00'}
STATUS: ${data.localizacao?.status || 'N/A'}
AUTUAÇÃO: ${data.dataAutuacao ? new Date(data.dataAutuacao).toLocaleDateString('pt-BR') : 'N/A'}
    `;
    
    alert(info);
  } catch (error) {
    showToast("Erro ao consultar processo: " + error.message);
  }
}

function initializeSearch() {
  const searchInput = document.getElementById("global-search");
  const searchResults = document.getElementById("search-results");
  let searchIndex = [];

  // Cria o índice de busca
  document.querySelectorAll(".button-container button").forEach((button) => {
    const text = button.textContent.trim();
    const url = button.getAttribute("onclick")?.match(/'([^']+)'/)?.[1] || "";
    const icon = button.querySelector("i")?.className || "";

    searchIndex.push({
      text,
      url,
      icon,
      element: button,
      searchTerms: `${text.toLowerCase()} ${url.toLowerCase()}`,
    });
  });

  // Eventos do input de busca
  searchInput.addEventListener("input", async () => {
    const query = searchInput.value.trim();

    if (query.length === 0) {
      searchResults.style.display = "none";
      return;
    }

    // Verifica se é um número de processo
    if (isProcessNumber(query)) {
      searchResults.innerHTML = `
        <div class="search-result-item" style="justify-content: center; padding: 20px;">
          <i class="bi bi-arrow-repeat spin" style="animation: spin 1s linear infinite;"></i>
          <span style="margin-left: 8px;">Consultando processo...</span>
        </div>
      `;
      searchResults.style.display = "block";
      
      // Tentar buscar dados reais do banco de dados primeiro
      try {
        const response = await fetch(`/api/processo/${query}`);
        if (response.ok) {
          const data = await response.json();
          searchResults.innerHTML = "";
          const processResult = createProcessResult(query, data.orgaoJulgador?.nome || 'Vara não identificada');
          searchResults.appendChild(processResult);
          return;
        }
      } catch (error) {
        console.log("API não disponível, usando arquivo local");
      }
      
      // Fallback: usar arquivo JSON local (vara de origem)
      const courtCode = extractCourtCode(query);
      const courtName = await findCourtByCode(courtCode);

      searchResults.innerHTML = "";

      if (courtName) {
        const processResult = createProcessResult(query, courtName + " (vara de origem)");
        searchResults.appendChild(processResult);
      } else {
        const noResultDiv = document.createElement("div");
        noResultDiv.className = "search-result-item no-result";
        noResultDiv.innerHTML = `
                    <div class="no-result-info">
                        <i class="bi bi-exclamation-triangle"></i>
                        <span>Vara não encontrada para o código: ${courtCode}</span>
                    </div>
                `;
        searchResults.appendChild(noResultDiv);
      }

      searchResults.style.display = "block";
      return;
    }

    // Verifica se é um nome e exibe mensagem motivacional
    if (isName(query)) {
      const motivationalQuote = getMotivationalQuote();
      searchResults.innerHTML = "";
      const motivationalResult = createMotivationalResult(
        query,
        motivationalQuote
      );
      searchResults.appendChild(motivationalResult);
      searchResults.style.display = "block";
      return;
    }

    // Verifica se é uma data de nascimento ou apenas ano
    if (isDateOfBirth(query)) {
      // Se for apenas um ano (YYYY)
      if (isYearOnly(query)) {
        const year = parseInt(query);
        const age = calculateSimpleAge(year);

        if (age !== null) {
          searchResults.innerHTML = "";
          const ageResult = createSimpleAgeResult(age, year);
          searchResults.appendChild(ageResult);
          searchResults.style.display = "block";
          return;
        }
      } else {
        // Data completa (DD/MM/YYYY)
        const dateMatch = query.match(
          /^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})$/
        );
        if (dateMatch) {
          const [, day, month, year] = dateMatch;
          const birthDate = new Date(year, month - 1, day);

          // Verifica se a data é válida
          if (!isNaN(birthDate.getTime())) {
            const stats = calculateLifeStats(birthDate);

            if (stats) {
              searchResults.innerHTML = "";
              const ageResult = createAgeResult(stats, query);
              searchResults.appendChild(ageResult);
              searchResults.style.display = "block";
              return;
            }
          }
        }
      }
    }

    // Busca normal por botões (só se não for data)
    if (query.length < 2) {
      searchResults.style.display = "none";
      return;
    }

    const results = searchIndex
      .filter((item) => item.searchTerms.includes(query.toLowerCase()))
      .slice(0, 5);

    searchResults.innerHTML = "";

    if (results.length > 0) {
      results.forEach((result) => {
        const resultItem = document.createElement("div");
        resultItem.className = "search-result-item";
        resultItem.innerHTML = `
                    <i class="${result.icon}"></i>
                    <span>${result.text}</span>
                `;
        resultItem.addEventListener("click", () => {
          // Adiciona automaticamente aos favoritos se não estiver já
          if (!isFavorite(result.element)) {
            toggleFavorite(result.element);
          }

          // Executa o clique no botão original
          result.element.click();
          searchInput.value = "";
          searchResults.style.display = "none";
        });
        searchResults.appendChild(resultItem);
      });
      searchResults.style.display = "block";
    } else {
      searchResults.style.display = "none";
    }
  });

  // Fecha os resultados ao clicar fora
  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.style.display = "none";
    }
  });

  // Navegação com teclado
  searchInput.addEventListener("keydown", (e) => {
    const results = searchResults.querySelectorAll(".search-result-item");
    const current = searchResults.querySelector(".search-result-item:hover");
    let next;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!current) {
          next = results[0];
        } else {
          const index = Array.from(results).indexOf(current);
          next = results[index + 1] || results[0];
        }
        break;

      case "ArrowUp":
        e.preventDefault();
        if (!current) {
          next = results[results.length - 1];
        } else {
          const index = Array.from(results).indexOf(current);
          next = results[index - 1] || results[results.length - 1];
        }
        break;

      case "Enter":
        if (current) {
          e.preventDefault();
          current.click();
        }
        break;

      case "Escape":
        searchResults.style.display = "none";
        searchInput.blur();
        break;
    }

    if (next) {
      current?.classList.remove("hover");
      next.classList.add("hover");
      next.scrollIntoView({ block: "nearest" });
    }
  });
}

// Função para mostrar toast
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// Função para carregar aniversariantes
async function carregarAniversariantes() {
  try {
    // Dados de fallback para caso o fetch falhe (importante para protocolo file://)
    const dadosFallback = {
      Servidores: [
        { nome: "Marta", data: "28/02" },
        { nome: "Caetano", data: "26/03" },
        { nome: "Silvio", data: "26/03" },
        { nome: "Natália", data: "31/03" },
        { nome: "Wagner", data: "07/04" },
        { nome: "Lloyd", data: "12/04" },
        { nome: "Thaís", data: "11/05" },
        { nome: "Nathany", data: "23/09" },
        { nome: "Tatiana", data: "28/09" },
        { nome: "Marcelo", data: "29/12" },
      ],
    };

    let data;

    // Verifica se estamos usando o protocolo file://
    if (window.location.protocol === "file:") {
      console.log("Usando protocolo file://, carregando dados embutidos");
      data = dadosFallback;
    } else {
      // Tenta carregar do arquivo JSON
      try {
        const response = await fetch("aniversariantes.json");
        if (!response.ok) {
          throw new Error("Falha ao carregar o arquivo de aniversariantes");
        }

        data = await response.json();
        if (!data || !Array.isArray(data.Servidores)) {
          throw new Error("Formato de dados inválido");
        }
      } catch (fetchError) {
        console.warn(
          "Erro ao carregar JSON, usando dados de fallback:",
          fetchError
        );
        data = dadosFallback;
      }
    }

    const hoje = new Date();
    const mesAtual = hoje.getMonth() + 1;
    const diaAtual = hoje.getDate();

    console.log(
      "Data atual:",
      diaAtual,
      "/",
      mesAtual,
      "/",
      hoje.getFullYear()
    );

    // Filtra aniversariantes do mês atual
    console.log("Aniversariantes no arquivo:", data.Servidores);

    const aniversariantesMes = data.Servidores.filter((aniversariante) => {
      try {
        const [dia, mes] = (aniversariante.data || "").split("/");
        const isThisMonth = parseInt(mes) === mesAtual;
        if (isThisMonth) {
          console.log(
            `Aniversariante do mês atual: ${aniversariante.nome} - ${aniversariante.data}`
          );
          const isToday = parseInt(dia) === diaAtual;
          if (isToday) {
            console.log(
              `*** ANIVERSARIANTE DE HOJE: ${aniversariante.nome} - ${aniversariante.data} ***`
            );
          }
        }
        return isThisMonth;
      } catch (e) {
        console.error("Erro ao processar data:", aniversariante);
        return false;
      }
    });

    // Ordena por dia
    aniversariantesMes.sort((a, b) => {
      const diaA = parseInt(a.data.split("/")[0]);
      const diaB = parseInt(b.data.split("/")[0]);
      return diaA - diaB;
    });

    const lista = document.getElementById("aniversariantes-lista");
    if (!lista) {
      throw new Error("Elemento da lista não encontrado");
    }

    if (aniversariantesMes.length === 0) {
      lista.innerHTML = `
                <div class="sem-aniversariantes">
                    <i class="bi bi-emoji-smile"></i>
                    <p>Não há aniversariantes neste mês</p>
                </div>
            `;
      return;
    }

    lista.innerHTML = "";

    aniversariantesMes.forEach((aniversariante, index) => {
      if (!aniversariante.data || !aniversariante.nome) {
        console.error("Dados de aniversariante inválidos:", aniversariante);
        return;
      }

      const [dia] = aniversariante.data.split("/");
      const isToday = parseInt(dia) === diaAtual;

      const aniversarianteElement = document.createElement("div");
      aniversarianteElement.className = `aniversariante-item${
        isToday ? " hoje" : ""
      }`;
      aniversarianteElement.style.animationDelay = `${index * 0.1}s`;

      // Adiciona elementos de decoração para aniversariantes do dia, mas sem o brilho automático
      if (isToday) {
        // Adicionamos apenas os sparkles, mas sem a classe aniversariante-brilho
        // para evitar a animação automática
        for (let i = 0; i < 5; i++) {
          const sparkle = document.createElement("div");
          sparkle.className = "sparkle";
          sparkle.style.left = `${Math.random() * 100}%`;
          sparkle.style.top = `${Math.random() * 100}%`;
          sparkle.style.animationDelay = `${Math.random() * 2}s`;
          aniversarianteElement.appendChild(sparkle);
        }
      }

      const mensagemParabens = isToday
        ? `
                <div class="mensagem-parabens">
                    <div class="parabens-header">
                        <i class="bi bi-stars"></i>
                        <span>🎉 Feliz Aniversário! 🎉</span>
                        <i class="bi bi-stars"></i>
                    </div>
                    <p class="parabens-texto">
                        Hoje é um dia muito especial! Que seja repleto de alegria, 
                        sorrisos e momentos inesquecíveis. Desejamos a você um ano 
                        cheio de conquistas e realizações! 🌟
                    </p>
                    <div class="parabens-icons">
                        <i class="bi bi-balloon-heart-fill"></i>
                        <i class="bi bi-cake2-fill"></i>
                        <i class="bi bi-gift-fill"></i>
                        <i class="bi bi-stars"></i>
                        <i class="bi bi-emoji-laughing-fill"></i>
                    </div>
                </div>
            `
        : "";

      aniversarianteElement.innerHTML = `
                <div class="aniversariante-content">
                    <div class="aniversariante-icon">
                        <i class="bi bi-gift${
                          isToday ? "-fill animated pulse" : ""
                        }"></i>
                    </div>
                    <div class="aniversariante-info">
                        <div class="aniversariante-data">
                            <i class="bi bi-calendar-event"></i>
                            ${aniversariante.data}
                        </div>
                        <div class="aniversariante-nome aniversariante-nome-clicavel">
                            ${aniversariante.nome}
                            ${
                              isToday
                                ? '<span class="badge-hoje">🎂 Hoje!</span>'
                                : ""
                            }
                        </div>
                    </div>
                    ${
                      isToday
                        ? `
                        <div class="icone-festivo">🎈</div>
                        <div class="icone-festivo">🎁</div>
                        <div class="icone-festivo">🎊</div>
                        <div class="icone-festivo">✨</div>
                    `
                        : ""
                    }
                </div>
                ${mensagemParabens}
            `;

      // Adiciona evento de clique no nome
      const nomeElement = aniversarianteElement.querySelector(
        ".aniversariante-nome"
      );
      nomeElement.addEventListener("click", () => {
        // Remove a classe de todos os outros itens
        document.querySelectorAll(".aniversariante-clicado").forEach((item) => {
          if (item !== aniversarianteElement) {
            item.classList.remove("aniversariante-clicado");
          }
        });

        // Adiciona a classe ao item clicado
        aniversarianteElement.classList.add("aniversariante-clicado");

        // Garante que a mensagem de parabéns esteja visível
        const mensagemParabens =
          aniversarianteElement.querySelector(".mensagem-parabens");
        if (mensagemParabens) {
          mensagemParabens.style.display = "block";
        }

        // Mostra a mensagem de aniversário
        showBirthdayMessage(aniversariante.nome, isToday);

        // Não remove automaticamente a classe - será removida ao clicar em outro lugar
      });

      if (isToday) {
        // Adiciona confetti ao passar o mouse
        aniversarianteElement.addEventListener("mouseenter", () => {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.8 },
            colors: ["#ff6b6b", "#ffd93d", "#6c5ce7", "#a8e6cf", "#ff8787"],
          });
        });

        // Dispara confetti imediatamente quando o card é criado
        setTimeout(() => {
          confetti({
            particleCount: 30,
            spread: 50,
            origin: { y: 0.8 },
            colors: ["#ff6b6b", "#ffd93d", "#6c5ce7", "#a8e6cf", "#ff8787"],
          });
        }, index * 100 + 500);
      }

      lista.appendChild(aniversarianteElement);

      // Se for aniversariante de hoje, destaca automaticamente
      if (isToday) {
        console.log(
          `Destacando aniversariante de hoje: ${aniversariante.nome}`
        );
        // Adiciona a classe para destacar o aniversariante de hoje
        aniversarianteElement.classList.add("aniversariante-hoje");
      }
      // Garante visibilidade do card
      aniversarianteElement.style.opacity = "1";
      aniversarianteElement.style.transform = "translateY(0)";
    });

    // Verifica se há aniversariantes hoje e exibe uma mensagem se houver
    const aniversariantesHoje = aniversariantesMes.filter((aniv) => {
      const [dia] = aniv.data.split("/");
      return parseInt(dia) === diaAtual;
    });

    if (aniversariantesHoje.length > 0) {
      console.log(
        `Hoje é aniversário de: ${aniversariantesHoje
          .map((a) => a.nome)
          .join(", ")}`
      );
    }
  } catch (error) {
    console.error("Erro ao carregar aniversariantes:", error);
    document.getElementById("aniversariantes-lista").innerHTML = `
            <div class="sem-aniversariantes">
                <i class="bi bi-emoji-frown"></i>
                <p>Erro ao carregar aniversariantes</p>
            </div>
        `;
  }
}

// Função para mostrar o modal de aniversário
function showBirthdayModal(nome) {
  const modal = document.getElementById("birthday-modal");
  const message = document.getElementById("birthday-message");

  message.innerHTML = `
        <p>Hoje é o aniversário de</p>
        <h3>${nome}</h3>
        <p>🎉 Parabéns! 🎉</p>
    `;

  modal.style.display = "block";

  // Adiciona confete
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}

function closeBirthdayModal() {
  const modal = document.getElementById("birthday-modal");
  modal.style.display = "none";
}

function exibirAniversariantes(aniversariantes) {
  const lista = document.getElementById("aniversariantes-lista");
  lista.innerHTML = "";

  if (aniversariantes.length === 0) {
    lista.innerHTML =
      '<div class="sem-aniversariantes">Nenhum aniversariante este mês</div>';
    return;
  }

  aniversariantes.forEach((aniversariante) => {
    const item = document.createElement("div");
    item.className = "aniversariante-item";

    const icon = document.createElement("div");
    icon.className = "aniversariante-icon";
    icon.innerHTML = '<i class="bi bi-gift"></i>';

    const info = document.createElement("div");
    info.className = "aniversariante-info";

    const nome = document.createElement("div");
    nome.className = "aniversariante-nome";
    nome.textContent = aniversariante.Servidores;

    const data = document.createElement("div");
    data.className = "aniversariante-data";
    data.textContent = aniversariante.data;

    info.appendChild(nome);
    info.appendChild(data);

    item.appendChild(icon);
    item.appendChild(info);

    lista.appendChild(item);
  });
}

// Função para atualizar o relógio e data no footer (estilo Windows)
function updateWindowsClock() {
  const now = new Date();

  // Formatar hora (formato 24h) - HH:MM
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const timeString = `${hours}:${minutes}`;

  // Atualizar o relógio
  const footerClock = document.getElementById("footer-clock");
  if (footerClock) {
    footerClock.textContent = timeString;
  }

  // Formatar data - DD/MM/YYYY (estilo Windows)
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  const dateString = `${day}/${month}/${year}`;

  // Atualizar a data
  const footerDate = document.getElementById("footer-date");
  if (footerDate) {
    footerDate.textContent = dateString;
  }
}

function createFavoriteItem(text, url) {
  const item = document.createElement("div");
  item.className = "favorite-item";
  item.setAttribute("data-url", url);

  const icon = document.createElement("i");
  icon.className = "bi bi-link-45deg";

  const span = document.createElement("span");
  span.textContent = text;

  const removeButton = document.createElement("div");
  removeButton.className = "remove-favorite";
  removeButton.innerHTML = '<i class="bi bi-trash3-fill"></i>';
  removeButton.onclick = function (e) {
    e.stopPropagation();
    removeFavorite(text);
  };

  item.appendChild(icon);
  item.appendChild(span);
  item.appendChild(removeButton);

  return item;
}

function canBeRemoved(text) {
  const removableItems = [
    "SecJud",
    "Feriados-2025",
    "Controle/Trabalho",
    "Controle/trabalho",
    "Controle trabalho",
    "Controle/Trabalho",
  ];
  return removableItems.some((item) => text.trim().includes(item));
}

function checkEmptyFavorites() {
  const favoritesList = document.getElementById("favorites-list");
  const noFavoritesMessage = document.getElementById("no-favorites");

  if (
    favoritesList.children.length === 1 &&
    favoritesList.children[0].id === "no-favorites"
  ) {
    noFavoritesMessage.style.display = "flex";
  } else {
    noFavoritesMessage.style.display = "none";
  }
}

function showBirthdayMessage(nome, isToday) {
  // Não cria mais mensagem externa nem reproduz som
  // Apenas mostra o confete e destaca o card do aniversariante

  if (isToday) {
    // Apenas mostra o confete
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ffc107", "#ff6b6b", "#4dabf7", "#51cf66", "#be4bdb"],
    });

    console.log("Mostrando mensagem de aniversário no card para:", nome);
  } else {
    // Para aniversariantes futuros, não faz nada especial
    console.log("Aniversariante futuro:", nome);
  }

  // Não cria nem adiciona mensagem externa ao corpo do documento
}

// Função para gerar um ID único para o usuário
function generateUserId() {
  return "user_" + Math.random().toString(36).substr(2, 9);
}

// Função para registrar usuário web
function registerWebUser() {
  const userId = localStorage.getItem("userId") || generateUserId();
  let username = localStorage.getItem("username");

  // Se não houver um nome de usuário salvo, usa o nome do usuário da máquina
  if (!username) {
    // Tenta obter o nome do usuário da máquina
    fetch("/api/username")
      .then((response) => response.text())
      .then((machineUsername) => {
        username = machineUsername || `Usuário ${userId.slice(5, 9)}`;
        localStorage.setItem("username", username);

        // Registra o usuário na lista de usuários ativos
        const activeUsers = JSON.parse(
          localStorage.getItem("activeUsers") || "{}"
        );
        activeUsers[userId] = {
          username: username,
          lastActive: Date.now(),
        };
        localStorage.setItem("activeUsers", JSON.stringify(activeUsers));
      })
      .catch((error) => {
        console.error("Erro ao obter nome do usuário:", error);
        username = `Usuário ${userId.slice(5, 9)}`;
        localStorage.setItem("username", username);

        // Registra o usuário na lista de usuários ativos mesmo com erro
        const activeUsers = JSON.parse(
          localStorage.getItem("activeUsers") || "{}"
        );
        activeUsers[userId] = {
          username: username,
          lastActive: Date.now(),
        };
        localStorage.setItem("activeUsers", JSON.stringify(activeUsers));
      });
  } else {
    // Se já tem username, apenas atualiza os usuários ativos
    const activeUsers = JSON.parse(localStorage.getItem("activeUsers") || "{}");
    activeUsers[userId] = {
      username: username,
      lastActive: Date.now(),
    };
    localStorage.setItem("activeUsers", JSON.stringify(activeUsers));
  }

  localStorage.setItem("userId", userId);
  localStorage.setItem("lastActive", Date.now());

  return { userId, username };
}

// Função para atualizar usuários ativos
function updateActiveUsers() {
  const now = Date.now();
  const activeUsers = JSON.parse(localStorage.getItem("activeUsers") || "{}");
  const currentUser = localStorage.getItem("userId");

  // Remove usuários inativos (5 minutos sem atividade)
  Object.keys(activeUsers).forEach((userId) => {
    if (now - activeUsers[userId].lastActive > 5 * 60 * 1000) {
      delete activeUsers[userId];
    }
  });

  // Atualiza timestamp do usuário atual
  if (activeUsers[currentUser]) {
    activeUsers[currentUser].lastActive = now;
  }

  localStorage.setItem("activeUsers", JSON.stringify(activeUsers));
  displayWebUsers(activeUsers);
}

// Função para exibir usuários web
function displayWebUsers(activeUsers) {
  const webUsersList = document.getElementById("web-users-list");
  if (!webUsersList) return;

  const users = Object.entries(activeUsers);

  if (users.length === 0) {
    webUsersList.innerHTML = `
            <div class="web-users-loading">
                <i class="bi bi-people"></i>
                <span>Nenhum usuário online</span>
            </div>
        `;
    return;
  }

  webUsersList.innerHTML = "";
  users.forEach(([userId, user]) => {
    const userElement = document.createElement("div");
    userElement.className = "web-user";
    userElement.innerHTML = `
            <i class="bi bi-person-circle"></i>
            <span>${user.username}</span>
            <span class="user-status"></span>
        `;
    webUsersList.appendChild(userElement);
  });

  // Atualiza o contador de usuários
  const userCount = users.length;
  const title = document.querySelector(".github-users-title span");
  if (title) {
    title.textContent = `Usuários Online (${userCount})`;
  }
}

// Registra eventos de atividade do usuário
function registerUserActivity() {
  const events = ["mousemove", "keydown", "click", "scroll"];
  events.forEach((event) => {
    document.addEventListener(event, () => {
      const activeUsers = JSON.parse(
        localStorage.getItem("activeUsers") || "{}"
      );
      const userId = localStorage.getItem("userId");
      if (activeUsers[userId]) {
        activeUsers[userId].lastActive = Date.now();
        localStorage.setItem("activeUsers", JSON.stringify(activeUsers));
      }
    });
  });
}
