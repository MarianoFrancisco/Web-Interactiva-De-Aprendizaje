import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Input from "./form/Input";
import Button from "./form/Button";
import useUsers from "../hooks/useUsers";
import Select from "./form/Select";
import { useState } from "react";
import { ROLES } from "../App";
import { differenceInYears } from "date-fns";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{3,24}$/;
const FULLNAME_REGEX = /^(\S+\s\S+)(\s\S+)*$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Register = ({
  admin = false,
  updateUser,
  setEdit,
  edit = {
    username: "",
    fullname: "",
    email: '',
    birthdayDate: '',
    roles: {},
  },
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
    watch,
  } = useForm({
    defaultValues:{
      fullname: edit.fullname,
      username: edit.username,
      email: edit.email,
      birthdayDate: new Date(edit.birthdayDate).toLocaleDateString("en-CA")
    }
  });
  const roles = [
    {
      name: "Estudiante",
      value: { Student: ROLES.Student },
    },
    {
      name: "Profesor",
      value: { Teacher: ROLES.Teacher },
    },
  ];
  const [rol, setRol] = useState(
    admin ? { name: "Administrador", value: { Admin: ROLES.Admin } } : roles[0]
  );

  const { createNewUser } = useUsers();
  const navigate = useNavigate();

  if (admin) {
    roles.pop();
    roles.pop();
    roles.push({
      name: "Administrador",
      value: { Admin: ROLES.Admin },
    });
  }
  const validatePasswordMatch = (value) => {
    const password = watch("pwd", "");
    return value === password || "Las contraseñas no coinciden";
  };

  const validateBirthday = (value) => {
    const today = new Date();
    const birthday = new Date(value);
    const age = differenceInYears(today, birthday);
    return age >= 5 || "Debes tener al menos 5 años de edad";
  };

  const onSubmit = (data) => {
    data.roles = rol.value;
    data.password = data.pwd;
    if (edit._id) {
      data._id = edit._id;
      updateUser(data);
      reset();
      setEdit({});
      navigate("/users", { replace: true });
    } else {
      createNewUser(data).then(() => {
        reset();
        if (admin) {
          navigate("/users", { replace: true });
        } else {
          navigate("/login");
        }
      });
    }
  };

  return (
    <>
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

                  <div className="col-span-full">
                    <Input
                      label="Correo electónico"
                      type="text"
                      errors={errors}
                      id="email"
                      register={register("email", {
                        required: {
                          value: true,
                          message: "Debes ingresar tu email",
                        },
                        pattern: {
                          value: EMAIL_REGEX,
                          message: "Ingresa un email valido",
                        },
                      })}
                    />
                  </div>

                  <div className="col-span-full">
                    <Input
                      readOnly={edit._id ? true : false}
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
                    <Input
                      label="Fecha de nacimiento"
                      type="date"
                      errors={errors}
                      id="birthdayDate"
                      register={register("birthdayDate", {
                        required: {
                          value: true,
                          message:
                            "Debes ingresar tu fecha de nacimiento para registrarte",
                        },
                        validate: validateBirthday,
                      })}
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="rol"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      {admin ? `Rol` : `¿Qué eres?`}
                    </label>
                    <div className="mt-2">
                      <Select
                        data={roles}
                        selected={rol}
                        setSelected={setRol}
                      />
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
                          value: edit._id ? false : true,
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
                          value: edit._id ? false : true,
                          message:
                            "Debes confirmar tu contraseña para registrarte",
                        },
                        validate: validatePasswordMatch,
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
    </>
  );
};

export default Register;
