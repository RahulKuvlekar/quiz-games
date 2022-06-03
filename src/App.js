import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navigationbar from "./Components/Navigationbar/Navigationbar";
import Home from "./Pages/Home/Home";
import Category from "./Pages/Category/Category";
import Quiz from "./Pages/Quiz/Quiz";
import Login from "./Pages/Authentication/Login";
import Signup from "./Pages/Authentication/Signup";
import Toast from "./Components/UI/Toast/Toast";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";

function App() {
  return (
    <div className="App">
      <Toast position={"top-left"} autoDeleteInterval={3000} />
      <Navigationbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/category/:categoryID" element={<Category />} />
        <Route
          path="/quiz/:queryString"
          element={
            <PrivateRoute>
              <Quiz />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
