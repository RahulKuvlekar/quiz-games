import React from "react";
import "./Rules.css";

const Rules = ({ onAccept }) => {
  return (
    <section className="rules-section">
      <h1 className="rules-title">RULES -</h1>
      <h3>⭐️ &nbsp; Each right answer scores 10 Points</h3>
      <h3>
        ⭐️ &nbsp; Each multiple choice question has only one correct answer
      </h3>
      <h3>⭐️ &nbsp; To win the quiz you need to score more than 70%</h3>

      <button className="btn btn-primary" onClick={onAccept}>
        Start Quiz
      </button>
    </section>
  );
};

export default Rules;
