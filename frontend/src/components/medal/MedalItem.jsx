export default function CommentItem({ medal }) {
  let positionText;
  switch (medal.position) {
    case "1":
      positionText = '"Siempre llega primero"';
      break;
    case "2":
      positionText = '"El segundo, casi te gano"';
      break;
    case "3":
      positionText = '"El tercero, al menos tuve medalla"';
      break;
    default:
      positionText = "s";
  }
  return (
    <div className="group bg-white p-3 rounded-xl flex flex-col">
      <div>
      <br></br>
      <span className=" text-sm p-1 rounded-lg flex items-center justify-center">
        <img src={`./medal/${medal.position}.jpg`} alt="Posicion" className="w-20 h-20 object-contain"/>
        </span>
        <br></br>
        <span className="bg-blue-100 text-sm p-1 rounded-lg">
        {medal.user.username} : {positionText}
        </span>
        <h3 className="mt-4 text-sm text-gray-700">{medal.medal_date}</h3>
      </div>
      <div className="flex justify-between mt-auto">
        <div className="text-lg font-medium text-gray-900">
          Obtenido en: {medal.game_type.name}
        </div>
      </div>
    </div>
  );
}
