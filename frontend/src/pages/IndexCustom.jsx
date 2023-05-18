import useAuth from "../hooks/useAuth"

export default function IndexCustom() {
  const {auth} = useAuth();
  console.log(auth)
    return (
    <div>Has iniciado sesión como <b>{auth.username || ' no tengo user'}</b> </div>
  )
}
