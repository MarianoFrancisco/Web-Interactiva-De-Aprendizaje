import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../form/Input";
import Button from "../../form/Button";

export default function HangmanForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
    watch,
  } = useForm();

  const [addQuestion, setAddQuestion] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-12">
              <div>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Detalle de Juego: Ahorcado
                </h2>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">
                  <div className="col-span-full">
                    <Input
                      label="Pregunta"
                      type="text"
                      errors={errors}
                      id="question"
                      placeholder="Ingresa la pregunta a realizar"
                      register={register("question", {
                        required: {
                          value: true,
                          message: "Debes ingresar una pregunta",
                        },
                      })}
                    />
                  </div>

                  <div className="col-span-full">
                    <Input
                      label="Palabra"
                      type="text"
                      errors={errors}
                      id="word"
                      placeholder="Ingresa la palabra que concida con la pregunta ingresada"
                      register={register("word", {
                        required: {
                          value: true,
                          message: "Debes ingresar una palabra",
                        },
                      })}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Button label="Agregar" />
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
