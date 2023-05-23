import { useState, useEffect } from "react";
import { set } from "react-hook-form";
import Swal from 'sweetalert2';
export default function HangmanPlay({
  questions = [],
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [words, setWords] = useState([]);
  const [wrongs, setWrong] = useState(0);
  const [isWord, setIsWord] = useState(false);

  useEffect(() => {
    setIsWord(false);
  }, [currentQuestion]);
  const emptyChange = () => {
    setIsWord(true);
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
    questions.map((question, index) => {
      if (question.word == words[index]) {
        console.log(`${index + 1}: acertó`);
      } else {
        console.log(`${index + 1}: falló`)
      }
    })
    if (wrongs > 0) { console.log("Tuvo errores"); }
    console.log(words)
    return (<div>{wrongs === 5 ? (
      <div className="flex justify-center items-center">
        <img src={`/hangman/Hangman-6.jpg`} alt="Imagen" />
      </div>) : (<div className="flex justify-center items-center">
        <img src={`/hangman/Hangman-${wrongs}.jpg`} alt="Imagen" />
      </div>)}<div className="flex justify-center items-center">
      <p>Se ha terminado el juego</p></div></div>);
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
        <label htmlFor="wordInput">Adivina la palabra:</label>
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
