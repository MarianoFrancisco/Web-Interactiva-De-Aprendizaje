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

    return (
        <>
            <Button label="IR A RANKING" onClick={
                async () => {
                    navigate('/ranking', {
                        state: getResultsForGame("646d90b1b6cf6f19d29669e8")
                    })
                }} />
        </>
    );
}