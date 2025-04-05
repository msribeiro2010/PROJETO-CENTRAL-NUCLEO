/**
 * Header Clock and Date Functionality
 * Provides real-time clock and date display for the application header
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const clockElement = document.getElementById('clock');
    const weekdayElement = document.getElementById('weekday');
    const currentDateElement = document.getElementById('current-date');
    const calendarWrapper = document.querySelector('.calendar-wrapper');
    
    // Manter o calendário oculto
    if (calendarWrapper) {
        calendarWrapper.style.display = 'none';
    }
    
    // Update clock function
    function updateClock() {
        const now = new Date();
        
        // Format time as HH:MM:SS
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const timeString = `${hours}:${minutes}:${seconds}`;
        
        // Update clock element
        if (clockElement) {
            clockElement.textContent = timeString;
        }
        
        // Get weekday in Portuguese
        const weekdays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
        const weekday = weekdays[now.getDay()];
        
        // Update weekday element
        if (weekdayElement) {
            weekdayElement.textContent = weekday;
        }
        
        // Format date as DD/MM/YYYY
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const dateString = `${day}/${month}/${year}`;
        
        // Update date element
        if (currentDateElement) {
            currentDateElement.textContent = dateString;
        }
    }
    
    // Initial update
    updateClock();
    
    // Update clock every second
    setInterval(updateClock, 1000);
});
