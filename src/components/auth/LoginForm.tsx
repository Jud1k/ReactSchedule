import { useStores } from "@/root-store-context";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { auth } = useStores();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    auth.setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await auth.login(formData.email, formData.password);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <div className="card-body">
          <h1 className="text-2xl font-bold text-center mb-6">Вход</h1>

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
                type="email"
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

            <div className="form-control mt-6 w-full max-w-xs">
              <button type="submit" className="btn btn-primary w-full">
                Войти
              </button>
            </div>
          </form>

          <div className="text-center mt-4">
            <span className="text-sm">У вас нет аккаунта? </span>
            <Link to="/register" className="link link-primary text-sm">
              Регистрация
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
