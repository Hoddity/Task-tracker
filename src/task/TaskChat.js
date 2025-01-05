import React, { useState } from 'react';

const TaskChat = ({ task, onClose, onAddComment }) => {
    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
        if (newComment.trim()) {
            onAddComment(task.id, newComment);
            setNewComment('');
        }
    };
    
    return (
        <div className="task-chat-sidebar">
            <button className="close-button" onClick={onClose}>✖</button>
            <h3>Комментарии к задаче: {task.title}</h3>
            <div className="chat-messages">
                {task.comments?.map((comment, index) => (
                    <div key={index} className="chat-message">
                        <span>{comment}</span>
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Добавить комментарий..."
                />
                <button onClick={handleAddComment}>Отправить</button>
            </div>
        </div>
    );
};

export default TaskChat;
