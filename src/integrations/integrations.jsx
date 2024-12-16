import React from "react";
import { yg,td,jira } from "img/people";

export const Integrations = () => {
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
      <a href="/" className="home-link">
        <button>На главную</button>
      </a>
    </div>
  );
};

export default Integrations;
