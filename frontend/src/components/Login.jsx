import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useLogin from "../hooks/useLogin";
import Input from "./form/Input";
import Button from "./form/Button";
const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm();
  const { handleLogin, togglePersist } = useLogin();
  const onSubmit = (data) => {
    handleLogin(data.username, data.password).catch((res) => {
      setError("username", { message: res });
      setError("password", { message: res });
    });
    reset();
  };
  return (
    <section>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-20 w-auto"
            src="/logo.png"
            alt="Gamificacion"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Inicio de Sesión
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
            method="POST"
          >
            <div>
              <Input
                label="Usuario"
                type="text"
                errors={errors}
                id="username"
                register={register("username", {
                  required: {
                    value: true,
                    message: "Debes ingresar un username para ingresar",
                  },
                })}
              />
            </div>
            <div>
              <Input
                label="Contraseña"
                type="password"
                errors={errors}
                id="password"
                register={register("password", {
                  required: {
                    value: true,
                    message: "Ingresa tu contraseña para ingresar",
                  },
                })}
              />
            </div>
            <div>
              <Button label="Iniciar sesión" />
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            ¿No tienes cuenta?{" "}
            <Link
              to="/register"
              className="font-semibold leading-6 text-emerald-600 hover:text-emerald-500"
            >
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
