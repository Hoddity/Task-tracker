import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';

export { Register };

function Register() {
    // Схема валидации
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('Введите имя'),
        lastName: Yup.string().required('Введите фамилию'),
        username: Yup.string()
            .required('Введите логин')
            .matches(/^[a-zA-Z0-9]+$/, 'Только латинские буквы и цифры')
            .min(3, 'Логин должен содержать не менее 3 символов'),
        password: Yup.string()
            .required('Введите пароль')
            .min(12, 'Пароль должен содержать не менее 12 символов'),
        confirmPassword: Yup.string()
            .required('Повторите пароль')
            .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    async function onSubmit(data) {
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/accaunts/register/',
                {
                    username: data.username,
                    first_name: data.firstName,
                    last_name: data.lastName,
                    password: data.password,
                    password2: data.confirmPassword,
                },
                {
                    headers: {
                        'accept': 'application/json',
                        'Content-Type': 'application/json',

                    },
                }
            );

            setSuccessMessage('Регистрация прошла успешно!');

        } catch (error) {
            setErrorMessage(
                error.response?.data?.detail || 'Ошибка регистрации. Проверьте данные.'
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="card card-body-register">
            <div className="card-body">
                <Link to="../login" className="btn btn-link">
                    <button className="btn-log">Вход</button>
                </Link>
                <form className="inputs" onSubmit={handleSubmit(onSubmit)}>
                    <div className="logInput">
                        <input
                            name="firstName"
                            type="text"
                            placeholder=" Имя"
                            {...register('firstName')}
                            className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                        />
                        
                    </div><div className="invalid-feedback">{errors.firstName?.message}</div>
                    <div className="logInput">
                        <input
                            name="lastName"
                            type="text"
                            placeholder=" Фамилия"
                            {...register('lastName')}
                            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                        />
                        
                    </div><div className="invalid-feedback">{errors.lastName?.message}</div>
                    <div className="logInput">
                        <input
                            name="username"
                            type="text"
                            placeholder=" Логин"
                            {...register('username')}
                            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                        />
                        
                    </div><div className="invalid-feedback">{errors.username?.message}</div>
                    <div className="logInput">
                        <input
                            name="password"
                            type="password"
                            placeholder=" Пароль"
                            {...register('password')}
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        />
                        
                    </div><div className="invalid-feedback">{errors.password?.message}</div>
                    <div className="logInput">
                        <input
                            name="confirmPassword"
                            type="password"
                            placeholder=" Повторите пароль"
                            {...register('confirmPassword')}
                            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                        />
                        
                        </div><div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    <button disabled={isSubmitting || loading} className="btn-primary-reg">
                        {loading && <span className="spinner-border spinner-border-sm me-1"></span>}
                        Зарегистрироваться
                    </button>
                </form>
            </div>
        </div>
    );
}
