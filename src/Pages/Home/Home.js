import React from "react";
import CategoryList from "../../Components/CategoryList/CategoryList";
import "./Home.css";

const Home = () => {
  return (
    <div className="main-section">
      <img className="poster" src="/Images/poster.jpeg" alt="poster" />
      <h1 className="page-title page-title-center title-category">
        Categories
      </h1>
      <CategoryList />
    </div>
  );
};

export default Home;
