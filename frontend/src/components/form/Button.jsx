export default function Button({ label = "label", type = 'primary', onClick=undefined }) {
  let buttonStyle = "flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600";

  if (type === 'primary') {
    buttonStyle += " bg-emerald-600 text-white";
  } else if (type === 'secondary') {
    buttonStyle += " border-2 border-emerald-600 text-emerald-600";
  }

  return (
    <button className={buttonStyle} onClick={onClick}>
      {label}
    </button>
  );
}
