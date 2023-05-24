import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../form/Button";
import TextArea from "../form/TextArea";
import useComments from "../../hooks/useComment";
import CommentItem from "./CommentItem";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

export default function Comment() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
    watch,
  } = useForm();
  const { comment, insertComment } = useComments();
  const navigate = useNavigate();
  const save = (data) => {

    insertComment(data);
    Swal.fire({
      icon: 'success',
      title: `Comentario agregado`,
      showConfirmButton: false,
      timer: 1500
    });
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };
  return (
    <>
      <section className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form method="POST" onSubmit={handleSubmit(save)} className="space-y-6">
            <div className="space-y-12">
              <div>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <img
                    className="mx-auto h-20 w-auto"
                    src="/logo.png"
                    alt="Gamificación"
                  />
                  <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    ESCRIBE TU COMENTARIO
                  </h2>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-full">
                    <TextArea
                      errors={errors}
                      id="text"
                      register={register("text", {
                        required: {
                          value: true,
                          message: "Debes ingresar tu comentario",
                        },
                      })}
                    />
                  </div>

                </div>
              </div>
              <div>
                <Button label="Comentar" />
              </div>
            </div>
          </form>
        </div><br></br>
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


