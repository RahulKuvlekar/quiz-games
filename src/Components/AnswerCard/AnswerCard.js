import React from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import "./AnswerCard.css";

const AnswerCard = ({ data, no }) => {
  const getOptionDiv = (option, idx) => {
    if (
      data?.selectedOption === option &&
      data?.selectedOption === data?.answer
    )
      return (
        <div className={`answerCard-option correct`}>
          <FaCheck /> &nbsp; {option}
        </div>
      );
    else if (
      data.selectedOption === option &&
      data?.selectedOption !== data?.answer
    )
      return (
        <div className={`answerCard-option wrong`}>
          <FaTimes /> &nbsp; {option}
        </div>
      );
    else if (option === data?.answer)
      return <div className={`answerCard-option correct`}>{option}</div>;
    else return <div className={`answerCard-option`}>{option}</div>;
  };

  return (
    <div className="answerCard-section">
      <img
        src={data?.poster ? data?.poster : data?.quizPoster}
        alt="question referance pic"
        className="answerCard-img"
      />
      <div className="answerCard-description">
        <h2 className="text-align-center">Question No - {no + 1}</h2>
        <h2>{data?.question}</h2>
        <h2 className="answerCard-points">
          Point - {data?.selectedOption === data?.answer ? "10" : "0"}
        </h2>
        <div className="answerCard-options">
          {data?.options?.length > 0 &&
            data?.options?.map((option, idx) => (
              <React.Fragment key={`answerCard-${idx + 1}`}>
                {getOptionDiv(option, idx)}
              </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;
