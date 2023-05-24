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
    const {getResultsForGame} = useResults();
    const {game} = useParams();

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
        <h3>No hya ranking para mostrar</h3>
    ): (
        <>
        <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="bg-gray-100 min-h-full">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    RANKING
                </h2>
            <p>{ranking ? ranking._id : 'no hay'}</p>
            </div>
        </section>
    </>
    )
}