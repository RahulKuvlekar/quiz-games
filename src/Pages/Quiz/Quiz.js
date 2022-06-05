import { useState, useEffect, useMemo } from "react";
import { createSearchParams, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import "./Quiz.css";
import Rules from "../../Components/Rules/Rules";
import QuestionBank from "../../Components/QuestionBank/QuestionBank";

const Quiz = () => {
  const [quizData, setQuizData] = useState();
  const [displayRules, setDisplayRules] = useState(true);
  const { queryString } = useParams();

  const categoryID = useMemo(
    () => createSearchParams(queryString).get("categoryID"),
    [queryString]
  );

  const quizID = useMemo(
    () => createSearchParams(queryString).get("quizID"),
    [queryString]
  );

  const acceptRules = () => setDisplayRules(false);

  const rulesAccepted = useMemo(() => !displayRules, [displayRules]);

  useEffect(() => {
    (async () => {
      if (categoryID && quizID) {
        try {
          const categoryRef = doc(
            db,
            `Categories/${categoryID}/categoryQuizzes/${quizID}`
          );
          const snapshot = await getDoc(categoryRef);
          setQuizData(snapshot.data());
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, [categoryID, quizID]);

  return (
    <div className="main-section quiz-section">
      {displayRules && <Rules onAccept={acceptRules} />}
      {rulesAccepted && (
        <QuestionBank data={quizData} categoryID={categoryID} quizID={quizID} />
      )}
    </div>
  );
};

export default Quiz;
