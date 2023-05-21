import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useGame from "../../hooks/useGame";
import TextArea from "../form/TextArea";
import useGameTypes from "../../hooks/useGameType";
import Input from "../form/Input";
import Select from "../form/Select";
import Button from "../form/Button";
import { useNavigate } from "react-router-dom";

export default function GameForm({ edit = {} }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
    watch,
  } = useForm();

  const { insertGame } = useGame();
  const { gameTypes } = useGameTypes();
  const gameTypesMap = gameTypes.map((type) => ({
    name: type.name,
    value: type._id,
  }));
  const [showDetail, setShowDetail] = useState(false);
  const [gameType, setGameType] = useState({ name: "Selecciona" });
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    data.game_type = gameType.value;
    const insertedGame = await insertGame(data);
    console.log(insertedGame._id);
  };
  if (showDetail) {
    
  }
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
                  <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    {edit._id ? `Editar juego` : `Nuevo juego`}
                  </h2>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-full">
                    <Input
                      label="Título del juego"
                      type="text"
                      errors={errors}
                      id="name"
                      register={register("name", {
                        required: {
                          value: true,
                          message: "Debes ingresar un titulo",
                        },
                      })}
                    />
                  </div>

                  <div className="col-span-full">
                    <TextArea
                      label="Descripción"
                      errors={errors}
                      id="description"
                      register={register("description", {
                        required: {
                          value: true,
                          message: "Debes ingresar tu description",
                        },
                      })}
                    />
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="rol"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Tipo de juego
                    </label>
                    <div className="mt-2">
                      <Select
                        data={gameTypesMap}
                        selected={gameType}
                        setSelected={setGameType}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Button label="Crear juego" />
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
