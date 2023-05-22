import { useState, useEffect } from "react";

export default function QuizPlay({
  questions = [],
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    setIsAnswered(false);
  }, [currentQuestion]);

  const handleAnswerChange = (e) => {
    const selectedAnswer = e.target.value;
    setAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };
  if (questions.length === 0) {
    console.log(answers)
    return <p>No hay preguntas para mostrar</p>;
  }
  if (currentQuestion === questions.length) {
    console.log(answers)
    return <p>Se ha terminado el juego</p>;
  }

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  return (
    <div className="w-3/4 mt-14 md:w-1/2 mx-auto">
<div className="card h-32 rounded-lg text-center bg-amber-500 p-4 mb-4 flex items-center justify-center">
  <h3 className="text-xl font-bold text-white">{question.question}</h3>
</div>


      <div className="flex flex-wrap md:justify-between">
        {question.answers.map((answer, index) => {
          const isCorrectAnswer = question.correctAnswer === answer;
          const isSelectedAnswer = answers[currentQuestion] === answer;
          let answerColor = "bg-teal-500";

          if (isSelectedAnswer) {
            answerColor = isCorrectAnswer ? "bg-green-200" : "bg-red-200";
          }

          return (
            <div key={index} className={`card w-full p-4 mb-2 md:mb-4 rounded-lg ${answerColor}`}>
              <input
                type="radio"
                name={`answer_${currentQuestion}`}
                value={answer}
                onChange={handleAnswerChange}
                checked={isSelectedAnswer}
                disabled={isAnswered}
              />
              <label className="ml-2">{answer}</label>
            </div>
          );
        })}
      </div>
      <button
        className="bg-emerald-400 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
        onClick={handleNextQuestion}
        disabled={!isAnswered}
      >
        {isLastQuestion ? "Terminar" : "Siguiente"}
      </button>
    </div>
  );
}
