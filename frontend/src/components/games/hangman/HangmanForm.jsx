import { useForm } from "react-hook-form";
import Input from "../../form/Input";
import Button from "../../form/Button";
import GameDetail from "../GameDetail";
import useDetails from "../../../hooks/useDetail";
import useGames from "../../../hooks/useGame";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { useState, useEffect } from "react";

export default function HangmanForm({ game}) {
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
  const { details, addDetail, clearDetails, removeFromDetails } = useDetails();

  const onSubmit = (data) => {
    const detail = { question: data.question, word: data.word }
    detail.name = data.question;
    addDetail(detail);
    Swal.fire({
      icon: 'success',
      title: `${detail.name} agregado exitosamente al juego, actualmente hay: ${details.length+1} preguntas`,
      showConfirmButton: false,
      timer: 1000
    });
    reset();
  };
  const save = () => {
    if (details.length >= 7) {
      const gameDetails = details.map(({ name, ...rest }) => rest); // Elimina la propiedad 'name' de cada objeto
      game.data = gameDetails;
      insertGame(game);
      clearDetails();
      Swal.fire({
        icon: 'success',
        title: `Nuevo juego ${game.name} creado exitosamente`,
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/profile/games');
    } else {
      Swal.fire({
        icon: 'error',
        title: `Necesitas un mínimo de 7 preguntas para crear el juego : ${game.name}`,
        showConfirmButton: false,
        timer: 1500
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
          name="Preguntas"
        />
      </div>
      <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form method="POST" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                        },pattern:{value:/^\S+$/, message:"Solo debes escribir una palabra"},
                      })}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Button label="Agregar pregunta"
                  type="secondary" onClick={handleSubmit(onSubmit)}/>
              </div>
            </div>
          </form>
          <br></br>
          <div className="space-y-2">
            <Button label="Finalizar" onClick={() => save()}/>
          </div>
        </div>
      </section>
    </>
  );
}
