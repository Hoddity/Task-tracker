import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import { authActions } from '_store';

export { Login };

function Login() {
    const dispatch = useDispatch();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Введите логин'),
        password: Yup.string().required('Введите пароль')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    function onSubmit({ username, password }) {
        return dispatch(authActions.login({ username, password }));
    }

    return (
        
        <div className="card">
            
            <div className="card-body">
            <Link to="../register" className="btn btn-link"><button className='btn-reg'>Регистрация</button></Link>
                <h1 className='login-text'>Вход</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='login-form'>
                    <div className="logInput">
                            <input name="username" type="text" {...register('username')} placeholder=' Логин' className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.username?.message}</div>
                        </div>
                    <div className="logInput">
                        <input name="password" type="password" {...register('password')} placeholder=' Пароль' className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>
                    <button disabled={isSubmitting} className="btn btn-primary-log" >
                        {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                        Войти
                    </button>
                    
                </form>
            </div>
        </div>
    )
}
