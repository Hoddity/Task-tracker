import React from 'react';
import TaskCard from './TaskCard';

const TaskColumn = ({ title, tasks, onTaskClick, onChatClick, onDragStart }) => {
  return (
    <div className="task-column">
      <h2>{title}</h2>
      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => onTaskClick(task)} // Передаем функцию для обработки клика
            onChatClick={() => onChatClick(task)} // Передаем функцию для открытия чата
            draggable // Разрешаем перетаскивание
            onDragStart={(event) => onDragStart(event, task.id)} // Обрабатываем начало перетаскивания
          />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;