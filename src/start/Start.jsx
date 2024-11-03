import { Link } from "react-router-dom";

export {Start};

function Start() {
    return (
        <div className="start-page">
        <div className="container">
      <h1 className="start-title">Task Track</h1>
      <p className="start-description">
        Бесплатный трекер с удобным дизайном <br/> и огромным функционалом.
      </p>
      <Link to="/account/login"> <button className="start-button"> Приступить к работе </button></Link>
      <div className="circles">
      <div className="circle purple top-left"></div>
        <div className="circle green top-right"></div>
        <div className="circle green bottom-left"></div>
        <div className="circle purple bottom-right"></div>
      </div>
    </div>
    </div>
    );
}