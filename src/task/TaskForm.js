import React, { useState, useEffect } from 'react';

const TaskForm = ({ task, onClose, onSave, mode = 'view', onEdit }) => {
    const isViewMode = mode === 'view';
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        deadline: '',
        priority: 'Низкий',
        status: 'Нужно сделать',
        team: '',
        author: 'автор',
    });

    // Заполняем форму при редактировании
    useEffect(() => {
        if (task) {
            // Если редактируем задачу, заполняем форму
            setFormData({
                title: task.title || '',
                description: task.description || '',
                deadline: task.deadline || '',
                priority: task.priority || 'Низкий',
                status: task.status || 'Нужно сделать',
                team: task.team || '',
                author: task.author || 'автор',
            });
        } else {
            // Если создаем новую задачу, сбрасываем форму
            setFormData({
                title: '',
                description: '',
                deadline: '',
                priority: 'Низкий',
                status: 'Нужно сделать',
                team: '',
                author: 'автор',
            });
        }
    }, [task]);
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...task,
            ...formData,
            id: task?.id || Date.now().toString(),
        });
        onClose();
    };

    return (
        <>
            <div className="backdrop" onClick={onClose}></div>
            <div className="task-form-sidebar">
                <button className="close-button" onClick={onClose}>✖</button>
                <h3>
                    {isViewMode
                        ? 'Просмотр задачи'
                        : task
                        ? 'Редактировать задачу'
                        : 'Создание задачи'}
                </h3>
                <form onSubmit={!isViewMode ? handleSubmit : undefined}>
                    <label>Заголовок</label>
                    {isViewMode ? (
                        <p>{formData.title}</p>
                    ) : (
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                        />
                    )}

                    <label>Описание</label>
                    {isViewMode ? (
                        <p>{formData.description || 'Нет описания'}</p>
                    ) : (
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                        />
                    )}

                    <label>Статус</label>
                    {isViewMode ? (
                        <p>{formData.status}</p>
                    ) : (
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleInputChange}
                        >
                            <option value="Нужно сделать">Нужно сделать</option>
                            <option value="В работе">В работе</option>
                            <option value="Сделано">Сделано</option>
                            <option value="Доработать">Доработать</option>
                            <option value="Другое">Другое</option>
                        </select>
                    )}

                    <label>Приоритет</label>
                    {isViewMode ? (
                        <p>{formData.priority}</p>
                    ) : (
                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleInputChange}
                        >
                            <option value="Низкий">Низкий</option>
                            <option value="Средний">Средний</option>
                            <option value="Высокий">Высокий</option>
                            <option value="Критичный">Критичный</option>
                        </select>
                    )}

                    <label>Дедлайн</label>
                    {isViewMode ? (
                        <p>{formData.deadline || 'Не указан'}</p>
                    ) : (
                        <input
                            type="date"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleInputChange}
                        />
                    )}

                    <label>Команда</label>
                    
                    {isViewMode ? (
                        <p>{formData.team || 'Не указана'}</p>
                    ) : (
                        <input
                            type="text"
                            name="team"
                            value={formData.team}
                            onChange={handleInputChange}
                        />
                    )}

                    {isViewMode ? (
                        <button type="button" className="edit-button" onClick={onEdit}>
                            Редактировать
                        </button>
                    ) : (
                        <button type="submit" className="submit-button">
                            {task ? 'Сохранить' : 'Создать'}
                        </button>
                    )}
                </form>
            </div>
        </>
    );
};

export default TaskForm;
