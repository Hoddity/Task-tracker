import React from 'react';

const TaskCard = ({ task, onClick, onChatClick, draggable, onDragStart }) => {
    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    return (
        <div
            className="task-card"
            onClick={onClick}
            draggable={draggable}
            onDragStart={onDragStart}
        >
            <h3>{truncateText(task.title, 20)}</h3>
            <div className='task-card-info'>
                <p><img src='src\img\account_circle.png' alt=''></img>{task.team}</p>
            </div>
        </div>
    );
};

export default TaskCard;