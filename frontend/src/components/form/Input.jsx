export default function Input({ id, label, type='text', register, errors,placeholder="" }) {
  return (
    <>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register}
          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
        />
      </div>
      {errors[id] && (
        <p className="mt-2 text-sm text-red-500">{errors[id].message}</p>
      )}
    </>
  );
}
