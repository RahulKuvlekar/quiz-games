import { useState, useMemo, useEffect } from "react";
import { ADD_TOAST, DANGER } from "../../Constant/constant";
import { db } from "../../Firebase/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useToastContext } from "../../Hooks/useToastContext";
import "./Dashboard.css";
import { createToast } from "../../Utils/createToast";
import Loader from "../../Components/UI/Loader/Loader";
import { useAuthContext } from "../../Hooks/useAuthContext";
import { useNavigate, useLocation, createSearchParams } from "react-router-dom";

const Dashboard = () => {
  const [filteredType, setFilteredType] = useState("Global Dashboard");
  const [scoreboardData, setScoreboardData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { dispatchToast } = useToastContext();
  const { user, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const FILTERS = useMemo(
    () => [
      {
        name: "Global Dashboard",
      },
      {
        name: "Progress Dashboard",
      },
    ],
    []
  );

  const filteredData = useMemo(() => {
    if (filteredType === "Global Dashboard") {
      return [...scoreboardData]
        .sort(
          (a, b) =>
            (b.userScore / b.totalScore).toFixed(2) - a.userScore / a.totalScore
        )
        .slice(0, 10);
    } else if (filteredType === "Progress Dashboard") {
      return [...scoreboardData].filter((data) => data.userId === user.uid);
    }
    return scoreboardData;
    // eslint-disable-next-line
  }, [filteredType, scoreboardData]);

  const changeFilter = (e) => {
    if (e.target.textContent === "Progress Dashboard" && !isAuthenticated) {
      return navigate("/login", { replace: true, state: { from: location } });
    }
    setFilteredType(e.target.textContent);
  };

  const getDateFromTimestamp = (timestamp) => {
    const [month, date, year] = timestamp.toDateString().split(" ").slice(1);
    return `${date} ${month}, ${year} `;
  };

  const retakeTest = (categoryID, quizID) => {
    const params = { categoryID, quizID };
    navigate({
      pathname: `/quiz/${createSearchParams(params)}`,
    });
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const scoreboardRef = collection(db, "Scoreboard");
        const queryBoard = query(scoreboardRef, orderBy("timestamp", "desc"));
        const scoreboardSnapshot = await getDocs(queryBoard);
        const scoreboard = scoreboardSnapshot.docs
          .map((snapshot) => ({
            id: snapshot.id,
            ...snapshot.data(),
          }))
          .map((data) => ({ ...data, timestamp: data.timestamp.toDate() }));
        setScoreboardData(scoreboard);
      } catch (error) {
        dispatchToast({
          type: ADD_TOAST,
          payload: createToast(DANGER, `${error.message}, Please Refresh Page`),
        });
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="dashboard-section main-section">
      <div className="dashboard-filters">
        {FILTERS &&
          FILTERS.map((filter) => (
            <h2
              key={`filter-type-${filter?.name}`}
              className={`${filteredType === filter?.name ? "active" : ""}`}
              onClick={changeFilter}
            >
              {filter?.name}
            </h2>
          ))}
      </div>
      {loading && <Loader />}
      {filteredData &&
        filteredData.map((data, idx) => (
          <div className="dashboard-list" key={`dashboard-list-${data?.id}`}>
            {/* {data.userName} {data.timestamp.toString()} */}

            <h1 className="dashboard-list-number">{idx + 1})</h1>
            <div className="dashboard-list-info">
              <h1>{data.userName}</h1>
              <h2>Quiz - {data.quizName}</h2>
            </div>
            <div className="dashboard-list-date">
              {getDateFromTimestamp(data?.timestamp)}
            </div>
            <div className="dashboard-list-playAgain">
              {isAuthenticated && user?.uid === data.userId && (
                <button
                  className="btn btn-primary"
                  onClick={() => retakeTest(data.CategoryId, data.quizId)}
                >
                  RETAKE
                </button>
              )}
            </div>
            <div className="dashboard-list-status">
              <h1
                className={`${data.result === "PASS" ? "success" : "danger"}`}
              >
                {data.userScore} / {data.totalScore} {data.result}
              </h1>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Dashboard;
