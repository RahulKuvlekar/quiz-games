import React from "react";
import { useNavigate } from "react-router-dom";
import "./CategoryCard.css";

const CategoryCard = ({ categoryData, reverse = false }) => {
  const { categoryName, categoryPoster, categoryDescription, id } =
    categoryData;

  const navigate = useNavigate();

  const letExploreBtn = () => navigate(`category/${id}`);

  return (
    <div
      className={`categoryCard-section ${reverse ? "category-reverse" : null}`}
    >
      <img
        className="categoryCard-img"
        src={categoryPoster}
        alt={categoryName}
      />
      <div className="categoryCard-description">
        <h1>{categoryName}</h1>
        <h3>{categoryDescription}</h3>
        <button className="btn btn-primary" onClick={letExploreBtn}>
          Lets Explore
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
