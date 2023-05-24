import { useEffect, useState } from "react";

export default function QuizResult({ answers = [], questions = [] }) {
  const [score, setScore] = useState();
  const evaluateAnswers = (questions, answers) => {
    let count = 0;

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const userAnswer = answers[i];

      if (question.correctAnswer === userAnswer) {
        count++;
      }
    }
    const score =
      questions.length === 0 ? 0 : Math.round((count / questions.length) * 100);
    return score;
  };

  useEffect(() => {
    setScore(evaluateAnswers(questions, answers));
    console.log(questions);
  }, []);
  return (
    <>
    <h1 className="mt-10 text-center text-4xl font-bold">Has Terminado el Juego</h1>
    <h1 className="mt-10 text-center text-2xl bg-emerald-100 font-bold leading-9 tracking-tight text-black-900">PUNTEO TOTAL:  {score}/100</h1>
    <br />
    <div className="flex justify-center items-center">
      <table className="table-fixed w-1/2" style={{ border: "1px solid black", borderRadius: "10px" }}>
        <thead>
          <tr>
            <th className="font-bold text-center border-b border-black-200 py-4" style={{ border: "1px solid black", borderRadius: "10px" }}>
              Pregunta
            </th>
            <th className="font-bold text-center border-b border-black-200 py-4" style={{ border: "1px solid black", borderRadius: "10px" }}>
              Tu respuesta
            </th>
            <th className="font-bold text-center border-b border-black-200 py-4" style={{ border: "1px solid black", borderRadius: "10px" }}>
              Respuesta correcta
            </th>
          </tr>
        </thead>
        <tbody>
          {questions.map((item, index) => (
            <tr key={index}>
              <td className="font-bold text-center border-b border-black-200 py-4" style={{ border: "1px solid black", borderRadius: "10px" }}>
                {item.question}
              </td>
              <td className="font-bold text-center border-b border-black-200 py-4" style={{ border: "1px solid black", borderRadius: "10px" }}>
                {answers[index]}
              </td>
              <td className="font-bold text-center border-b border-black-200 py-4" style={{ border: "1px solid black", borderRadius: "10px" }}>
              {item.correctAnswer}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
  );
}
