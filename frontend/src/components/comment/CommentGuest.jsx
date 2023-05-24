import { useForm } from "react-hook-form";
import useComments from "../../hooks/useComment";
import CommentItem from "./CommentItem";

export default function Comment() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
    watch,
  } = useForm();
  const { comment} = useComments();
  return (
    <>
      <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="bg-gray-100 min-h-full"><h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          COMENTARIOS DE USUARIOS
        </h2>
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {comment.map((item) => (
                <CommentItem
                  key={item._id}
                  comment={item}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


