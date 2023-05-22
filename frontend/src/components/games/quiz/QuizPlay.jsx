import { useState, useEffect } from "react";

export default function QuizPlay({
  questions = [
    {
      id: "518b0a27-aed4-4d26-8415-e48c4d9200d7",
      question: "pregunta 1",
      correctAnswer: "asdf",
      answers: ["asdf1111", "asdf"],
      name: "pregunta 1",
    },
    {
      id: "4da1baa5-5b9e-4ba1-a492-0204801fa50e",
      question: "pregunta 2",
      correctAnswer: "2222",
      answers: ["asdf2", "2222"],
      name: "pregunta 2",
    },
    {
      id: "07178ae4-e3e2-4cd1-a298-138722110642",
      question: "asdf",
      correctAnswer: "asdf",
      answers: ["asdf", "asdf", "asdf", "asdf"],
      name: "asdf",
    },
    {
      id: "396dd744-a11b-4b61-95d5-d154afa090d1",
      question: "asdf",
      correctAnswer: "asdf33333",
      answers: ["asdf", "asdf", "asdf", "asdf33333"],
      name: "asdf",
    },
  ],
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  useEffect(() => {
    setIsAnswered(false);
    setShowCorrectAnswer(false);
  }, [currentQuestion]);

  const handleAnswerChange = (e) => {
    const selectedAnswer = e.target.value;
    setAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
    setIsAnswered(true);
    setShowCorrectAnswer(
      selectedAnswer === questions[currentQuestion].correctAnswer
    );
  };

  const handleNextQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

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
