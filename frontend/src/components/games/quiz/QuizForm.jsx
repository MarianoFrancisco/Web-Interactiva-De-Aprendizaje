import React from "react";
import { useForm } from "react-hook-form";
import Input from "../../form/Input";
import Button from "../../form/Button";

export default function QuizForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
    watch,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-12">
            <div className="flex justify-between">
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
                    })}
                  />
                </div>
              </div>
              <div>
                <Button label="Crear cuenta" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
