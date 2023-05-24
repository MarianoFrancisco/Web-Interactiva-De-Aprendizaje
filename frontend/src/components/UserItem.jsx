import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserItem({ user, deleteUser, setEdit }) {
  const role = 'Admin';
  return (
    <div className="group bg-white p-3 rounded-xl flex flex-col">
      <div>
        <span className="bg-emerald-100 text-sm p-1 rounded-lg">{role}</span>
        <h3 className="mt-4 text-sm text-gray-700">{`@${user.username}`}</h3>
      </div>
      <div className="flex justify-between mt-auto">
        <div className="text-lg font-medium text-gray-900">
          {user.fullname}
        </div>
        <div className="space-x-1">
          <button
            className="items-center justify-center rounded-md border border-transparent bg-emerald-600 p-1 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            onClick={() => setEdit(user)}
          >
            <FontAwesomeIcon icon={faPenToSquare} className="block h-6 w-6" />
          </button>
          <button
            onClick={() => deleteUser({ id: user._id })}
            className="items-center justify-center rounded-md border border-transparent bg-rose-600 p-1 text-base font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
          >
            <FontAwesomeIcon icon={faTrash} className="block h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
