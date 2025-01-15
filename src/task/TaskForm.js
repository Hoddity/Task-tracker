import React, { useState } from 'react';
import TaskView from './TaskView';
import ConfirmDialog from './helpers/ConfirmDialog';
import useTaskForm from './helpers/useTaskForm';

// Компонент TaskForm для создания, редактирования и просмотра задач
const TaskForm = ({ task, onClose, onSave, onDelete, mode = 'view', onEdit, onChatClick }) => {
    // Определяем, находится ли форма в режиме просмотра
    const isViewMode = mode === 'view';

    // Хук для управления состоянием формы
    const { formData, handleInputChange } = useTaskForm(task);

    // Состояния для управления подтверждением удаления и уведомлением о сохранении
    const [isConfirmOpen, setConfirmOpen] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    // Функция для отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted');
    
        const taskData = {
            title: formData.title,
            description: formData.description,
            date_end: formData.deadline,
            command: formData.team ? parseInt(formData.team) : null,
            is_complete: formData.status === 'Сделано',
            status: formData.status,
            priority: formData.priority,
        };
    
        console.log('Отправляемые данные:', taskData);
    
        try {
            onSave(taskData); // Передаем данные задачи в TaskBoard
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 3000);
            onClose();
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    // Функция для подтверждения удаления задачи
    const confirmDelete = () => {
        if (onDelete && task?.id) onDelete(task.id);
        setConfirmOpen(false);
    };

    return (
        <>
            <div className="backdrop" onClick={onClose}></div>
            <div className="task-form-sidebar">
                <button className="close-button" onClick={onClose}>✖</button>

                {isSaved && (
                    <div className="notification">
                        <span> Сохранено</span>
                        <button onClick={() => setIsSaved(false)}>✖</button>
                    </div>
                )}

                {task && isViewMode && (
                    <TaskView
                        task={task}
                        onEditClick={onEdit}
                        onViewClick={onClose}
                        onChatClick={onChatClick}
                    />
                )}

                <h3>
                    {isViewMode
                        ? ''
                        : task
                        ? 'Редактировать задачу'
                        : 'Создание задачи'}
                </h3>

                <form onSubmit={!isViewMode ? handleSubmit : undefined}>
                    <label>Заголовок<span className="red-star">*</span></label>
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

                    {isViewMode ? null : task ? (
                        <div className="button-group">
                            <button
                                type="button"
                                className="delete-button"
                                onClick={() => setConfirmOpen(true)}>Удалить задачу</button>
                            <button type="submit" className="submit-edit-button">Сохранить</button>
                        </div>
                    ) : (
                        <button type="submit" className="submit-button">Создать</button>
                    )}
                </form>
            </div>

            <ConfirmDialog
                isOpen={isConfirmOpen}
                onConfirm={confirmDelete}
                onCancel={() => setConfirmOpen(false)}
            />
        </>
    );
};

export default TaskForm;