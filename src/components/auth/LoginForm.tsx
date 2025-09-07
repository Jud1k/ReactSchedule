import { useStores } from "@/root-store-context";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { LoginFormData, loginFormSchema } from "@/schemas/forms/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputFiled1 } from "../generic/InputFiled1";

export default function LoginForm() {
  const { authStore } = useStores();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    try{
      await authStore.login(data.email, data.password);
      navigate("/");
    }catch(error){
      setError("root",{
        type:"manual",
        message:authStore.error||"Ошибка авторизации"
      })
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <div className="card-body">
          <h1 className="text-2xl font-bold text-center mb-6">Вход</h1>
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
            <div className="form-control mt-6 w-full max-w-xs">
              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isSubmitting}
              >
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
