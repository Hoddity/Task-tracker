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
    const [selectedTask, setSelectedTask] = useState(null);
    const [isTaskFormOpen, setTaskFormOpen] = useState(false);
    const [isParametersOpen, setParametersOpen] = useState(false);
    const [isFiltersOpen, setFiltersOpen] = useState(false);
    const [notification, setNotification] = useState({ message: '', type: '' });

    const [isChatOpen, setChatOpen] = useState(false);
    const [selectedTaskForChat, setSelectedTaskForChat] = useState(null);
    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => setNotification({ message: '', type: '' }), 2900);
    };
    useTaskForm(selectedTask);
    const handleSaveTask = async (task) => {
        try {
            const accessToken = localStorage.getItem('accessToken');

            const response = await fetch('http://127.0.0.1:8000/tasks/', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',

                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(task),
            });

            if (!response.ok) {
                throw new Error('Ошибка при создании задачи');
            }

            const createdTask = await response.json();
            setTasks((prevTasks) => {
                const updatedTasks = { ...prevTasks };
                updatedTasks[getStatusKey(createdTask.status)].push(createdTask);
                return updatedTasks;
            });

            showNotification('Сохранено', 'success');
        } catch (error) {
            showNotification('Ошибка. Попробуй еще раз', 'error');
        }
        setTaskFormOpen(false);
        setSelectedTask(null);
    };

    const updateTaskStatusOnServer = async (taskId, newStatus) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            console.log('Updating task with ID:', taskId); // Логируем taskId
            const response = await fetch(`http://127.0.0.1:8000/tasks/${taskId}/`, {
                method: 'PATCH',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Ошибка сервера:', errorData);
                throw new Error('Ошибка при обновлении статуса задачи');
            }
    
            const updatedTask = await response.json();
            console.log('Обновленная задача с сервера:', updatedTask); // Логируем ответ сервера
            return updatedTask;
        } catch (error) {
            console.error('Ошибка:', error);
            throw error;
        }
    };

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');

        const fetchTasks = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/tasks/', {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
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
        event.dataTransfer.setData('taskId', taskId.toString()); // Убедитесь, что taskId передается как строка
        console.log('Drag started with task ID:', taskId); // Логируем taskId
    };
    
    const handleDrop = (event, newStatus) => {
        event.preventDefault();
        const taskId = event.dataTransfer.getData('taskId'); // Получаем taskId
        console.log('Task ID from drop:', taskId); // Логируем taskId
        if (taskId) {
            updateTaskStatus(parseInt(taskId, 10), newStatus); // Преобразуем taskId в число
        } else {
            console.error('Task ID is undefined');
        }
    };
    
    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const updateTaskStatus = async (taskId, newStatus) => {
        try {
            // Обновляем статус задачи на сервере
            const updatedTask = await updateTaskStatusOnServer(taskId, newStatus);
    
            // Обновляем локальное состояние
            setTasks((prevTasks) => {
                // Создаем копию предыдущего состояния
                const updatedTasks = { ...prevTasks };
    
                // Удаляем задачу из всех колонок
                for (const key in updatedTasks) {
                    updatedTasks[key] = updatedTasks[key].filter((task) => task.id !== taskId);
                }
    
                // Добавляем задачу в новую колонку с обновленным статусом
                updatedTasks[getStatusKey(newStatus)] = [
                    ...updatedTasks[getStatusKey(newStatus)],
                    updatedTask,
                ];
    
                console.log('Обновленное состояние задач:', updatedTasks); // Логируем состояние
                return updatedTasks;
            });
    
            showNotification('Статус задачи обновлен', 'success');
        } catch (error) {
            showNotification('Ошибка при обновлении статуса задачи', 'error');
        }
    };


    const [formMode, setFormMode] = useState('view'); // view | edit | create

    const handleEditTask = () => {
        setFormMode('edit');
        setTaskFormOpen(true);
    };

    const handleOpenChat = (task) => {
        setSelectedTaskForChat(task);
        setChatOpen(true);
    };
    const handleCloseChat = () => {
        setChatOpen(false);
        setSelectedTaskForChat(null);
    };

    const handleAddComment = (taskId, comment, timestamp) => {
        setTasks((prevTasks) => {
            const updatedTasks = { ...prevTasks };
            for (const key in updatedTasks) {
                // eslint-disable-next-line no-loop-func
                updatedTasks[key] = updatedTasks[key].map((task) => {
                    if (task.id === taskId) {
                        return {
                            ...task,
                            comments: [
                                ...(task.comments || []),
                                {
                                    text: comment,
                                    author: 'User', // Имя автора (можно заменить на динамическое)
                                    date: timestamp, // Временная метка
                                },
                            ],
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
            <button onClick={() => setParametersOpen(true)} className="parameters-button"></button>
            <button onClick={() => setFiltersOpen(true)} className="filters-button"></button>
            <button onClick={() => setTaskFormOpen(true)} className="add-task-button"></button>

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
                    onChatClick={() => handleOpenChat(selectedTask)} // Передаем функцию для открытия чата
                    mode="view"
                />
            )}

            {isChatOpen && selectedTaskForChat && (
                <TaskChat
                    task={selectedTaskForChat}
                    onClose={handleCloseChat}
                    onAddComment={handleAddComment}
                />
            )}

            <ParametersPanel isOpen={isParametersOpen} onClose={() => setParametersOpen(false)} />
            <FiltersPanel isOpen={isFiltersOpen} onClose={() => setFiltersOpen(false)} />
        </div>
    );
}

export default TaskBoard;