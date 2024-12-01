import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '_store/authActions';

export { Login };


function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);
    console.log('Auth State:', authState); // Проверьте, что в authState есть token

    // Валидация формы
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Введите логин'),
        password: Yup.string().required('Введите пароль'),
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    // Локальные состояния
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Обработчик отправки формы
    async function onSubmit({ username, password }) {
        setLoading(true);
        setErrorMessage('');
    
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/accaunts/login/',
                { username, password },
                {
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            );
    
            // Получение токена из ответа сервера
            const token = response.data?.Token;  // Теперь используется 'Token' из ответа сервера
            const user = response.data?.user;
            if (token) {
                // Сохраните токен в localStorage
                localStorage.setItem('authToken', token);
                localStorage.setItem('authUser', JSON.stringify(user));
                // Обновление состояния в Redux (например, отправка токена)
                dispatch(authActions.loginSuccess({ token }));
    
                // Перенаправление на страницу задач
                navigate('/tasks', { replace: true });
            } else {
                setErrorMessage('Токен отсутствует в ответе сервера.');
            }
        } catch (error) {
            setErrorMessage(
                error.response?.data?.detail || 'Ошибка авторизации. Проверьте логин и пароль.'
            );
            console.error('Ошибка API:', error);
        } finally {
            setLoading(false);
        }   
    }

    return (
        <div className="card">
            <div className="card-body">
                <Link to="../register" className="btn btn-link">
                    <button className='btn-reg'>Регистрация</button>
                </Link>
                <h1 className="login-text">Вход</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                    <div className="logInput">
                        <input
                            name="username"
                            type="text"
                            {...register('username')}
                            placeholder="Логин"
                            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.username?.message}</div>
                    </div>
                    <div className="logInput">
                        <div className="input-group">
                            <input
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                {...register('password')}
                                placeholder="Пароль"
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary eye-button"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </button>
                        </div>
                        <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <button disabled={isSubmitting || loading} className="btn btn-primary-log">
                        {loading && <span className="spinner-border spinner-border-sm me-1"></span>}
                        Войти
                    </button>
                </form>
            </div>
        </div>
    );
}
