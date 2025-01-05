import React from "react";
import { yg,td,jira } from "img/people";
import { useNavigate } from "react-router-dom";
export const Integrations = () => {
  const navigate = useNavigate();
  const handleGoToTasks = () => {
    navigate("/tasks");  // Переход к задачам через React Router
  };
  return (
    <div className="integrations-container">
      <h1 className="int">Интеграции</h1>
      <div className="integrations">
        <div className="integration-card">
          <img
            src={jira}
            alt="Jira"
            className="integration-logo jira"
          />
          <p>Jira</p>
          <button>Подключить</button>
        </div>
        <div className="integration-card">
          <img
            src={yg}
            alt="Yougile"
            className="integration-logo yg"
          />
          <p>Yougile</p>
          <button>Подключить</button>
        </div>
        <div className="integration-card">
          <img
            src={td}
            alt="Todoist"
            className="integration-logo td"
          />
          <p>Todoist</p>
          <button>Подключить</button>
        </div>
      </div>
      <a href="/tasks" className="home-link">
        <button onClick={handleGoToTasks}>К задачам</button>
      </a>
    </div>
  );
};

export default Integrations;
