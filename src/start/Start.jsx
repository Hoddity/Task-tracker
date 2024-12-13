import React from "react";
import { Link } from "react-router-dom";

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
          <h2 className="medium-title">Преимущества нашего Task Track</h2>
          <div className="advantages-container">
            <div className="advantage-item">
              <h3 className="small-title">Удобное управление задачами</h3>
              <p>
                Тасктрекер позволяет добавлять и редактировать задачи с легкостью, что упрощает процесс планирования и мониторинга работы команды.
              </p>
            </div>
            <div className="advantage-item">
              <h3 className="small-title">Интеграция с другими системами</h3>
              <p>
                Возможность подключения к другим системам управления задачами обеспечивает бесшовный обмен данными и позволяет организациям использовать уже существующие инструменты без потери информации
              </p>
            </div>
            <div className="advantage-item">
              <h3 className="small-title">Коммуникация внутри задач</h3>
              <p>
                Функция добавления комментариев к задачам обеспечивает прозрачность общения и позволяет всем участникам проекта оставлять отзывы, задавать вопросы и делиться мыслями прямо в контексте работы.
              </p>
            </div>
          </div>
        </section>
        <section id="features" className="section">
          <h2 className="medium-title">Функционал</h2>
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
          <h2 className="medium-title">О нас</h2>
          <div className="about-container">
            <div className="about-item">
              <p>
                TaskTrack — это универсальный инструмент для управления задачами и проектами, который поддерживает двустороннюю интеграцию с другими популярными таск трекерами,такими как: jira, yougile, todoist. Это позволяет командам легко синхронизировать данные, избегать дублирования работы и обеспечивать прозрачность процесса.</p>

              <p>Пользователи могут создавать, обновлять и отслеживать задачи в одном интерфейсе. Мы предлагаем гибкие настройки интеграции, позволяя адаптировать рабочие процессы под уникальные потребности вашей команды. </p>

              <p>Функции включают управление приоритетами, установку сроков, комментирование и обмен файлами. Это идеальное решение для компаний, стремящихся оптимизировать свою работу и повысить эффективность командного взаимодействия.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="start-footer">
        <nav className="footer-nav">
          <p className="ft">TaskTracker</p>
          <p className="ft">2024</p>
          <p>Email</p>
        </nav>
      </footer>
    </div></html>
  );
}
