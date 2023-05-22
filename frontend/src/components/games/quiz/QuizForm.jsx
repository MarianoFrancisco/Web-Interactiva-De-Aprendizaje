import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../form/Input";
import Button from "../../form/Button";
import GameDetail from "../GameDetail";
import useDetails from "../../../hooks/useDetail";
import useGames from "../../../hooks/useGame";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function QuizForm({ game }) {
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
  const [correctAnswer, setCorrectAnswer] = useState("");
  const { details, addDetail, clearDetails, removeFromDetails } = useDetails();

  const onSubmit = (data) => {
    if (correctAnswer === "") {
      Swal.fire({
        icon: "error",
        title: `Necesitas seleccionar una respuesta correcta para la pregunta`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      const detail = { question: data.question };
      detail.correctAnswer = correctAnswer;
      detail.answers = [];
      detail.answers.push(data.answer1);
      detail.answers.push(data.answer2);
      if (data.answer3) {
        detail.answers.push(data.answer3);
      }
      if (data.answer4) {
        detail.answers.push(data.answer4);
      }
      detail.name = data.question;
      addDetail(detail);
      setCorrectAnswer("");
      reset();
    }
  };
  const save = () => {
    if (details.length >= 5) {
      game.data = details;
      insertGame(game);
      clearDetails();
      Swal.fire({
        icon: "success",
        title: `Nuevo juego de preguntas y respuestas creado exitosamente`,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/profile/games");
    } else {
      Swal.fire({
        icon: "error",
        title: `Necesitas un mínimo de 5 preguntas para crear el juego`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
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
          <form
            method="post"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="space-y-12">
              <div>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Detalle de Quiz
                </h2>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">
                  <div className="col-span-full">
                    <div>
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
                  </div>

                  <div className="sm:col-span-4">
                    <div className="flex">
                      <input
                        type="radio"
                        id="chekAnswer1"
                        name="correctAnswer"
                        value={watch("answer1")}
                        className="mr-2"
                        onChange={() => setCorrectAnswer(watch("answer1"))}
                      />

                      <div>
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
                    </div>
                  </div>
                  <div className="sm:col-span-4">
                    <div className="flex">
                      <input
                        type="radio"
                        id="chekAnswer2"
                        name="correctAnswer"
                        value={watch("answer2")}
                        className="mr-2"
                        onChange={() => setCorrectAnswer(watch("answer2"))}
                      />

                      <div>
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
                    </div>
                  </div>
                  {addQuestion && (
                    <>
                      <div className="sm:col-span-4">
                        <div className="flex">
                          <input
                            type="radio"
                            id="chekAnswer3"
                            name="correctAnswer"
                            value={watch("answer3")}
                            className="mr-2"
                            onChange={() => setCorrectAnswer(watch("answer3"))}
                          />

                          <div>
                            <Input
                              label="Respuesta"
                              type="text"
                              errors={errors}
                              id="answer3"
                              register={register("answer3")}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="sm:col-span-4">
                        <div className="flex">
                          <input
                            type="radio"
                            id="chekAnswer4"
                            name="correctAnswer"
                            value={watch("answer4")}
                            className="mr-2"
                            onChange={() => setCorrectAnswer(watch("answer4"))}
                          />

                          <div>
                            <Input
                              label="Respuesta"
                              type="text"
                              errors={errors}
                              id="answer4"
                              register={register("answer4")}
                            />
                          </div>
                        </div>
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
