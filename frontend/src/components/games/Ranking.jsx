import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useResults from "../../hooks/useResult";
import { useLocation, useParams } from "react-router-dom";

export default function Ranking() {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
    watch,
  } = useForm();
  const [ranking, setRanking] = useState(null);
  const { getResultsForGame } = useResults();
  const { game } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const rankigData = await getResultsForGame(game);
        setRanking(rankigData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, []);
  return !ranking ? (
    <h3>No hay ranking para mostrar</h3>
  ) : (
    <><h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black-900">
      RANKING
    </h2><br></br>
      <table className="table-fixed w-full" style={{ border: "1px solid black", borderRadius: "10px" }}>
        <thead>
          <tr>
            <th className="font-bold w-1/6 border-b border-black-200 py-4" style={{ border: "1px solid black", borderRadius: "10px" }}>POSICION</th>
            <th className="font-bold w-2/6 border-b border-black-200 py-4" style={{ border: "1px solid black", borderRadius: "10px" }}>
              NOMBRE
            </th>
            <th className="font-bold w-3/6 border-b border-black-200 py-4" style={{ border: "1px solid black", borderRadius: "10px" }}>
              PUNTEO
            </th>
          </tr>
        </thead>
        <tbody>
          {ranking.players.map((player) => (
            <tr key={player._id}>
              <td className="font-bold text-center border-b border-black-200 py-4" style={{ border: "1px solid black", borderRadius: "10px" }}>
                {player.position}
              </td>
              <td className="text-black-500 text-center border-b border-black-200 py-4" style={{ border: "1px solid black", borderRadius: "10px" }}>
                {player.player.username}
              </td>
              <td className="text-black-500 text-center border-b border-black-200 py-4" style={{ border: "1px solid black", borderRadius: "10px" }}>
                {player.score}
              </td>
            </tr>
          ))}
        </tbody>
      </table></>
  );
}