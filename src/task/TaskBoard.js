import React, { useState } from 'react';
import axios from 'axios';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import TaskChat from './TaskChat';
import { ParametersPanel } from 'task_components/ParametersPanel';
import { FiltersPanel } from 'task_components/FiltersPanel';

function TaskBoard() {
    const [tasks, setTasks] = useState({
        todo: [],
        inProgress: [],
        done: [],
        revise: [],
        other: []
    });
    const [selectedTask, setSelectedTask] = useState(null); // Для отображения панели описания
    const [isTaskFormOpen, setTaskFormOpen] = useState(false); // Для открытия формы редактирования
    const [isParametersOpen, setParametersOpen] = useState(false); // Для открытия панели параметров
    const [isFiltersOpen, setFiltersOpen] = useState(false); // Для открытия панели фильтров

    // Сохранение новой или отредактированной задачи
    const handleSaveTask = (task) => {
            setTasks((prevTasks) => {
                const updatedTasks = { ...prevTasks };

            // Если задача редактируется
                if (task.id) {
                    for (const key in updatedTasks) {
                        updatedTasks[key] = updatedTasks[key].filter((t) => t.id !== task.id);
                    }
            } else {
                task.id = Date.now().toString();
                }

            updatedTasks[getStatusKey(task.status)].push(task);
                return updatedTasks;
            });

            setTaskFormOpen(false);
            setSelectedTask(null);
    };

    const getStatusKey = (status) => {
        switch (status) {
            case 'Нужно сделать':
                return 'todo';
            case 'В работе':
                return 'inProgress';
            case 'Сделано':
                return 'done';
            case 'Доработать':
                return 'revise';
            default:
                return 'other';
        }
    };

    const handleDeleteTask = (taskId) => {
        setTasks((prevTasks) => {
            const updatedTasks = { ...prevTasks };
            for (const key in updatedTasks) {
                updatedTasks[key] = updatedTasks[key].filter((task) => task.id !== taskId);
            }
            return updatedTasks;
        });

        setTaskFormOpen(false); // Закрываем форму редактирования
        setSelectedTask(null);  // Сбрасываем выбранную задачу
    };

    const handleDragStart = (event, taskId) => {
        event.dataTransfer.setData('taskId', taskId);
    };

    const handleDrop = (event, newStatus) => {
        event.preventDefault();
        const taskId = event.dataTransfer.getData('taskId');
        updateTaskStatus(taskId, newStatus);
    };

    const updateTaskStatus = (taskId, newStatus) => {
        setTasks((prevTasks) => {
            const updatedTasks = { ...prevTasks };
            let movedTask = null;

            for (const key in updatedTasks) {
                updatedTasks[key] = updatedTasks[key].filter((task) => {
                    if (task.id === taskId) {
                        movedTask = { ...task, status: newStatus };
                        return false;
                    }
                    return true;
                });
            }

            if (movedTask) {
                updatedTasks[getStatusKey(newStatus)].push(movedTask);
            }

            return updatedTasks;
        });
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const [formMode, setFormMode] = useState('view'); // view | edit | create

    const handleEditTask = () => {
        setFormMode('edit'); // Установить режим редактирования
        setTaskFormOpen(true); // Открыть форму
    };

    return (
        <div className={`task-board ${isTaskFormOpen ? 'dimmed' : ''}`}>
            {/* Кнопка Параметры */}
            <button onClick={() => setParametersOpen(true)} className="parameters-button"></button>

            {/* Кнопка Фильтры */}
            <button onClick={() => setFiltersOpen(true)} className="filters-button"></button>

            {/* Кнопка добавления задачи */}
            <button onClick={() => setTaskFormOpen(true)} className="add-task-button"></button>

            {/* Колонки задач */}
            <div className="task-columns">
                {['Нужно сделать', 'В работе', 'Сделано', 'Доработать', 'Другое'].map((status) => (
                    <div
                        key={status}
                        className="task-column"
                        onDrop={(event) => handleDrop(event, status)}
                        onDragOver={handleDragOver}
                    >
                        <h3>{status}</h3>
                        {tasks[getStatusKey(status)].map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onClick={() => {
                                    setSelectedTask(task);
                                    setChatOpen(false);
                                }}
                                draggable
                                onDragStart={(event) => handleDragStart(event, task.id)}
                            />
                        ))}
                    </div>
                ))}
            </div>

            {/* Форма редактирования задачи */}
            {isTaskFormOpen && (
                <TaskForm
                    task={selectedTask}
                    onSave={handleSaveTask}
                    onDelete={handleDeleteTask}
                    onClose={() => {
                        setTaskFormOpen(false);
                        setSelectedTask(null);
                    }}
                    mode={selectedTask ? 'edit' : 'create'}
                />
            )}

            {/* Панель описания задачи */}
            {selectedTask && !isTaskFormOpen && !isChatOpen && (
                <TaskForm
                    task={selectedTask}
                    onClose={() => setSelectedTask(null)}
                    onDelete={handleDeleteTask}
                    onEdit={handleEditTask}
                    mode="view"
                />
            )}

            {/* Панель чата */}
            {isChatOpen && selectedTask && (
                <TaskChat
                    task={selectedTask}
                    onClose={() => setChatOpen(false)}
                />
            )}

            <ParametersPanel isOpen={isParametersOpen} onClose={() => setParametersOpen(false)} />
            <FiltersPanel isOpen={isFiltersOpen} onClose={() => setFiltersOpen(false)} />
        </div>
    );
}

export default TaskBoard;
