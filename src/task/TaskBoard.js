import React, { useState } from 'react';
import { ParametersPanel } from 'task_components/ParametersPanel';
import { FiltersPanel } from 'task_components/FiltersPanel';
import TaskForm from './TaskForm';

function TaskBoard() {
    const [isParametersOpen, setParametersOpen] = useState(false);
    const [isFiltersOpen, setFiltersOpen] = useState(false);
    const [isTaskFormOpen, setTaskFormOpen] = useState(false);

    return (
        <div className={`task-board ${isTaskFormOpen ? 'dimmed' : ''}`}>
            {/* Кнопка Параметры */}
            <button onClick={() => setParametersOpen(true)} className="parameters-button">
                <span className="icon">&#9776;</span>
            </button>

            {/* Кнопка Фильтры */}
            <button onClick={() => setFiltersOpen(true)} className="filters-button">
                <span className="icon">&#9881;</span>
            </button>

            {/* Кнопка Создать задачу */}
            <button onClick={() => setTaskFormOpen(true)} className="add-task-button">
                <span>+</span>
            </button>

            {/* Столбцы задач */}
            <div className="task-columns">
                <div>Нужно сделать</div>
                <div>В работе</div>
                <div>Сделано</div>
                <div>Доработать</div>
                <div>Другое</div>
            </div>

            {/* Панель параметров */}
            <ParametersPanel isOpen={isParametersOpen} onClose={() => setParametersOpen(false)} />
            
            {/* Панель фильтров */}
            <FiltersPanel isOpen={isFiltersOpen} onClose={() => setFiltersOpen(false)} />
            
            {/* Форма для создания задачи */}
            {isTaskFormOpen && <TaskForm onClose={() => setTaskFormOpen(false)} />}
        </div>
    );
}

export default TaskBoard;
