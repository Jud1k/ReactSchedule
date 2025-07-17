import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStores } from "@/root-store-context";
import { observer } from "mobx-react-lite";

export default observer(function RegisterForm() {
  const { auth } = useStores();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeat_password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    auth.setError(null)
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await auth.register(formData.email, formData.password);
    await auth.login(formData.email,formData.password);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <div className="card-body">
          <h1 className="text-2xl font-bold text-center mb-6">Регистрация</h1>
          {auth.error && (
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{auth.error}</span>
            </div>
          )}
          <form
            className="flex flex-col items-center space-y-4"
            onSubmit={handleSubmit}
          >
            <div className="form-control w-full max-w-xs">
              <label className="label" htmlFor="email">
                <span className="label-text text-lg font-bold">Почта</span>
              </label>
              <input
                id="email"
                type="text"
                placeholder="Введите почту"
                className="input input-bordered w-full"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label text-lg" htmlFor="password">
                <span className="label-text text-lg font-bold">Пароль</span>
              </label>
              <input
                id="password"
                type="password"
                placeholder="Введите пароль"
                className="input input-bordered w-full"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label text-lg">
                <span className="label-text text-lg font-bold">
                  Повторите пароль
                </span>
              </label>
              <input
                id="repeat_password"
                type="password"
                placeholder="Введите пароль"
                className="input input-bordered w-full"
                required
                value={formData.repeat_password}
                onChange={handleChange}
              />
            </div>
            <div className="form-control mt-6 w-full max-w-xs">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={auth.isLoading}
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
