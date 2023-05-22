import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../form/Input";
import Button from "../../form/Button";
import GameDetail from "../GameDetail";
import useDetails from "../../../hooks/useDetail";
import useGames from "../../../hooks/useGame";
import { useNavigate } from "react-router-dom";

export default function QuizForm({game}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
    watch,
  } = useForm();
  const { insertGame } = useGames();
  const navigate = useNavigate();
  const [addQuestion, setAddQuestion] = useState(false);
  const { details, addDetail, clearDetails, removeFromDetails } = useDetails();

  const onSubmit = (data) => {
    const detail = { question: data.question }
    detail.answers = [];
    detail.answers.push({ answer: data.answer1 });
    detail.answers.push({ answer: data.answer2 });
    if (data.answer3) {
      detail.answers.push({ answer: data.answer3 });
    }
    if (data.answer4) {
      detail.answers.push({ answer: data.answer4 });
    }
    detail.name = data.question;
    addDetail(detail);
    reset();
  };
  const save = () => {
    game.data = details
    insertGame(game);
    clearDetails();
    navigate('/my-games');
  };
  return (
    <>
      <div>
        <GameDetail
          clearDetails={clearDetails}
          details={details}
          removeFromDetails={removeFromDetails}
          name="preguntas"
        />
      </div>
      <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form method="post" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-12">
              <div>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Detalle de Quiz
                </h2>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">
                  <div className="col-span-full">
                    <Input
                      label="Pregunta"
                      type="text"
                      errors={errors}
                      id="question"
                      register={register("question", {
                        required: {
                          value: true,
                          message: "Debes ingresar una pregunta",
                        },
                      })}
                    />
                  </div>

                  <div className="sm:col-span-4">
                    <Input
                      label="Respuesta"
                      type="text"
                      errors={errors}
                      id="answer1"
                      register={register("answer1", {
                        required: {
                          value: true,
                          message: "Debes ingresar una respuesta",
                        },
                      })}
                    />
                  </div>
                  <div className="sm:col-span-4">
                    <Input
                      label="Respuesta"
                      type="text"
                      errors={errors}
                      id="answer2"
                      register={register("answer2", {
                        required: {
                          value: true,
                          message: "Debes ingresar una respuesta",
                        },
                      })}
                    />
                  </div>
                  {addQuestion && (
                    <>
                      <div className="sm:col-span-4">
                        <Input
                          label="Respuesta"
                          type="text"
                          errors={errors}
                          id="answer3"
                          register={register("answer3")}
                        />
                      </div>
                      <div className="sm:col-span-4">
                        <Input
                          label="Respuesta"
                          type="text"
                          errors={errors}
                          id="answer4"
                          register={register("answer4")}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Button
                  label="Agregar pregunta"
                  type="secondary"
                  onSubmit={handleSubmit(onSubmit)}
                />
              </div>
            </div>
          </form>
          <div className="py-2 space-y-2">
            <Button
              label="Añadir respuestas"
              type="secondary"
              onClick={() => setAddQuestion((prev) => !prev)}
            />
            <Button label="Finalizar" onClick={() => save()} />
          </div>
        </div>
      </section>
    </>
  );
}
