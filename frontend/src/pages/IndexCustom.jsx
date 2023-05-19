import useAuth from "../hooks/useAuth"

export default function IndexCustom() {
  const {auth} = useAuth();
  console.log(auth)
    return (
    <>
    <h1>Usuarios</h1>
    
    </>
  )
}
