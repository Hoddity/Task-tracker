import React from 'react';

export function FiltersPanel({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="filters-panel">
            <p className='nav-name'>Фильтры</p>
            <button onClick={onClose} className="close-button">✖</button>
            <select>
                <option>Команда</option>
            </select>
            <select>
                <option>Сервисы</option>
            </select>
            <select>
                <option>Дедлайн</option>
            </select>
            <select>
                <option>Приоритет</option>
            </select>
        </div>
    );
}
