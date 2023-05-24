import { useContext } from "react";
import Button from "../form/Button";
import AuthContext from "../../context/AuthProvider";
import Input from "../form/Input";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function RoomForm() {
  const { auth } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      username: auth.username || "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
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
            Unirme a una sala
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
                readOnly={auth.username ? true : false}
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
                label="Código"
                errors={errors}
                id="code"
                register={register("code", {
                  required: {
                    value: true,
                    message: "Ingresa un codigo para ingresar",
                  },
                })}
              />
            </div>
            <div>
              <Button>Unirme</Button>
            </div>
          </form>
          {!auth.username && (
            <p className="mt-10 text-center text-sm text-gray-500">
              ¿No tienes cuenta?{" "}
              <Link
                to="/register"
                className="font-semibold leading-6 text-emerald-600 hover:text-emerald-500"
              >
                Regístrate
              </Link>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
