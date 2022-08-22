import React, { useState, useEffect } from "react";
import Questions from "./Questions.js";

function App() {
  const [actualQuestion, setActualQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinish, setIsFinish] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [areDisabled, setAreDisabled] = useState(false);
  const [answerShow, setAnswerShow] = useState(false);

  const handleAnswerSubmit = (isCorrect, e) => {
    if (isCorrect) setScore(score + 1);
    e.target.classList.add(isCorrect ? "correct" : "incorrect");
    setTimeout(() => {
      if (actualQuestion === Questions.length - 1) {
        setIsFinish(true);
      } else {
        setActualQuestion(actualQuestion + 1);
      }
    }, 1000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft > 0) setTimeLeft((prev) => prev - 1);
      if (timeLeft === 0) setAreDisabled(true);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  if (isFinish)
    return (
      <main className="app">
        <div className="game-over">
          <span>
            {" "}
            Obtuviste {score} de {Questions.length}
          </span>
          <button onClick={() => (window.location.href = "./")}>
            {" "}
            Volver a jugar{" "}
          </button>
          <button
            onClick={() => {
              setIsFinish(false);
              setAnswerShow(true);
              setActualQuestion(0);
            }}
          >
            Ver respuestas{" "}
          </button>
        </div>
      </main>
    );

  if (answerShow) {
    return (
      <main className="app">
        <div className="left-side">
          <div className="question-number">
            <span>
              Pregunta {actualQuestion + 1} de {Questions.length}
            </span>
          </div>
          <div className="question-tittle">
            {Questions[actualQuestion].titulo}
          </div>
          <div>
            {
              Questions[actualQuestion].opciones.filter(
                (opcion) => opcion.isCorrect
              )[0].textoRespuesta
            }
          </div>
          <button
            onClick={() => {
              if (actualQuestion === Questions.length - 1) {
                window.location.href = "/";
              } else {
                setActualQuestion(actualQuestion + 1);
              }
            }}
          >
            {actualQuestion === Questions.length -1 ? "Volver a jugar" : 'Continuar'}
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="app">
      <div className="left-side">
        <div className="question-number">
          <span>
            Pregunta {actualQuestion + 1} de {Questions.length}
          </span>
        </div>
        <div className="question-tittle">
          {Questions[actualQuestion].titulo}
        </div>
        <div>
          {" "}
          {!areDisabled ? (
            <span className="time-left">Tiempo Restante: {timeLeft} </span>
          ) : (
            <button
              onClick={() => {
                setTimeLeft(10);
                setAreDisabled(false);
                setActualQuestion(actualQuestion + 1);
              }}
            >
              Continuar
            </button>
          )}
        </div>
      </div>

      <div className="right-side">
        {Questions[actualQuestion].opciones.map((respuesta) => (
          <button
            disabled={areDisabled}
            key={respuesta.textoRespuesta}
            onClick={(e) => handleAnswerSubmit(respuesta.isCorrect, e)}
          >
            {respuesta.textoRespuesta}
          </button>
        ))}
      </div>
    </main>
  );
}

export default App;
