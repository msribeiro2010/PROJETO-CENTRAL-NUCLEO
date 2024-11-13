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

    // Função para toggle Accordion com max-height dinâmico
    function toggleAccordion(event) {
        const header = event.currentTarget;
        const content = header.nextElementSibling;

        const isExpanded = header.getAttribute("aria-expanded") === "true";

        // Alterna o atributo aria-expanded
        header.setAttribute("aria-expanded", !isExpanded);

        if (!isExpanded) {
            // Define o max-height para permitir a transição
            content.style.maxHeight = content.scrollHeight + "px";
        } else {
            // Remove o max-height para recolher o accordion
            content.style.maxHeight = null;
        }
    }

    // Seleciona todos os headers de accordion
    const accordionHeaders = document.querySelectorAll(".accordion-header");
    accordionHeaders.forEach(header => {
        header.addEventListener("click", toggleAccordion);
    });

    // Seleciona todos os subheaders de accordion (aninhados)
    const accordionSubheaders = document.querySelectorAll(".accordion-subheader");
    accordionSubheaders.forEach(subheader => {
        subheader.addEventListener("click", toggleAccordion);
    });

    // **Nova Funcionalidade: Links da Navbar Abrindo Accordions**
    const navbarLinks = document.querySelectorAll(".navbar-links a[data-target]");

    navbarLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Evita o comportamento padrão do link

            const targetId = this.getAttribute("data-target");
            const targetGroup = document.getElementById(targetId);

            if (targetGroup) {
                const header = targetGroup.querySelector(".accordion-header");
                const content = header.nextElementSibling;

                const isExpanded = header.getAttribute("aria-expanded") === "true";

                if (!isExpanded) {
                    // Fecha todos os accordions
                    accordionHeaders.forEach(accHeader => {
                        accHeader.setAttribute("aria-expanded", "false");
                        const accContent = accHeader.nextElementSibling;
                        accContent.style.maxHeight = null;
                    });

                    // Abre o accordion alvo
                    header.setAttribute("aria-expanded", "true");
                    content.style.maxHeight = content.scrollHeight + "px";
                }

                // Rola suavemente até o grupo
                targetGroup.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    // **Nova Funcionalidade: Exibir Aniversariantes do Mês**
    const birthdayListElement = document.getElementById("birthday-list");

    // Lista de aniversariantes
    const birthdays = [
        { name: "Marcelo Silva Ribeiro - ", date: "29/11" },
        { name: "Marta Maria de Souza Pinto Silva - ", date: "28/02" },
        { name: "Severino Caetano da Silva Filho - ", date: "26/03" },
        { name: "Natalia Pereira Morais - ", date: "31/03" },
        { name: "Wagner Waldir Leite - ", date: "07/04" },
        { name: "Lloyd Hildevert Beteille Sobrinho - ", date: "12/04" },
        { name: "Thais Helena Santos Camargo Simoes - ", date: "11/05" },
        { name: "Nathany Gazolli de Souza - ", date: "23/09" },
        { name: "Tatiana da Rocha Natale - ", date: "28/09" }
    ];

    // Função para obter aniversariantes do mês atual
    function getBirthdaysOfCurrentMonth() {
        const now = new Date();
        const currentMonth = now.getMonth() + 1; // getMonth() retorna de 0 a 11

        return birthdays.filter(person => {
            const [day, month] = person.date.split("/").map(num => parseInt(num));
            return month === currentMonth;
        });
    }

    // Função para exibir aniversariantes na página
    function displayBirthdays() {
        const currentBirthdays = getBirthdaysOfCurrentMonth();

        if (currentBirthdays.length === 0) {
            birthdayListElement.innerHTML = "<li>Nenhum aniversariante este mês.</li>";
            return;
        }

        birthdayListElement.innerHTML = ""; // Limpa a lista existente

        currentBirthdays.forEach(person => {
            const listItem = document.createElement("li");
            const nameSpan = document.createElement("span");
            nameSpan.textContent = person.name;
            const dateSpan = document.createElement("span");
            dateSpan.classList.add("birthday-date");
            dateSpan.textContent = person.date;

            listItem.appendChild(nameSpan);
            listItem.appendChild(dateSpan);
            birthdayListElement.appendChild(listItem);
        });
    }

    // Chama a função para exibir os aniversariantes ao carregar a página
    displayBirthdays();
});
