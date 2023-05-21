import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Input from "./form/Input";
import Button from "./form/Button";
import useUsers from "../hooks/useUsers";
import Select from "./form/Select";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{3,24}$/;
const FULLNAME_REGEX = /^(\S+\s\S+)(\s\S+)*$/;

const Register = ({
  admin = false,
  updateUser,
  setEdit,
  edit = {
    username: "",
    firstname: "",
    lastname: "",
    roles: {},
  },
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm();

  const { createNewUser } = useUsers();

  const onSubmit = (data) => {
    console.log(data);
    reset()
  };

  return (
    <>
      (
      <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-12">
              <div>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <img
                    className="mx-auto h-20 w-auto"
                    src="/logo.png"
                    alt="Gamificación"
                  />
                  {admin ? (
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                      {edit._id
                        ? `Editar cuenta de empleado`
                        : `Nueva cuenta de empleado`}
                    </h2>
                  ) : (
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                      Crea tu cuenta
                    </h2>
                  )}
                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-full">
                    <Input
                      label="Nombre completo"
                      type="text"
                      errors={errors}
                      id="fullname"
                      register={register("fullname", {
                        required: {
                          value: true,
                          message: "Debes ingresar tu nombre completo",
                        },
                        pattern: {
                          value: FULLNAME_REGEX,
                          message:
                            "Debes ingresar al menos 1 nombre y 1 apellido de minimo 2 caracteres",
                        },
                      })}
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <Input
                      label="Usuario"
                      type="text"
                      errors={errors}
                      id="username"
                      register={register("username", {
                        required: {
                          value: true,
                          message:
                            "Debes ingresar un username para registrarte",
                        },
                        pattern: {
                          value: USER_REGEX,
                          message:
                            "Debes ingresar un username de al menos 4 caracteres",
                        },
                      })}
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="rol"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      ¿Qué eres?
                    </label>
                    <div className="mt-2">
                      <Select data={[{
                        name: 'opcion1',
                        value: 1
                      },{
                        name: 'opcion2',
                        value: 2
                      }]}/>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <Input
                      label="Contraseña"
                      type="password"
                      errors={errors}
                      id="pwd"
                      register={register("pwd", {
                        required: {
                          value: true,
                          message:
                            "Debes ingresar una contraseña para registrarte",
                        },
                        pattern: {
                          value: PWD_REGEX,
                          message:
                            "Debes ingresar una contraseña de al menos 4 caracteres que incluya mayusculas, minusculas y numeros",
                        },
                      })}
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <Input
                      label="Confirmar contraseña"
                      type="password"
                      errors={errors}
                      id="pwdConfirm"
                      register={register("pwdConfirm", {
                        required: {
                          value: true,
                          message:
                            "Debes confirmar tu contraseña para registrarte",
                        },
                      })}
                    />
                  </div>
                </div>
              </div>
              <div>
                <Button label="Crear cuenta" />
              </div>
            </div>
          </form>

          {!admin && (
            <p className="mt-10 text-center text-sm text-gray-500">
              ¿Ya estas registrado?{" "}
              <Link
                to="/login"
                className="font-semibold leading-6 text-emerald-600 hover:text-emerald-500"
              >
                Inicia Sesión
              </Link>
            </p>
          )}
        </div>
      </section>
      )
    </>
  );
};

export default Register;
