import React from 'react';

const TaskCard = ({ task }) => {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>Приоритет: {task.priority}</p>
      <p>Дедлайн: {task.deadline}</p>
      <p>Команда: {task.team}</p>
    </div>
  );
};

export default TaskCard;