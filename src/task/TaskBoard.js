import React, { useState, useEffect } from 'react';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import { ParametersPanel } from 'task_components/ParametersPanel';
import { FiltersPanel } from 'task_components/FiltersPanel';
import TaskChat from './TaskChat';
import useTaskForm from './helpers/useTaskForm';

// Основной компонент TaskBoard, который управляет задачами и их отображением
function TaskBoard() {
    // Состояние для хранения задач, разделенных по статусам
    const [tasks, setTasks] = useState({
        todo: [],
        inProgress: [],
        done: [],
        revise: [],
        other: []
    });

    // Состояние для выбранной задачи
    const [selectedTask, setSelectedTask] = useState(null);

    // Состояния для управления открытием/закрытием форм и панелей
    const [isTaskFormOpen, setTaskFormOpen] = useState(false);
    const [isParametersOpen, setParametersOpen] = useState(false);
    const [isFiltersOpen, setFiltersOpen] = useState(false);

    // Состояние для уведомлений
    const [notification, setNotification] = useState({ message: '', type: '' });

    // Состояния для управления чатом
    const [isChatOpen, setChatOpen] = useState(false);
    const [selectedTaskForChat, setSelectedTaskForChat] = useState(null);

    // Функция для отображения уведомлений
    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => setNotification({ message: '', type: '' }), 2900);
    };

    // Хук для управления формой задачи
    useTaskForm(selectedTask);

    // Функция для сохранения задачи на сервере
    const handleSaveTask = async (task) => {
        console.log('Saving task:', task);
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
            console.log('Созданная задача:', createdTask);
    
            // Обновляем локальное состояние задач
            setTasks((prevTasks) => {
                const updatedTasks = { ...prevTasks };
                const statusKey = getStatusKey(createdTask.status);
    
                // Проверяем, что задача еще не добавлена
                if (!updatedTasks[statusKey].some(t => t.id === createdTask.id)) {
                    updatedTasks[statusKey] = [...updatedTasks[statusKey], createdTask];
                }
    
                return updatedTasks;
            });
    
            showNotification('Сохранено', 'success');
        } catch (error) {
            showNotification('Ошибка. Попробуй еще раз', 'error');
        }
        setTaskFormOpen(false);
        setSelectedTask(null);
    };
    // Функция для обновления статуса задачи на сервере
    const updateTaskStatusOnServer = async (taskId, newStatus) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            console.log('Updating task with ID:', taskId);
    
            // Получаем текущую задачу из состояния
            const currentTask = Object.values(tasks)
                .flat()
                .find((task) => task.id === taskId);
    
            if (!currentTask) {
                throw new Error('Задача не найдена');
            }
    
            // Обновляем только статус, сохраняя остальные поля
            const updatedTaskData = {
                ...currentTask,
                status: newStatus,
            };
    
            const response = await fetch(`http://127.0.0.1:8000/tasks/${taskId}/`, {
                method: 'PATCH',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(updatedTaskData),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Ошибка сервера:', errorData);
                throw new Error('Ошибка при обновлении статуса задачи');
            }
    
            const updatedTask = await response.json();
            console.log('Обновленная задача с сервера:', updatedTask);
            return updatedTask;
        } catch (error) {
            console.error('Ошибка:', error);
            throw error;
        }
    };

    // Эффект для загрузки задач с сервера при монтировании компонента
    useEffect(() => {
        console.log('Fetching tasks...');
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
                console.log('Tasks from server:', tasksFromServer);
    
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
    }, []); // Зависимости пусты, чтобы фетчинг выполнялся только при монтировании компонента

    // Функция для получения ключа статуса задачи
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

    // Функция для удаления задачи
    // Функция для удаления задачи
const handleDeleteTask = async (taskId) => {
    try {
        const accessToken = localStorage.getItem('accessToken');

        // Вызов API для удаления задачи на сервере
        const response = await fetch(`http://127.0.0.1:8000/tasks/${taskId}/`, {
            method: 'DELETE',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error('Ошибка при удалении задачи');
        }

        // Обновляем локальное состояние
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

    // Функции для обработки событий drag and drop
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

    // Функция для обновления статуса задачи
    const updateTaskStatus = async (taskId, newStatus) => {
        try {
            // Обновляем статус задачи на сервере
            const updatedTask = await updateTaskStatusOnServer(taskId, newStatus);

            // Обновляем локальное состояние
            setTasks((prevTasks) => {
                const updatedTasks = { ...prevTasks };
                for (const key in updatedTasks) {
                    updatedTasks[key] = updatedTasks[key].filter((task) => task.id !== taskId);
                }
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

    // Состояние для режима формы (просмотр, редактирование, создание)
    const [formMode, setFormMode] = useState('view');

    // Функция для перехода в режим редактирования задачи
    const handleEditTask = () => {
        setFormMode('edit'); // Использование функции setFormMode
        setTaskFormOpen(true);
    };


// Функция для открытия чата
const handleOpenChat = (task) => {
    setSelectedTaskForChat(task);
    setChatOpen(true);
    setTaskFormOpen(false); // Закрываем форму задачи при открытии чата
};

// Функция для закрытия чата
const handleCloseChat = () => {
    setChatOpen(false);
    setSelectedTaskForChat(null);
};


    const handleUpdateTask = async (task) => {
        console.log('Updating task:', task);
        try {
            const accessToken = localStorage.getItem('accessToken');
    
            const response = await fetch(`http://127.0.0.1:8000/tasks/${task.id}/`, {
                method: 'PATCH',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(task),
            });
    
            if (!response.ok) {
                throw new Error('Ошибка при обновлении задачи');
            }
    
            const updatedTask = await response.json();
            console.log('Обновленная задача:', updatedTask);
    
            // Обновляем локальное состояние задач
            setTasks((prevTasks) => {
                const updatedTasks = { ...prevTasks };
                const statusKey = getStatusKey(updatedTask.status);
    
                // Удаляем задачу из всех статусов
                for (const key in updatedTasks) {
                    updatedTasks[key] = updatedTasks[key].filter((t) => t.id !== updatedTask.id);
                }
    
                // Добавляем задачу в новый статус
                updatedTasks[statusKey] = [...updatedTasks[statusKey], updatedTask];
    
                return updatedTasks;
            });
    
            showNotification('Задача обновлена', 'success');
        } catch (error) {
            showNotification('Ошибка. Попробуй еще раз', 'error');
        }
        setTaskFormOpen(false);
        setSelectedTask(null);
    };
    // Функция для добавления комментария к задаче
    const handleAddComment = async (taskId, comment) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`http://127.0.0.1:8000/tasks/${taskId}/comments/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ text: comment }),
            });
    
            if (!response.ok) {
                throw new Error('Ошибка при добавлении комментария');
            }
    
            const addedComment = await response.json();
            setTasks((prevTasks) => {
                const updatedTasks = { ...prevTasks };
                for (const key in updatedTasks) {
                    updatedTasks[key] = updatedTasks[key].map((task) => {
                        if (task.id === taskId) {
                            return {
                                ...task,
                                comments: [...(task.comments || []), addedComment],
                            };
                        }
                        return task;
                    });
                }
                return updatedTasks;
            });
        } catch (error) {
            console.error('Ошибка:', error);
        }
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
                    onSave={selectedTask ? handleUpdateTask : handleSaveTask}  // Передаем handleUpdateTask для редактирования
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