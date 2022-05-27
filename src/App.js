import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navigationbar from "./Components/Navigationbar/Navigationbar";
import Home from "./Pages/Home/Home";

function App() {
  return (
    <div className="App">
      <Navigationbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
