import useResults from "../hooks/useResult";
import { useForm } from "react-hook-form";
export default function GameTypeList() {
  const { resultsForGame,resultsByUser, insertResult,deleteResult } = useResults();
  const {register, handleSubmit, reset, formState: {errors}} = useForm({
    defaultValues:{
        game_id: '',
        players: [],
    }
  });

  const onSubmit = (data) => {
    // console.log(data);
  }
  
  return (
    <>
    <ul>
        
    </ul>
    </>
  );
}
