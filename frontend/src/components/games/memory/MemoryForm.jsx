import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "../../form/Input";
import Button from "../../form/Button";
import GameDetail from "../GameDetail";
import useDetails from "../../../hooks/useDetail";
import useGames from "../../../hooks/useGame";
import Swal from 'sweetalert2';

export default function MemoryForm({ game }) {
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
    const detail = {
      first: data.first,
      second: data.second
    };
    detail.name = `${data.first} → ${data.second}`;
    addDetail(detail);
    reset();
  }

  const save = () => {
    if (details.length >= 5) {
      const gameDetails = details.map(({ name, ...rest }) => rest);
      game.data = gameDetails;
      insertGame(game);
      clearDetails();
      Swal.fire({
        icon: 'success',
        title: `El juego de memoria se ha creado con exito`,
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/profile/games');
    } else {
      Swal.fire({
        icon: 'error',
        title: `El juego de memoria necesita como minimo 5 parejas`,
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
          name="Parejas"
        />
      </div>
      <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-12">
              <div>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Detalle de Juego: Memoria
                </h2>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">
                  <div className="col-span-full">
                    <Input
                      label="Palabra"
                      type="text"
                      errors={errors}
                      id="first"
                      register={register("first", {
                        required: {
                          value: true,
                          message: "Debes ingresar una palabra",
                        },
                      })}
                    />
                  </div>

                  <div className="col-span-full">
                    <Input
                      label="Descripcion de la Palabra Ingresada"
                      type="text"
                      errors={errors}
                      id="second"
                      register={register("second", {
                        required: {
                          value: true,
                          message: "Debes ingresar una descripcion",
                        },
                      })}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Button
                  label="Agregar Pareja"
                  type="secondary"
                  onSubmit={handleSubmit(onSubmit)}
                />
              </div>
            </div>
          </form>
          <div className="space-y-2 mt-2">
            <Button label="Finalizar" onClick={() => save()} />
          </div>
        </div>
      </section>
    </>
  );
}
