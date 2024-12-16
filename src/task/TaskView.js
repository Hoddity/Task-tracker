import React from 'react';

const TaskView = ({ task, onEditClick, onViewClick, draggable, onDragStart,onChatClick }) => {
    return (
        <div
            className="task-card-view"
            draggable={draggable}
            onDragStart={onDragStart}
        >
            <h4 className='task-card-view-title'>{task.title}</h4>         
            <div className="task-card-buttons">
                <button onClick={onEditClick} className="card-edit-button">
                </button>
                <button onClick={onViewClick} className="card-view-button">
                </button>
                <button className="chat-button" onClick={(e) => {
                e.stopPropagation(); // Предотвращаем всплытие события
                onChatClick();
            }}></button>
            </div>
        </div>
        
    );
};

export default TaskView;