import { useForm } from "react-hook-form";
import useUsers from "../hooks/useUsers";

export default function Profile() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setError,
        watch,
    } = useForm();
    const { user } = useUsers();
    console.log(user.length);
    return !user ? (
        <h3>No hay usuario para mostrar</h3>
    ) : (
        <>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black-900">
                PERFIL
            </h2><span className=" text-sm p-1 rounded-lg flex items-center justify-center">
            <img src={`./Profile.png`} alt="Posicion" style={{ width: "200px", height: "200px" }}/></span>
            <br /><table className="table-fixed w-full" style={{ border: "1px solid black", borderRadius: "10px" }}>
                <tbody>
                    <tr>
                        <td className="font-bold text-center border-b border-black-200 py-4" style={{ border: "1px solid black", borderRadius: "10px" }}>
                            <label className="font-bold">Nombre completo</label>
                        </td>
                        <td className="font-bold text-center border-b border-black-200 py-4" style={{ border: "1px solid black", borderRadius: "10px" }}>
                            <span className="bg-emerald-100 text-sm p-1 rounded-lg">{user.fullname}</span>
                        </td>
                    </tr>
                    <tr>
                        <td className="font-bold text-center border-b border-black-200 py-4" style={{ border: "1px solid black", borderRadius: "10px" }}>
                            <label className="font-bold">Nombre de usuario</label>
                        </td>
                        <td className="font-bold text-center border-b border-black-200 py-4" style={{ border: "1px solid black", borderRadius: "10px" }}>
                            <span className="bg-emerald-100 text-sm p-1 rounded-lg">{user.username}</span>
                        </td>
                    </tr>
                    <tr>
                        <td className="font-bold text-center border-b border-black-200 py-4" style={{ border: "1px solid black", borderRadius: "10px" }}>
                            <label className="font-bold">Correo electrónico</label>
                        </td>
                        <td className="font-bold text-center border-b border-black-200 py-4" style={{ border: "1px solid black", borderRadius: "10px" }}>
                            <span className="bg-emerald-100 text-sm p-1 rounded-lg">{user.email}</span>
                        </td>
                    </tr>
                    <tr>
                        <td className="font-bold text-center border-b border-black-200 py-4" style={{ border: "1px solid black", borderRadius: "10px" }}>
                            <label className="font-bold">Fecha de nacimiento</label>
                        </td>
                        <td className="font-bold text-center border-b border-black-200 py-4" style={{ border: "1px solid black", borderRadius: "10px" }}>
                            <span className="bg-emerald-100 text-sm p-1 rounded-lg">{user.birthdayDate}</span>
                        </td>
                    </tr>
                </tbody>
            </table>

        </>
    );
}