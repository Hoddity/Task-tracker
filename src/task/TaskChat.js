import React, { useState } from 'react';

const TaskChat = ({ task, onClose, onAddComment }) => {
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState(task.comments || []); // Локальное состояние для комментариев

    const handleAddComment = () => {
        if (newComment.trim()) {
            const timestamp = new Date().toLocaleString(); // Получаем текущее время
            const commentWithTimestamp = {
                text: newComment,
                author: 'User', // Имя автора (можно заменить на динамическое)
                date: timestamp, // Временная метка
            };

            const updatedComments = [...comments, commentWithTimestamp]; // Добавляем новый комментарий с временем
            setComments(updatedComments); // Обновляем локальное состояние
            onAddComment(task.id, newComment, timestamp); // Передаем комментарий и время в родительский компонент
            setNewComment(''); // Очищаем поле ввода
        }
    };

    // Обработчик нажатия клавиши
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAddComment(); // Отправляем сообщение при нажатии на Enter
        }
    };

    return (
        <div className="task-chat-sidebar">
            <div className="chat-header">
                <button className="close-button close-button-chat" onClick={onClose}>✖</button>
            </div>

            <div className="chat-messages">
                {comments.map((comment, index) => (
                    <div key={index} className="chat-message">
                        <div className="message-header">
                            <span className="message-author">{comment.author}</span>
                            <span className="message-date">{comment.date}</span>
                        </div>
                        <p className="message-text">{comment.text}</p>
                    </div>
                ))}
            </div>

            <div className="chat-input">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={handleKeyDown} // Обработчик нажатия клавиши
                    placeholder="Добавить комментарий..."
                />
                <button onClick={handleAddComment} className='send'></button>
            </div>
        </div>
    );
};

export default TaskChat;