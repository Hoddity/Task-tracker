import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import { history } from '_helpers';
import {Alert, PrivateRoute } from '_components';
import { Home } from 'home';
import { AccountLayout } from 'account';
import { UsersLayout } from 'users';
import { Start } from 'start';
import { TaskProvider } from '_components/TaskContext';
import TaskBoard from 'task/TaskBoard';
import TaskForm from 'task/TaskForm';

export { App };

function App() {
    // Инициализация кастомного объекта истории для навигации из любых мест приложения
    history.navigate = useNavigate();
    history.location = useLocation();

    // Состояние для управления видимостью формы задачи
    const [isFormOpen, setIsFormOpen] = useState(false);

    const openForm = () => setIsFormOpen(true);
    const closeForm = () => setIsFormOpen(false);

    return (
        <TaskProvider>
            <div className="app-container">
                <Alert />
                <div className="container">
                    <Routes>
                        {/* Приватные маршруты */}
                        <Route element={<PrivateRoute />}>
                            <Route path="/" element={<Home />} />
                            <Route path="users/*" element={<UsersLayout />} />
                            <Route path="tasks" element={<TaskBoard openForm={openForm} />} />
                        </Route>

                        {/* Публичные маршруты */}
                        <Route path="start*" element={<Start/>}/>
                        <Route path="account/*" element={<AccountLayout />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>

                {/* Модальное окно с формой создания задачи */}
                {isFormOpen && (
                    <div className="modal">
                        <TaskForm onClose={closeForm} />
                        <button onClick={closeForm} className="close-button">Закрыть</button>
                    </div>
                )}
            </div>
        </TaskProvider>
    );
}
