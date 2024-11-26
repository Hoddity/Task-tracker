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
            <div className='task-card-info'>
                <p>{task.deadline}</p>
                <p>Команда: {task.team}</p>
            </div>
            
            
        </div>
    );
};

export default TaskCard;