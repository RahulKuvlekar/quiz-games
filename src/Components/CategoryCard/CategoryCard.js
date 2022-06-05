import React from "react";
import { useNavigate } from "react-router-dom";
import "./CategoryCard.css";
import Loader from "../UI/Loader/Loader";

const CategoryCard = ({ categoryData, reverse = false }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const { categoryName, categoryPoster, categoryDescription, id } =
    categoryData;

  const navigate = useNavigate();

  const letExploreBtn = () => navigate(`category/${id}`);

  return (
    <div
      className={`categoryCard-section ${reverse ? "category-reverse" : ""} ${
        !isLoaded ? "position-relative no-hover" : ""
      }`}
    >
      {!isLoaded && <Loader />}

      <img
        className="categoryCard-img"
        src={categoryPoster}
        alt={categoryName}
        onLoad={() => setIsLoaded(true)}
      />

      {isLoaded && (
        <div className="categoryCard-description">
          <h1>{categoryName}</h1>
          <h3>{categoryDescription}</h3>
          <button className="btn btn-primary" onClick={letExploreBtn}>
            Lets Explore
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryCard;
