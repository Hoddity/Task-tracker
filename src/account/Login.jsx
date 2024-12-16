import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import api from 'api/axios'; // Импортируем настроенный axios
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '_store/authActions';

export { Login };

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Получаем authState из Redux
    const authState = useSelector((state) => state.auth);

    // Логируем authState в консоль
    useEffect(() => {
        console.log('Auth State:', authState); // Проверьте, что в authState есть token
    }, [authState]); // Перезапускается каждый раз, когда authState изменяется

    // Получаем accessToken из localStorage
    const accessToken = localStorage.getItem('accessToken');

    // Проверка наличия токена и редирект только один раз при монтировании
    useEffect(() => {
        if (authState.isAuthenticated) {
            // Если пользователь уже авторизован, перенаправляем на /tasks
            navigate('/tasks', { replace: true });
        }
    }, [accessToken, authState.isAuthenticated, navigate]);

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Введите логин'),
        password: Yup.string().required('Введите пароль'),
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    const onSubmit = async ({ username, password }) => {
        setLoading(true);
        setErrorMessage('');

        try {
            const response = await api.post('/accaunts/login/', { username, password });
            const { refresh, access } = response.data.tokens || {};
            const user = response.data.user;

            if (refresh && access) {
                // Сохраняем токены и информацию о пользователе в localStorage
                localStorage.setItem('refreshToken', refresh);
                localStorage.setItem('accessToken', access);
                localStorage.setItem('authUser', JSON.stringify(user));
                
                // Обновляем состояние в Redux
                dispatch(authActions.loginSuccess({ refresh, access, user }));

                // Перенаправляем на страницу задач
                navigate('/tasks', { replace: true });
            } else {
                setErrorMessage('Токены отсутствуют в ответе сервера.');
            }
        } catch (error) {
            if (error.response?.status === 401) {
                setErrorMessage('Неправильный логин или пароль.');
            } else {
                setErrorMessage(error.response?.data?.detail || 'Произошла ошибка при авторизации.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='log-reg-back'>
            <div className="card">
                <div className="card-body">
                    <Link to="../register" className="btn btn-link">
                        <button className="btn-reg">Регистрация</button>
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

                        </div><div className="invalid-feedback">{errors.username?.message}</div>
                        <div className="logInput">
                            <div className="input-group">
                                <input
                                    name="password"
                                    type="password"
                                    {...register('password')}
                                    placeholder="Пароль"
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                />
                            </div>

                        </div><div className="invalid-feedback">{errors.password?.message}</div>
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        <button disabled={isSubmitting || loading} className="btn btn-primary-log">
                            {loading && <span className="spinner-border spinner-border-sm me-1"></span>}
                            Войти
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
