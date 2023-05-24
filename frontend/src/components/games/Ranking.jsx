import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useResults from "../../hooks/useResult";
import { useLocation } from "react-router-dom";

export default function Ranking({}) {
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setError,
        watch,
    } = useForm();
    const {state:ranking}=useLocation();
    //const { resultsForGame} = useResults();
    //const [ranking, setRanking] = useState([]);
    return (
        <>
            <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="bg-gray-100 min-h-full">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        RANKING
                    </h2>
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                        {ranking.length}
                    </div>
                </div>
            </section>
        </>
    );
}