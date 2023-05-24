//use game_app_gt
db.createCollection("users");
db.createCollection("gametypes");
db.createCollection("details");
db.createCollection("games");
db.createCollection("results");
db.createCollection("comments");
db.createCollection("medals");

db.gametypes.insertMany([
  {
    name: "Memoria",
    description:
      "El juego de memoria es un clásico entretenido y desafiante que se puede jugar en una página web. El objetivo principal del juego es poner a prueba la memoria y la capacidad de concentración del jugador.",
  },
  {    
    name: "Ahorcado",
    description:
      "El juego del ahorcado es una variante del clásico en el que los jugadores intentan adivinar una palabra oculta. Tienen un número limitado de intentos antes de que se complete el dibujo de un ahorcado. El objetivo es adivinar las palabras antes de que se agoten los intentos y se complete el ahorcado.",
  },
  {
    name: "Preguntas y respuestas",
    description:
      "El juego de preguntas y respuestas es una actividad interactiva en la que se plantean preguntas y los jugadores intentan responderlas correctamente. Pueden abarcar diferentes temas y niveles de dificultad. El objetivo es responder la mayor cantidad de preguntas correctas y obtener la puntuación más alta.",
  },
  {
    name: "Descifrado",
    description:
      "El juego de Descifrado es un desafío en el que se presenta una palabra mezclada en letras al azar. El jugador debe descifrar la palabra y organizar las letras en el orden correcto para formar la palabra original. El objetivo es resolver el rompecabezas en el menor tiempo posible. ¡Demuestra tu habilidad para descifrar palabras!",
  },
]);
