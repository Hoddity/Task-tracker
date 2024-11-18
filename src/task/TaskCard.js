import React from 'react';

const TaskCard = ({ task, onClick, draggable, onDragStart }) => {
    return (
        <div
            className="task-card"
            onClick={onClick}
            draggable={draggable}
            onDragStart={onDragStart}
        >
            <h3>{task.title}</h3>
            <p>Дедлайн: {task.deadline}</p>
            <p>Команда: {task.team}</p>
        </div>
    );
};

export default TaskCard;