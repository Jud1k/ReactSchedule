import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStores } from "@/root-store-context";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { LoginFormData, RegisterFormData, registerFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputFiled1 } from "../generic/InputFiled1";

export default observer(function RegisterForm() {
  const { authStore } = useStores();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerFormSchema),mode:"onChange" });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await authStore.register(data.email, data.password);
      await authStore.login(data.email,data.password)
      navigate("/");
    } catch (error) {
      setError("root", {
        type: "manual",
        message: authStore.error || "Ошибка регистрации",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <div className="card-body">
          <h1 className="text-2xl font-bold text-center mb-6">Регистрация</h1>
          <form
            className="flex flex-col items-center space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {errors.root && (
              <div
                role="alert"
                className="alert alert-error alert-outline w-full max-w-xs"
              >
                <span>{errors.root.message}</span>
              </div>
            )}
            <div className="form-control w-full max-w-xs">
              <InputFiled1
                label="Почта"
                type="email"
                placeholder="Введите почту"
                error={errors.email?.message}
                registration={register("email")}
              />
              <InputFiled1
                label="Пароль"
                type="password"
                placeholder="Введите пароль"
                error={errors.password?.message}
                registration={register("password")}
              />
              <InputFiled1
                label="Почта"
                type="password"
                placeholder="Повторите пароль"
                error={errors.repeat_password?.message}
                registration={register("repeat_password")}
              />
            </div>
            <div className="form-control mt-6 w-full max-w-xs">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isSubmitting}
              >
                Зарегистрироваться
              </button>
            </div>
          </form>

          <div className="text-center mt-4">
            <span className="text-sm">Есть учетная запись? </span>
            <Link to="/login" className="link link-primary text-sm">
              Войти
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});
