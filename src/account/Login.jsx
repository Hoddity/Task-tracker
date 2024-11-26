import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';

export { Login };

function Login() {
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Введите логин'),
        password: Yup.string().required('Введите пароль')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    async function onSubmit({ username, password }) {
        setLoading(true);
        setErrorMessage('');

        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/accaunts/login/',
                {
                    username,
                    password
                },
                {
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-CSRFTOKEN': 'cr8jvtjNEIW7QQGDA0XaG6uEZLnQ8vkS' // Замените токен на актуальный, если нужно
                    }
                }
            );

            // Сохранение токена в localStorage или state
            const token = response.data.Token;
            localStorage.setItem('authToken', token);

            alert('Успешный вход!');
        } catch (error) {
            setErrorMessage(
                error.response?.data?.detail || 'Ошибка авторизации. Проверьте логин и пароль.'
            );
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
                <h1 className='login-text'>Вход</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='login-form'>
                    <div className="logInput">
                        <input
                            name="username"
                            type="text"
                            {...register('username')}
                            placeholder=' Логин'
                            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.username?.message}</div>
                    </div>
                    <div className="logInput">
                        <input
                            name="password"
                            type="password"
                            {...register('password')}
                            placeholder=' Пароль'
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        />
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
