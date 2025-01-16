import React, { useState, useEffect } from 'react';

const TaskChat = ({ task, onClose }) => {
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken'); // Получаем токен из localStorage
                const response = await fetch(`http://127.0.0.1:8000/tasks/${task.id}/comments/`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`, // Добавляем токен в заголовки
                    },
                });
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке комментариев');
                }
                const data = await response.json();
                setComments(data);
            } catch (error) {
                console.error('Ошибка:', error);
            }
        };
    
        fetchComments();
    }, [task.id]);

    const handleAddComment = async () => {
    if (newComment.trim()) {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`http://127.0.0.1:8000/tasks/${task.id}/comments/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    task: task.id, // Добавляем ID задачи
                    text: newComment, // Текст комментария
                }),
            });

            if (!response.ok) {
                throw new Error('Ошибка при добавлении комментария');
            }

            const addedComment = await response.json();
            setComments([...comments, addedComment]);
            setNewComment('');
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }
};

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAddComment();
        }
    };

    return (
        <div className="task-chat-sidebar">
            <div className="chat-header">
                <button className="close-button close-button-chat" onClick={onClose}>✖</button>
            </div>

            <div className="chat-messages">
                {comments.map((comment) => (
                    <div key={comment.id} className="chat-message">
                        <div className="message-header">
                            <span className="message-author">{comment.author}</span>
                            <span className="message-date">{new Date(comment.created_at).toLocaleString()}</span>
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
                    onKeyDown={handleKeyDown}
                    placeholder="Добавить комментарий..."
                />
                <button onClick={handleAddComment} className='send'></button>
            </div>
        </div>
    );
};

export default TaskChat;