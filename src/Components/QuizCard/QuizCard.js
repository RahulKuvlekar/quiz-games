import React from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import "./QuizCard.css";

const QuizCard = ({ quizData, categoryID, reverse = false }) => {
  const { quizName, quizPoster, quizDescription, id } = quizData;
  const navigate = useNavigate();

  const letExploreBtn = () => {
    const params = { categoryID, quizID: id };
    navigate({
      pathname: `/quiz/${createSearchParams(params)}`,
    });
  };

  return (
    <div className={`quizCard-section`}>
      <img className="quizCard-img" src={quizPoster} alt={quizName} />
      <div className="quizCard-description">
        <h1 className="quizCard-description-title">{quizName}</h1>
        <h3>{quizDescription}</h3>
        <button className="btn btn-primary" onClick={letExploreBtn}>
          Play Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizCard;
