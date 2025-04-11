document.addEventListener('DOMContentLoaded', function() {
    // Criar o popup do calendário
    const calendarPopup = document.createElement('div');
    calendarPopup.className = 'calendar-popup';
    document.body.appendChild(calendarPopup);

    // Adicionar classe e cursor pointer ao container da data no footer
    const dateContainer = document.querySelector('.footer-container .date');
    if (!dateContainer) {
        console.error('Container da data não encontrado no footer');
        return;
    }
    dateContainer.classList.add('footer-calendar');
    
    // Data atual
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    let isYearView = false;
    
    // Nomes dos meses e dias da semana
    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    
    const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    // Função para gerar a visualização do ano
    function generateYearView(year) {
        let html = `
            <div class="calendar-header">
                <div class="calendar-title">${year}</div>
                <div class="calendar-nav">
                    <button class="prev-year"><i class="bi bi-chevron-left"></i></button>
                    <button class="next-year"><i class="bi bi-chevron-right"></i></button>
                    <button class="toggle-view"><i class="bi bi-calendar3"></i></button>
                </div>
            </div>
            <div class="calendar-year-grid">
        `;

        months.forEach((month, index) => {
            const today = new Date();
            const isCurrentMonth = today.getMonth() === index && today.getFullYear() === year;
            
            html += `
                <div class="month-card${isCurrentMonth ? ' current-month' : ''}" data-month="${index}">
                    <div class="month-name">${month}</div>
                </div>
            `;
        });

        html += '</div>';
        calendarPopup.innerHTML = html;
        
        // Eventos de navegação do ano
        calendarPopup.querySelector('.prev-year').addEventListener('click', function(e) {
            e.stopPropagation();
            currentYear--;
            generateYearView(currentYear);
        });
        
        calendarPopup.querySelector('.next-year').addEventListener('click', function(e) {
            e.stopPropagation();
            currentYear++;
            generateYearView(currentYear);
        });

        // Alternar para visualização mensal
        calendarPopup.querySelector('.toggle-view').addEventListener('click', function(e) {
            e.stopPropagation();
            isYearView = false;
            generateCalendar(currentMonth, currentYear);
        });

        // Evento de clique nos meses
        calendarPopup.querySelectorAll('.month-card').forEach(monthCard => {
            monthCard.addEventListener('click', function(e) {
                e.stopPropagation();
                currentMonth = parseInt(this.dataset.month);
                isYearView = false;
                generateCalendar(currentMonth, currentYear);
            });
        });
    }
    
    // Função para gerar o calendário mensal
    function generateCalendar(month, year) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startingDay = firstDay.getDay();
        const monthLength = lastDay.getDate();
        
        let html = `
            <div class="calendar-header">
                <div class="calendar-title">${months[month]} ${year}</div>
                <div class="calendar-nav">
                    <button class="prev-month"><i class="bi bi-chevron-left"></i></button>
                    <button class="next-month"><i class="bi bi-chevron-right"></i></button>
                    <button class="toggle-view"><i class="bi bi-grid-3x3"></i></button>
                </div>
            </div>
            <div class="calendar-grid">
        `;
        
        // Adicionar dias da semana
        weekdays.forEach(day => {
            html += `<div class="calendar-weekday">${day}</div>`;
        });
        
        // Adicionar dias do mês anterior
        const prevMonth = new Date(year, month, 0);
        const prevMonthLength = prevMonth.getDate();
        for (let i = startingDay - 1; i >= 0; i--) {
            html += `<div class="calendar-day other-month">${prevMonthLength - i}</div>`;
        }
        
        // Adicionar dias do mês atual
        const today = new Date();
        for (let day = 1; day <= monthLength; day++) {
            const isToday = day === today.getDate() && 
                           month === today.getMonth() && 
                           year === today.getFullYear();
            
            html += `
                <div class="calendar-day${isToday ? ' today' : ''}" 
                     data-date="${year}-${month + 1}-${day}">
                    ${day}
                </div>
            `;
        }
        
        // Adicionar dias do próximo mês
        const remainingDays = 42 - (startingDay + monthLength);
        for (let i = 1; i <= remainingDays; i++) {
            html += `<div class="calendar-day other-month">${i}</div>`;
        }
        
        html += '</div>';
        calendarPopup.innerHTML = html;
        
        // Eventos de navegação
        calendarPopup.querySelector('.prev-month').addEventListener('click', function(e) {
            e.stopPropagation();
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            generateCalendar(currentMonth, currentYear);
        });
        
        calendarPopup.querySelector('.next-month').addEventListener('click', function(e) {
            e.stopPropagation();
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            generateCalendar(currentMonth, currentYear);
        });

        // Alternar para visualização anual
        calendarPopup.querySelector('.toggle-view').addEventListener('click', function(e) {
            e.stopPropagation();
            isYearView = true;
            generateYearView(currentYear);
        });
        
        // Eventos dos dias
        calendarPopup.querySelectorAll('.calendar-day:not(.other-month)').forEach(day => {
            day.addEventListener('click', function(e) {
                e.stopPropagation();
                const date = this.dataset.date;
                console.log('Data selecionada:', date);
            });
        });
    }
    
    // Toggle do calendário ao clicar no container da data
    dateContainer.addEventListener('click', function(e) {
        e.stopPropagation();
        const isVisible = calendarPopup.classList.contains('show');
        
        if (!isVisible) {
            if (isYearView) {
                generateYearView(currentYear);
            } else {
                currentMonth = new Date().getMonth();
                currentYear = new Date().getFullYear();
                generateCalendar(currentMonth, currentYear);
            }
        }
        
        calendarPopup.classList.toggle('show');
    });
    
    // Fechar calendário ao clicar fora
    document.addEventListener('click', function(e) {
        if (!calendarPopup.contains(e.target) && !dateContainer.contains(e.target)) {
            calendarPopup.classList.remove('show');
        }
    });
}); 