import { useParams } from "react-router-dom";
import useDetails from "../../hooks/useDetail";
import { useForm } from "react-hook-form";

export default function GameDetail() {
  const { details, getDetail, editDetail } = useDetails();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      data: [],
    },
  });

  const { id } = useParams();

  const onSubmit = (data) => {
    // console.log(data);
  };

  return (
    <>
      <ul></ul>
    </>
  );
}
