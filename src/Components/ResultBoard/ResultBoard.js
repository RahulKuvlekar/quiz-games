import { useState, useMemo, useEffect } from "react";
import "./ResultBoard.css";
import AnswerCard from "../AnswerCard/AnswerCard";

const ResultBoard = ({ userQuizData = [] }) => {
  const [calculating, setCalculating] = useState(true);

  const SCORE = useMemo(
    () =>
      userQuizData.reduce(
        (prev, curr) => prev + (curr?.answer === curr?.selectedOption ? 10 : 0),
        0
      ),
    [userQuizData]
  );

  const TOTAL_SCORE = useMemo(() => userQuizData?.length * 10, [userQuizData]);

  const SCORE_PERCENTAGE = useMemo(
    () => ((SCORE / TOTAL_SCORE) * 100).toFixed(2),
    [SCORE, TOTAL_SCORE]
  );

  const getResult = (score) =>
    score >= 70 ? (
      <>
        <img src="/Images/win.gif" alt="Winner Gif" />
        <h2 className="success">“ Congratulations! You won ! 🎉 ”</h2>
      </>
    ) : (
      <>
        <img src="/Images/lose.gif" alt="Lose Gif" />
        <h2 className="danger">“ Oops! Better luck next time 👏🏻 ”</h2>
      </>
    );

  useEffect(() => {
    const timer = setTimeout(() => {
      setCalculating(false);
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div
        className={`resultBoard-section ${
          calculating ? "page-title-center" : null
        }`}
      >
        {calculating && (
          <>
            <h1 className="resultBoard-calculating">
              “ Wait ✋🏻 Your Scores are been calculated ”
            </h1>
            <img src="/Images/calculatingScore.gif" alt="Calculating Score" />
          </>
        )}
        {!calculating && (
          <>
            <h1 className="resultBoard-heading">Quiz Results</h1>
            <div className="resultBoard-msg">{getResult(SCORE_PERCENTAGE)}</div>
            <div className="resultBoard-score">
              <span>Your Score</span>
              <h1>
                {SCORE} / {TOTAL_SCORE} i.e {SCORE_PERCENTAGE} %
              </h1>
            </div>
            <div className="resultBoard-answer">
              <h1 className="resultBoard-heading text-align-center">
                Check Answers
              </h1>
              {userQuizData.length > 0 &&
                userQuizData.map((data, idx) => (
                  <AnswerCard key={`answerCard-${idx}`} data={data} no={idx} />
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ResultBoard;
