//use game_app_gt
db.createCollection("hangmans");
db.createCollection("games");
db.createCollection("gametypes");
db.createCollection("lettersoups");
db.createCollection("memories");
db.createCollection("quizzes");
db.createCollection("results");
db.createCollection("users");

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
    name: "Sopa de letras",
    description:
      "La sopa de letras es un juego en el que se presenta una cuadrícula de letras y se ocultan palabras dentro de ella. Los jugadores deben encontrar y marcar las palabras ocultas en la cuadrícula. Pueden estar dispuestas horizontalmente, verticalmente o en diagonal. El objetivo es encontrar todas las palabras en el menor tiempo posible.",
  },
]);
