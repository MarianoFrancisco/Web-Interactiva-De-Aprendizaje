import { useState, useEffect,useContext } from "react";
import React, { useRef } from "react";
import AuthContext from "../../../context/AuthProvider";
import { set } from "react-hook-form";
import Swal from 'sweetalert2';
import useGameTypes from "../../../hooks/useGameType";
import useMedals from "../../../hooks/useMedal";


export default function HangmanPlay({
  questions = [],
}) {
  const medalSavedRef = useRef(false);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [words, setWords] = useState([]);
  const [wrongs, setWrong] = useState(0);
  const [isWord, setIsWord] = useState(false);
  const { gameTypes } = useGameTypes();
  const { insertMedal } = useMedals();
  const { auth } = useContext(AuthContext);
  const medalSaved = useState(false);

  useEffect(() => {
    setIsWord(false);
  }, [currentQuestion]);
  const saveMedal = (position,game_type) => {
    const medal={position:position,game_type:game_type};
    insertMedal(medal);
    console.log(medal);
  };
  const emptyChange = (input) => {
    const isValid = /^\S+$/.test(input.target.value); // Verificar si es una sola palabra válida
    setIsWord(isValid);
  };
  const handleWord = (input) => {
    const inputWord = input.value;
    setWords((prevAnswers) => [...prevAnswers, inputWord]);
    if (questions[currentQuestion].word == inputWord) {
      Swal.fire({
        icon: 'success',
        title: `Acertaste, la palabra si era: ${questions[currentQuestion].word}`,
        showConfirmButton: false,
        timer: 1000
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: `Fallaste, ingresate: ${inputWord} y la palabra era: ${questions[currentQuestion].word}`,
        showConfirmButton: false,
        timer: 1000
      });
      setWrong(wrongs + 1);
      if (wrongs === 5) {
        setWrong(5);
        setCurrentQuestion(questions.length - 1);
      }
    }
    document.getElementById("wordInput").value = "";

  };
  //pasar al siguiente
  const handleNextQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };
  //si hay 0 preguntas
  if (questions.length === 0) {
    console.log(words)
    return <p>No hay preguntas para mostrar</p>;
  }
  //si hay mas de 0 preguntas
  if (currentQuestion === questions.length) {
    let allPoints = 100 * questions.length;
    let myPoints = 0;
    let game_type="";
    
    const pointsArray = [];
    questions.map((question, index) => {
      if (question.word == words[index]) {
        pointsArray.push(100);
        myPoints = myPoints + 100;
      } else {
        pointsArray.push(0);
      }
    })
    gameTypes.map((gameTypes, index) => {
      if (gameTypes.name == "Ahorcado") {
        game_type=gameTypes._id;
      }
    })
    let obtainMedal=(allPoints-myPoints);
    let myMedal;
    return (<div>{wrongs === 5 ? (
      <div className="flex justify-center items-center">
        <img src={`/hangman/Hangman-6.jpg`} alt="Imagen" />
      </div>) : (<div className="flex justify-center items-center">
        <img src={`/hangman/Hangman-${wrongs}.jpg`} alt="Imagen" />
      </div>)}<h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black-900">Has terminado, datos del juego:</h1>
      <div><h1 className="mt-10 text-center text-2xl bg-emerald-100 font-bold leading-9 tracking-tight text-black-900">PUNTEO TOTAL: {myPoints} / {allPoints}</h1></div>
      <br />
      <div className="flex justify-center items-center">
        <table className="table-fixed w-full" style={{ border: "1px solid black", borderRadius: "10px" }}>
          <tbody>
            {questions.map((question, index) => (<>
              <tr key={index}>
                <td className="font-bold text-center border-b border-black-200 py-4" style={{ border: "1px solid black", borderRadius: "10px" }}>
                  {(index + 1)}
                  <br /></td>
                <td className="font-bold text-center border-b border-black-200 py-4" style={{ border: "1px solid black", borderRadius: "10px" }}>
                  Palabra ingresada: {words[index]}
                  <br /></td><td className="font-bold text-center border-b border-black-200 py-4" style={{ border: "1px solid black", borderRadius: "10px" }}>
                  Respuesta: {question.word}
                  <br /></td><td className="font-bold text-center border-b border-black-200 py-4" style={{ border: "1px solid black", borderRadius: "10px" }}>
                  <span className="bg-blue-100 text-sm p-1 rounded-lg">PUNTOS:{pointsArray[index]}</span>
                  <br /></td>
              </tr>  {/* Salto de línea */}</>
            ))}</tbody></table>
      </div>
      {auth.username != null && !medalSavedRef.current && (
      <>
        {obtainMedal === 0 && (
          <div>
            {myMedal = "1"}
            {saveMedal(myMedal, game_type)}
          </div>
        )}
        {obtainMedal === 100 && (
          <div>
            {myMedal = "2"}
            {saveMedal(myMedal, game_type)}
          </div>
        )}
        {obtainMedal === 200 && (
          <div>
            {myMedal = "3"}
            {saveMedal(myMedal, game_type)}
          </div>
        )}
        {medalSavedRef.current = true}
      </>
    )}
      </div>);
  }
  //variables para ultima pregunta y para ver que pregunta estamos
  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  return (

    <div className="w-3/4 mt-14 md:w-1/2 mx-auto">
      <div className="flex justify-center items-center">
        <img src={`/hangman/Hangman-${wrongs}.jpg`} alt="Imagen" />
      </div><br></br>
      <div className="card h-32 rounded-lg text-center bg-amber-500 p-4 mb-4 flex items-center justify-center">
        <h3 className="text-xl font-bold text-white">{question.question}</h3>
      </div>
      <div className="flex flex-wrap md:justify-between  bg-blue-200 rounded-md p-4 " >
        <label htmlFor="wordInput">Escribe la palabra de {question.word.length} {question.word.length === 1 ? "letra:" : "letras:"}</label>
        <input
          type="text"
          id="wordInput"
          onChange={emptyChange}
        />
      </div><br></br><div className="flex justify-center items-center">
        <button
          className="bg-emerald-400 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
          onClick={() => {
            handleWord(document.getElementById("wordInput"));
            handleNextQuestion();
          }}
          disabled={!isWord}
        >
          {isLastQuestion || wrongs == 6 ? "Terminar" : "Siguiente"}
        </button></div>
    </div>
  );
}
