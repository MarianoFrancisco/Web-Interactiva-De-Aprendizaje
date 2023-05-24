
export default function Home() {
  
  return (
    <><h1 className=" text-center text-5xl font-bold leading-9 text-gray-900 bg-yellow-300">
    GAME INTERACTIVE GT
  </h1><br/>
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
  <img src={`./FondoHome.jpg`} alt="Posicion" style={{ width: "1100px", height: "550px" }} />
</div><h1 className="mt-5 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900 bg-blue-300 " >
    ¿QUÉ PIENSAS HACER HOY?
  </h1>
    </>
  );
}