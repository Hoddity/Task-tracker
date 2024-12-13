import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import { history } from '_helpers';
import {PrivateRoute } from '_components';
import { AccountLayout } from 'account';
import { Start } from 'start';
import { TaskProvider } from '_components/TaskContext';
import TaskBoard from './task/TaskBoard';
import { ProfilePage } from 'account/ProfilePage';
import { Integrations } from 'integrations/integrations';
export { App };

function App() {
    // Инициализация кастомного объекта истории для навигации из любых мест приложения
    history.navigate = useNavigate();
    history.location = useLocation();

    // Состояние для управления видимостью формы задачи
    const [setIsFormOpen] = useState(false);

    const openForm = () => setIsFormOpen(true);
    
    return (
        <TaskProvider>
            <div className="app-container">
                <div className="container">
                    <Routes>
                        {/* Приватные маршруты */}
                        <Route element={<PrivateRoute />}>
                            <Route path='profile' element={<ProfilePage/>} />
                            <Route path="tasks" element={<TaskBoard openForm={openForm} />} />
                            <Route path="integrations" element={<Integrations/>} />
                        </Route>

                        {/* Публичные маршруты */}
                        <Route path="/" element={<Start />} />
                        <Route path="account/*" element={<AccountLayout />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
            </div>
        </TaskProvider>
    );
}
