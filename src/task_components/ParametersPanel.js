// task_components/ParametersPanel.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '_store';

export function ParametersPanel({ isOpen, onClose }) {
    const auth = useSelector(state => state.auth.value);
    const dispatch = useDispatch();
    const logout = () => dispatch(authActions.logout());

    if (!isOpen || !auth) return null;

    return (
        <div className="parameters-panel">
            <p className='nav-name'>Параметры</p>
            <button onClick={onClose} className="close-button">✖</button>

            <nav className="navbar-nav">
                <NavLink to="/start" className="nav-item nav-link">Начало</NavLink>
                <NavLink to="/" className="nav-item nav-link">Домой</NavLink>
                <NavLink to="/users" className="nav-item nav-link">Пользователи</NavLink>
                <NavLink to="/tasks" className="nav-item nav-link">Задачи</NavLink>
                <button onClick={logout} className="btn  nav-item nav-link">Выход</button>
            </nav>
        </div>
    );
}
