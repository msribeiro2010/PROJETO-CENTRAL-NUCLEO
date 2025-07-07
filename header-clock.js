/**
 * Header Clock and Date Functionality
 * Provides real-time clock and date display for the application header and footer
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements for header
    const clockElement = document.getElementById('clock');
    const weekdayElement = document.getElementById('weekday');
    const currentDateElement = document.getElementById('current-date');
    const calendarWrapper = document.querySelector('.calendar-wrapper');
    
    // Get DOM elements for footer
    const footerClockElement = document.getElementById('footer-clock');
    const footerDateElement = document.getElementById('footer-date');
    
    // Manter o calendário oculto
    if (calendarWrapper) {
        calendarWrapper.style.display = 'none';
    }
    
    // Update clock function
    function updateClock() {
        const now = new Date();
        
        // Format time as HH:MM:SS for header
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const timeString = `${hours}:${minutes}:${seconds}`;
        
        // Update header clock element
        if (clockElement) {
            clockElement.textContent = timeString;
        }
        
        // Update footer clock element (without seconds)
        if (footerClockElement) {
            footerClockElement.textContent = `${hours}:${minutes}`;
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
        
        // Update header date element
        if (currentDateElement) {
            currentDateElement.textContent = dateString;
        }
        
        // Update footer date element with weekday
        if (footerDateElement) {
            footerDateElement.textContent = `${weekday}, ${day}/${month}/${year}`;
        }
    }
    
    // Initial update
    updateClock();
    
    // Update clock every second
    setInterval(updateClock, 1000);
});
