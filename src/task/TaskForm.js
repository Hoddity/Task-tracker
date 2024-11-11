import React, { useState } from 'react';

function TaskForm({ onClose }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [priority, setPriority] = useState('Низкий');
    const [status, setStatus] = useState('Нужно сделать');
    const [team, setTeam] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onClose();
    };

    return (
        <div className="task-form">
            <button className="close-button" onClick={onClose}>✖</button>
            <h3>Создание задачи</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Заголовок" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <textarea placeholder="Описание" value={description} onChange={(e) => setDescription(e.target.value)} />
                <input type="date" placeholder="Дедлайн" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="Низкий">Низкий</option>
                    <option value="Средний">Средний</option>
                    <option value="Высокий">Высокий</option>
                    <option value="Критичный">Критичный</option>
                </select>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Нужно сделать">Нужно сделать</option>
                    <option value="В работе">В работе</option>
                    <option value="Сделано">Сделано</option>
                    <option value="Доработать">Доработать</option>
                    <option value="Другое">Другое</option>
                </select>
                <input type="text" placeholder="Команда" value={team} onChange={(e) => setTeam(e.target.value)} />
                <button type="submit" className="submit-button">Создать</button>
            </form>
        </div>
    );
}

export default TaskForm;
