import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";  // Импортируем useNavigate для навигации
// import { updateProfile } from "_store/authActions"; // Предполагаем, что это действие для обновления профиля

export function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();  // Инициализируем navigate
  const user = useSelector((state) => state.auth.user);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Схема валидации
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Введите имя"),
    lastName: Yup.string().required("Введите фамилию"),
    password: Yup.string()
      .nullable()
      .min(8, "Пароль должен содержать не менее 8 символов"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, reset } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  const onSubmit = async (data) => {
    try {
      setSuccessMessage("");
      setErrorMessage("");

      // Отправка данных на сервер через Redux action
      // await dispatch(
      //   updateProfile({
              
      //     firstName: data.firstName,
      //     lastName: data.lastName,
      //     password: data.password || undefined, // Обновляем только если пароль введен
      //   })
      // );

      setSuccessMessage("Данные успешно обновлены");
      reset(); // Сброс формы
    } catch (error) {
      setErrorMessage(error.message || "Ошибка обновления данных");
    }
  };

  const handleGoToTasks = () => {
    navigate("/tasks");  // Переход к задачам через React Router
  };

  return (
    <div className="profile-page">
      <h1>Настройка аккаунта</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="profile-form">
        <div className="form-group">
          <label>Логин</label>
          <input
            name="login"
            type="text"
            value={user?.username || ""}
            disabled
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Имя</label>
          <input
            name="firstName"
            type="text"
            defaultValue={user?.firstName || ""}
            {...register("firstName")}
            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.firstName?.message}</div>
        </div>
        <div className="form-group">
          <label>Фамилия</label>
          <input
            name="lastName"
            type="text"
            defaultValue={user?.lastName || ""}
            {...register("lastName")}
            className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.lastName?.message}</div>
        </div>
        <div className="form-group">
          <label>Пароль</label>
          <input
            name="password"
            type="password"
            placeholder="Введите новый пароль"
            {...register("password")}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
        </div>
        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary"
        >
          {isSubmitting ? "Сохранение..." : "Сохранить изменения"}
        </button>
      </form>
      <button
        className="btn btn-secondary mt-3"
        onClick={handleGoToTasks}  // Используем обработчик навигации
      >
        К задачам
      </button>
    </div>
  );
}
