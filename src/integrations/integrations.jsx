import React from "react";

export const Integrations = () => {
  return (
    <div className="integrations-container">
      <h1>Интеграции</h1>
      <div className="integrations">
        <div className="integration-card">
          <img
            src="../img/jira.png"
            alt="Jira"
            className="integration-logo"
          />
          <p>Jira</p>
          <button>Подключить</button>
        </div>
        <div className="integration-card">
          <img
            src="src\img\yougile.png"
            alt="Yougile"
            className="integration-logo"
          />
          <p>Yougile</p>
          <button>Подключить</button>
        </div>
        <div className="integration-card">
          <img
            src="src\img\todoist.png"
            alt="Todoist"
            className="integration-logo"
          />
          <p>Todoist</p>
          <button>Подключить</button>
        </div>
      </div>
      <a href="/tasks" className="home-link">
        <button>На главную</button>
      </a>
    </div>
  );
};

export default Integrations;
