import { useState, useMemo, useEffect } from "react";
import { useToastContext } from "../../Hooks/useToastContext";
import { useAuthContext } from "../../Hooks/useAuthContext";
import "./QuestionBank.css";
import { ADD_TOAST, WARNING } from "../../Constant/constant";
import { createToast } from "../../Utils/createToast";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import ResultBoard from "../ResultBoard/ResultBoard";
import Loader from "../UI/Loader/Loader";

const QuestionBank = ({ data = [], categoryID, quizID }) => {
  const [questionNo, setQuestionNo] = useState(1);
  const [questionSet, setQuestionSet] = useState(data[`set1`]);
  const [userQuizData, setuserQuizData] = useState([]);
  const [optionSelected, setOptionSelected] = useState(null);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const { dispatchToast } = useToastContext();
  const { user } = useAuthContext();

  const totalsQuestionsCount = useMemo(
    () => Object.keys(data).filter((name) => name.includes("set")).length,
    [data]
  );

  const addDataToUserQuizData = () =>
    setuserQuizData((prev) => [
      ...prev,
      {
        question: questionSet?.question,
        options: questionSet?.options,
        answer: questionSet?.answer,
        selectedOption: optionSelected,
        poster: questionSet?.poster,
      },
    ]);

  const selectOption = (e) => {
    setOptionSelected(e.target.textContent);
  };

  const nextQuestion = () => {
    addDataToUserQuizData();
    setOptionSelected("");
    setIsImgLoaded(false);
    if (totalsQuestionsCount !== questionNo) {
      setQuestionNo((prev) => prev + 1);
      setQuestionSet(data[`set${questionNo + 1}`]);
    }
  };

  const finishQuiz = () => {
    addDataToUserQuizData();
    setIsQuizCompleted(true);
  };

  useEffect(() => {
    if (isQuizCompleted) {
      (async () => {
        const userScore = userQuizData.reduce(
          (prev, curr) =>
            prev + (curr?.answer === curr?.selectedOption ? 10 : 0),
          0
        );

        try {
          const userdata = {
            userName: user?.displayName,
            userId: user?.uid,
            CategoryId: categoryID,
            quizName: data?.quizName,
            quizId: quizID,
            userScore: userScore,
            totalScore: totalsQuestionsCount * 10,
            result:
              ((userScore / totalsQuestionsCount) * 10).toFixed(2) >= 70
                ? "PASS"
                : "FAILED",
            timestamp: serverTimestamp(),
          };
          const docRef = doc(db, "Scoreboard", uuidv4());
          await setDoc(docRef, userdata);
        } catch (error) {
          dispatchToast({
            type: ADD_TOAST,
            payload: createToast(WARNING, error.message),
          });
        }
      })();
    }
    // eslint-disable-next-line
  }, [isQuizCompleted]);

  return (
    <>
      {!isQuizCompleted && (
        <>
          <h1 className="page-title page-title-center">{data?.quizName}</h1>
          <div className="questionBank-section">
            <div className="questionBank-imgWrapper">
              {!isImgLoaded && <Loader />}

              <img
                src={
                  questionSet?.poster ? questionSet?.poster : data?.quizPoster
                }
                alt="question referance pic"
                className={`questionBank-img ${
                  isImgLoaded === false ? "no-visibility" : ""
                }`}
                onLoad={() => setIsImgLoaded(true)}
              />
            </div>
            <div className="questionBank-description">
              <h2 className="text-align-center">Question No - {questionNo}</h2>
              <h2>{questionSet?.question}</h2>
              <div className="questionBank-options">
                {questionSet?.options?.length > 0 &&
                  questionSet?.options?.map((option, idx) => (
                    <div
                      key={`questionBank-option-${idx}`}
                      className={`questionBank-option ${
                        optionSelected === option ? "option-selected" : null
                      }`}
                      onClick={selectOption}
                    >
                      {option}
                    </div>
                  ))}
              </div>
              {totalsQuestionsCount !== questionNo ? (
                <button className="btn btn-primary" onClick={nextQuestion}>
                  Next
                </button>
              ) : (
                <button className="btn btn-primary" onClick={finishQuiz}>
                  Finish
                </button>
              )}
            </div>
          </div>
        </>
      )}
      {isQuizCompleted && <ResultBoard userQuizData={userQuizData} />}
    </>
  );
};

export default QuestionBank;
