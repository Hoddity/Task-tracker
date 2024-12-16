import React, { useState } from 'react';

const TaskChat = ({ task, onClose }) => {
    const [messages, setMessages] = useState(task.messages || []);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const updatedMessages = [...messages, { text: newMessage, date: new Date().toLocaleString() }];
            setMessages(updatedMessages);
            setNewMessage('');
        }
    };

    return (
        <div className="task-chat-sidebar">
            <button className="close-button" onClick={onClose}>✖</button>
            <h3>Чат по задаче: {task.title}</h3>
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className="chat-message">
                        <span>{msg.date}</span>
                        <p>{msg.text}</p>
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    placeholder="Введите сообщение..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={handleSendMessage}>Отправить</button>
            </div>
        </div>
    );
};

export default TaskChat;
