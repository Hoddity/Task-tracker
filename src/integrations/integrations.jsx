import React from "react";
import { yg,td,jira } from "img/people";

export const Integrations = () => {
  return (
    <div className="integrations-container">
      <h1>Интеграции</h1>
      <div className="integrations">
        <div className="integration-card">
          <img
            src={jira}
            alt="Jira"
            className="integration-logo"
          />
          <p>Jira</p>
          <button>Подключить</button>
        </div>
        <div className="integration-card">
          <img
            src={yg}
            alt="Yougile"
            className="integration-logo"
          />
          <p>Yougile</p>
          <button>Подключить</button>
        </div>
        <div className="integration-card">
          <img
            src={td}
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
