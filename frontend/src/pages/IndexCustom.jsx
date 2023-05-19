import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import useUsers from "../hooks/useUsers";

export default function IndexCustom() {
  const { auth } = useAuth();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { users, createNewUser } = useUsers();
  const onSubmit = (data) => {
    console.log(data);
    data.roles = {Admin: 5002}
    createNewUser(data);
  };
  return (
    <>
      <h1>Usuarios</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="fullname"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Nombre completo
          </label>
          <input
            id="fullname"
            type="text"
            {...register("fullname")}
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            {...register("username")}
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div>
          <label
            htmlFor="birthdayDate"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            birthdayDate
          </label>
          <input
            id="birthdayDate"
            type="date"
            {...register("birthdayDate")}
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          crear usuario
        </button>
      </form>

      <ul className="py-10">
        {users.map((user) => (
          <li key={user._id}>{user.fullname}</li>
        ))}
      </ul>
    </>
  );
}
