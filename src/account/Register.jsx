import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import { history } from '_helpers';
import { userActions, alertActions } from '_store';

export { Register };

function Register() {
    const dispatch = useDispatch();

    // Схема валидации
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('Введите фамилию'),
        lastName: Yup.string()
            .required('Введите имя'),
        username: Yup.string()
            .required('Введите логин')
            .matches(/^[a-zA-ZÀ-ÖÙ-öù-ÿĀ-žḀ-ỿ0-9\s\-\/.]+$/, 'Логин должен содержать латинские символы')
            .min(3, 'Логин должен содержать не менее 3 символа'),
        password: Yup.string()
            .required('Введите пароль')    
            .min(6, 'Пароль должен содержать не менее 6 символов'),
        confirmPassword: Yup.string()
        .required('Повторите пароль').oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
        
    });
    
    const formOptions = { resolver: yupResolver(validationSchema) };

    // Получаем функции для работы с формой
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    async function onSubmit(data) {
        dispatch(alertActions.clear());
        try {
            await dispatch(userActions.register(data)).unwrap();

            // Перенаправление на страницу входа и отображение сообщения об успешной регистрации
            history.navigate('/account/login');
            dispatch(alertActions.success({ message: 'Регистрация пройдена успешно', showAfterRedirect: true }));
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    }

    return (
        <div className="card card-body-register">
            <div className="card-body">
                <Link to="../login" className="btn btn-link"><button className='btn-log'>Вход</button></Link>
                <form className='inputs' onSubmit={handleSubmit(onSubmit)}>
                    <div className="logInput">
                        <input name="firstName" type="text" placeholder=' Фамилия' {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.firstName?.message}</div>
                    </div>
                    <div className="logInput">
                        <input name="lastName" type="text" placeholder=' Имя' {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.lastName?.message}</div>
                    </div>
                    <div className="logInput">
                        <input name="username" type="text" placeholder=' Логин' {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
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
                    <div className="logInput">
                        <input 
                            name="confirmPassword" 
                            type="password" 
                            {...register('confirmPassword')} 
                            placeholder=' Повторите пароль' 
                            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} 
                        />
                        <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                    </div>
                    <button disabled={isSubmitting} className="btn-primary-reg">
                        {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                        Зарегистрироваться
                    </button>
                </form>
            </div>
        </div>
    );
}
