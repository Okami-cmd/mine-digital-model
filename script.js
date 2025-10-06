// Функция открытия модального окна системы экскаватора
function openExcavatorSystem(excavatorId) {
    // Скрываем все модальные окна
    const modals = document.querySelectorAll('.excavator-modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
    
    // Показываем нужное модальное окно
    const modal = document.getElementById(`excavator-modal-${excavatorId}`);
    if (modal) {
        modal.style.display = 'block';
    }
    
    // Показываем оверлей
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
        overlay.style.display = 'block';
    }
    
    // Запускаем анимацию для выбранного экскаватора
    startExcavatorAnimation(excavatorId);
    
    // Обновляем время
    updateCurrentTime(excavatorId);
}

// Функция закрытия модального окна
function closeModal() {
    // Скрываем все модальные окна
    const modals = document.querySelectorAll('.excavator-modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
    
    // Скрываем оверлей
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
    
    // Останавливаем все анимации
    stopAllAnimations();
}

// Функция обработки действий управления
function controlAction(action, excavatorId) {
    console.log(`Экскаватор ${excavatorId}: выполнено действие ${action}`);
    
    // Обработка различных действий
    switch(action) {
        case 'emergency_stop':
            alert(`ЭКСТРЕННАЯ ОСТАНОВКА! Экскаватор ${excavatorId} остановлен.`);
            stopExcavatorAnimation(excavatorId);
            break;
        case 'left_zoom':
            toggleButtonState(`btn-left-zoom-${excavatorId}`);
            break;
        case 'left_contrast':
            toggleButtonState(`btn-left-contrast-${excavatorId}`);
            break;
        case 'left_coal_contrast':
            toggleButtonState(`btn-left-coal-${excavatorId}`);
            break;
        case 'left_plan_contrast':
            toggleButtonState(`btn-left-plan-${excavatorId}`);
            break;
        case 'left_mountain_contrast':
            toggleButtonState(`btn-left-mountain-${excavatorId}`);
            break;
        case 'right_minus':
            toggleButtonState(`btn-right-minus-${excavatorId}`);
            break;
        case 'right_minus2':
            toggleButtonState(`btn-right-minus2-${excavatorId}`);
            break;
        case 'right_sr':
            toggleButtonState(`btn-right-sr-${excavatorId}`);
            break;
        default:
            // Для других действий просто меняем состояние кнопки
            const button = document.querySelector(`[onclick="controlAction('${action}', ${excavatorId})"]`);
            if (button) {
                button.classList.toggle('active');
            }
    }
}

// Функция переключения состояния кнопки
function toggleButtonState(buttonId) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.classList.toggle('active');
    }
}

// Функция запуска анимации экскаватора
function startExcavatorAnimation(excavatorId) {
    const excavator = document.getElementById(`excavator-${excavatorId}`);
    const rotor = document.getElementById(`rotor-${excavatorId}`);
    
    if (excavator && rotor) {
        // Запускаем анимацию движения экскаватора по рельсам
        let position = 20;
        const animation = setInterval(() => {
            position += 0.5;
            if (position > 80) position = 20;
            excavator.style.left = `${position}%`;
            
            // Обновляем значения датчиков
            updateSensorValues(excavatorId, position);
        }, 100);
        
        // Сохраняем ID анимации для возможности остановки
        excavator.dataset.animationId = animation;
    }
}

// Функция остановки анимации экскаватора
function stopExcavatorAnimation(excavatorId) {
    const excavator = document.getElementById(`excavator-${excavatorId}`);
    if (excavator && excavator.dataset.animationId) {
        clearInterval(parseInt(excavator.dataset.animationId));
    }
}

// Функция остановки всех анимаций
function stopAllAnimations() {
    for (let i = 1; i <= 4; i++) {
        stopExcavatorAnimation(i);
    }
}

// Функция обновления значений датчиков
function updateSensorValues(excavatorId, position) {
    // Обновляем значение станции SR
    const stationValue = (position * 2.5).toFixed(2);
    const stationElement = document.getElementById(`station-value-${excavatorId}`);
    if (stationElement) {
        stationElement.textContent = stationValue;
    }
    
    // Обновляем значение пройденного пути
    const trackProgressElement = document.getElementById(`track-progress-${excavatorId}`);
    if (trackProgressElement) {
        trackProgressElement.textContent = stationValue;
    }
    
    // Обновляем расстояние SR-UK (случайное значение для демонстрации)
    const distanceValue = (1 + Math.random() * 1.5).toFixed(2);
    const distanceElement = document.getElementById(`distance-value-${excavatorId}`);
    if (distanceElement) {
        distanceElement.textContent = distanceValue;
    }
}

// Функция обновления текущего времени
function updateCurrentTime(excavatorId) {
    const now = new Date();
    const timeString = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    
    const timeElement = document.getElementById(`current-time-${excavatorId}`);
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем обработчик для закрытия модального окна по клику вне его
    document.addEventListener('click', function(event) {
        const overlay = document.getElementById('modal-overlay');
        if (event.target === overlay) {
            closeModal();
        }
    });
    
    // Добавляем обработчик для клавиши Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
    
    // Инициализация начальных значений
    for (let i = 1; i <= 4; i++) {
        updateCurrentTime(i);
    }
    
    console.log('Система мониторинга угольного карьера инициализирована');
});