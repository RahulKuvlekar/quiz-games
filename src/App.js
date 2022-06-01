import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navigationbar from "./Components/Navigationbar/Navigationbar";
import Home from "./Pages/Home/Home";
import Category from "./Pages/Category/Category";
import Quiz from "./Pages/Quiz/Quiz";

function App() {
  return (
    <div className="App">
      <Navigationbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryID" element={<Category />} />
        <Route path="/quiz/:queryString" element={<Quiz />} />
      </Routes>
    </div>
  );
}

export default App;
