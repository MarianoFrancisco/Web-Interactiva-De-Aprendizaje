import { useForm } from "react-hook-form";
import useResults from "../../hooks/useResult";
import { useNavigate } from "react-router-dom";
import Button from "../form/Button";
import { useEffect } from "react";

export default function Ranking() {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setError,
        watch,
    } = useForm();
    const { resultsForGame, getResultsForGame } = useResults();
    const navigate = useNavigate();
    const goToRankig = () => {
        navigate(`/ranking/${`646da997a4c22b344ecbd553`}`)
    }

    return (
        <>
            <Button label="IR A RANKING" onClick={() => goToRankig()} />
        </>
    );
}