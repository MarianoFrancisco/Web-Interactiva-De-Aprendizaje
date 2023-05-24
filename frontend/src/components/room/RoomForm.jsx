import { useContext } from "react";
import Button from "../form/Button";
import AuthContext from "../../context/AuthProvider";
import Input from "../form/Input";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

export default function RoomForm() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
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
    reset();
    navigate(`/room/${data.code}`, { state: data });
  };
  return (
    <section>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
          <FontAwesomeIcon
            icon={faUsers}
            className="mx-auto h-20 w-auto text-emerald-900"
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
                  pattern: {
                    value: /^[A-z][A-z0-9-_]{3,23}$/,
                    message:
                      "Debes ingresar un username de al menos 4 caracteres",
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
                  pattern: {
                    value: /^\d{6}$/,
                    message: "El codigo es un numero de 6 digitos",
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
