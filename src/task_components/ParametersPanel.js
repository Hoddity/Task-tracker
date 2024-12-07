import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '_store/authActions';

export function ParametersPanel({ isOpen, onClose }) {
    const auth = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(authActions.logout());
        navigate('/login'); // Редирект на страницу входа после выхода
    };

    if (!isOpen || !auth) return null;

    return (
        <div className="parameters-panel">
            <p className="nav-name">Параметры</p>
            <button onClick={onClose} className="close-button">✖</button>

            <nav className="navbar-nav">
                {/* <NavLink to  className="nav-item nav-link">Интеграции</NavLink> */}
                <NavLink to="/" className="nav-item nav-link">Начало</NavLink>
                <NavLink to="/profile" className="nav-item nav-link">Профиль</NavLink>
                <NavLink to="/tasks" className="nav-item nav-link">Задачи</NavLink>
                <NavLink to="/integrations" className="nav-item nav-link">Интеграции</NavLink>
                <button onClick={logout} className="nav-item nav-link">Выход</button>
            </nav>
        </div>
    );
}
