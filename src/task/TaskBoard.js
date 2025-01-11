import React, { useState, useEffect } from 'react';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import { ParametersPanel } from 'task_components/ParametersPanel';
import { FiltersPanel } from 'task_components/FiltersPanel';
import TaskChat from './TaskChat';
import TaskView from './TaskView';
import useTaskForm from './helpers/useTaskForm';

function TaskBoard() {
    const [tasks, setTasks] = useState({
        todo: [],
        inProgress: [],
        done: [],
        revise: [],
        other: []
    });
    const [isChatOpen, setChatOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isTaskFormOpen, setTaskFormOpen] = useState(false);
    const [isParametersOpen, setParametersOpen] = useState(false);
    const [isFiltersOpen, setFiltersOpen] = useState(false);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const { formData, setFormData, handleInputChange, saveTaskToServer } = useTaskForm(selectedTask);

    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => setNotification({ message: '', type: '' }), 2900);
    };
    // Сохранение новой или отредактированной задачи
    const handleSaveTask = async (task) => {
        try {
            const savedTask = await saveTaskToServer(task);
            setTasks((prevTasks) => {
                const updatedTasks = { ...prevTasks };
                if (savedTask.id) {
                    for (const key in updatedTasks) {
                        updatedTasks[key] = updatedTasks[key].filter((t) => t.id !== savedTask.id);
                    }
                } else {
                    savedTask.id = Date.now().toString();
                }
                updatedTasks[getStatusKey(savedTask.status)].push(savedTask);
                return updatedTasks;
            });
            showNotification('Сохранено', 'success');
        } catch (error) {
            showNotification('Ошибка. Попробуй еще раз', 'error');
        }
        setTaskFormOpen(false);
        setSelectedTask(null);
    };
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken'); // Получаем токен из localStorage

const fetchTasks = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8000/tasks/', {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`, // Добавляем токен доступа
            },
        });

        if (!response.ok) {
            throw new Error('Ошибка при загрузке задач');
        }

        const tasksFromServer = await response.json();
        setTasks({
            todo: tasksFromServer.filter(task => task.status === 'Нужно сделать'),
            inProgress: tasksFromServer.filter(task => task.status === 'В работе'),
            done: tasksFromServer.filter(task => task.status === 'Сделано'),
            revise: tasksFromServer.filter(task => task.status === 'Доработать'),
            other: tasksFromServer.filter(task => task.status === 'Другое'),
        });
    } catch (error) {
        console.error('Ошибка:', error);
    }
};
    
        fetchTasks();
    }, []);
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
    try {
        setTasks((prevTasks) => {
            const updatedTasks = { ...prevTasks };
            for (const key in updatedTasks) {
                updatedTasks[key] = updatedTasks[key].filter((task) => task.id !== taskId);
            }
            return updatedTasks;
        });
        showNotification('Задача удалена', 'success');
    } catch (error) {
        showNotification('Ошибка. Попробуй еще раз', 'error');
    }
    setTaskFormOpen(false);
    setSelectedTask(null);
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
                // eslint-disable-next-line no-loop-func
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

    const handleOpenChat = (task) => {
        console.log('Клик по кнопке чата, задача:', task); // Отладка
        setSelectedTask(task); // Устанавливаем задачу, к которой привязан чат
        setChatOpen(true); // Открываем чат
    };
    

    const handleAddComment = (taskId, comment) => {
        setTasks((prevTasks) => {
            const updatedTasks = { ...prevTasks };
            for (const key in updatedTasks) {
                updatedTasks[key] = updatedTasks[key].map((task) => {
                    if (task.id === taskId) {
                        return {
                            ...task,
                            comments: [...(task.comments || []), comment],
                        };
                    }
                    return task;
                });
            }
            return updatedTasks;
        });
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
                            onClick={() => setSelectedTask(task)}
                            onChatClick={() => handleOpenChat(task)}
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
            {notification.message && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}
            {selectedTask && !isTaskFormOpen && (
                <TaskForm
                    task={selectedTask}
                    onClose={() => setSelectedTask(null)}
                    onDelete={handleDeleteTask}
                    onEdit={handleEditTask}
                    mode="view"
                />
            )}

            {isChatOpen && selectedTask && (
                <TaskChat
                    task={selectedTask}
                    onClose={() => setChatOpen(false)}
                    onAddComment={handleAddComment}
                />
            )}

            <ParametersPanel isOpen={isParametersOpen} onClose={() => setParametersOpen(false)} />
            <FiltersPanel isOpen={isFiltersOpen} onClose={() => setFiltersOpen(false)} />
        </div>
    );
}

export default TaskBoard;
