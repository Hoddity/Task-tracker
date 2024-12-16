/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Link } from "react-router-dom";
import { igor,kirill,arkasha,tanya,adelya } from "img/people";

export function Start() {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <html className="page">

    
    <div className="start-page">
      <header>
        <nav className="nav-bar">
          <p onClick={() => scrollToSection("advantages")}>Преимущества</p>
          <p onClick={() => scrollToSection("features")}>Функционал</p>
          <p onClick={() => scrollToSection("about")}>О нас</p>
          <Link to="/account/login" className="nav-link-log">
            Вход
          </Link>
          <Link to="/account/register" className="nav-link-reg">
            Регистрация
          </Link>
        </nav>
        <div className="container">
          <div className="titles-container">
            <h1 className="start-title">Task Track</h1>
            <p className="start-description">
              Бесплатный трекер с удобным дизайном <br /> и огромным функционалом.
            </p>
            <Link to="/account/login"> <button className="start-button"> Приступить к работе </button></Link>
          </div>
        </div>
      </header>
      <main>
        <section id="advantages" className="section">
          <h2 className="medium-title advantages-title">Преимущества <br/>нашего Task Track</h2>
          <div className="advantages-container">
            <div className="advantage-item">
              <h3 className="small-title">Удобное управление задачами:</h3>
              <p className="advantage-p">
               Такстрекер позволяет добавлять и редактировать задачи с легкостью, что упрощает процесс планирования и мониторинга работы команды.
              </p>
            </div>
            <div className="advantage-item">
              <h3 className="small-title">Интеграция с другими системами:</h3>
              <p className="advantage-p">
                Возможность подключения к другим системам управления задачами обеспечивает бесшовный обмен данными и позволяет организациям использовать уже существующие инструменты без потери информации
              </p>
            </div>
            <div className="advantage-item">
              <h3 className="small-title">Коммуникация внутри задач:</h3>
              <p className="advantage-p">
                Функция добавления комментариев к задачам обеспечивает прозрачность общения и позволяет всем участникам проекта оставлять отзывы, задавать вопросы и делиться мыслями прямо в контексте работы.
              </p>
            </div>
          </div>
        </section>
        <section id="features" className="section">
          {/* <h2 className="medium-title">Функционал</h2> */}
          <div className="features-container">
            <div className="feature-item1 feature-item">
              <p>Дополнительно: Фильтры и Параметры</p>
            </div>
            <div className="feature-item2 feature-item" >
              <p>Внутренний функционал. 
              Редактирование Задачи.Информация о задаче. Комментарии.</p>
            </div>
            <div className="feature-item3 feature-item">
              <p>Добавление и редактирование задачи.</p>
            </div>
          </div>
        </section>
        <section id="about" className="section">
          <div className="about-container">
            <div className="about-item">
              <h2 className="about-title">Что такое TaskTrack?</h2>
              <p className="about-description">
                TaskTrack — это универсальный инструмент для управления задачами и проектами, который поддерживает двустороннюю интеграцию с другими популярными таск трекерами,такими как: jira, yougile, todoist. Это позволяет командам легко синхронизировать данные, избегать дублирования работы и обеспечивать прозрачность процесса.</p>
            </div >
            <h2 className="about-title">Кто мы?</h2>
            <div className="people-list">
              
              <div className="people">
                <img src={igor} className="photo"/>
                <p className="name">Кисляк Игорь</p>
                <p className="role">Тимлид</p>
              </div>
              <div className="people">
                <img src={kirill} className="photo"/>
                <p className="name">Малмыгин Кирилл</p>
                <p className="role">Бэкенд разработчик</p>
              </div>
              <div className="people">
                <img src={adelya} alt="фото" className="photo"/>
                <p className="name">Султанбекова Аделина</p>
                <p className="role">Фронтенд разработчик</p>
              </div>
              <div className="people">
                <img src={arkasha} className="photo"/>
                <p className="name">Прохоров Аркадий</p>
                <p className="role">Бэкенд разработчик</p>
              </div>
              <div className="people">
                <img src={tanya} className="photo"/>
                <p className="name">Панова Татьяна</p>
                <p className="role">Дизайнер</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="start-footer">
        <nav className="footer-nav">
          <p className="ft">TaskTracker</p>
          <p className="ft">2024</p>
          <p className="ft">adidas team</p>
        </nav>
      </footer>
    </div></html>
  );
}
