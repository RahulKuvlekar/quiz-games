import React from "react";
import "./CategoryCard.css";

const CategoryCard = ({
  categoryData: { categoryName, categoryPoster, categoryDescription },
  reverse = false,
}) => {
  return (
    <div
      className={`categoryCard-section ${reverse ? "category-reverse" : null}`}
    >
      <img className="categoryCard-img" src={categoryPoster} alt="marvelCard" />
      <div className="categoryCard-description">
        <h1>{categoryName}</h1>
        <h3>{categoryDescription}</h3>
        <button className="btn btn-primary">Lets Explore</button>
      </div>
    </div>
  );
};

export default CategoryCard;
