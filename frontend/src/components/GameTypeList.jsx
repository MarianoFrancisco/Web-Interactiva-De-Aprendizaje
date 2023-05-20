import useGameTypes from "../hooks/useGameType";
import { useForm } from "react-hook-form";
export default function GameTypeList() {
  const { gameTypes, deleteGameType } = useGameTypes();
  const {register, handleSubmit, reset, formState: {errors}} = useForm({
    defaultValues:{
        name: '',
        description: '',
    }
  });

  const onSubmit = (data) => {
    // console.log(data);
  }
  
  return (
    <>
    <ul>
        {gameTypes.map(gameType => (
          <li key={gameType._id}>
            {`${gameType.name} ${gameType.description}` }
          </li>  
        ))}
    </ul>
    </>
  );
}
