import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Category.css";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import Loader from "../../Components/UI/Loader/Loader";
import Error from "../../Components/UI/Error/Error";
import QuizCard from "../../Components/QuizCard/QuizCard";

const Category = () => {
  const [currentCategory, setCurrentCategory] = useState();
  const [subCategory, setSubCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const [error, setError] = useState(false);
  const { categoryID } = useParams();

  useEffect(() => {
    if (!categoryID) return;

    (async () => {
      try {
        setLoading(true);
        const categoryRef = collection(
          db,
          `Categories/${categoryID}/categoryQuizzes`
        );

        const onSnapshot = await getDocs(categoryRef);
        const categoryData = onSnapshot.docs.map((category) => ({
          id: category.id,
          ...category.data(),
        }));

        setSubCategory(categoryData);

        const currCategoryRef = doc(db, `Categories/${categoryID}`);
        const currCategoryData = await getDoc(currCategoryRef);

        setCurrentCategory(currCategoryData.data());
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
    return () => setCurrentCategory();
  }, [categoryID]);

  return (
    <div className="category-section">
      {(() => {
        if (loading) return <Loader />;
        else if (error) return <Error msg={error} />;
        else
          return (
            <>
              <div className={`category-banner`}>
                {!isImgLoaded && <Loader />}
                <img
                  className="category-banner-poster"
                  src={currentCategory?.categoryPoster}
                  alt={currentCategory?.categoryName}
                  onLoad={() => setIsImgLoaded(true)}
                />
                {isImgLoaded && (
                  <h1 className="category-banner-description">
                    Welcome, to <span>“ {currentCategory?.categoryName} ”</span>
                  </h1>
                )}
              </div>
              {isImgLoaded && (
                <>
                  <h1 className="page-title page-title-center title-category">
                    Quiz Games List
                  </h1>
                  <section className="quiz-listing">
                    {subCategory.length > 0 &&
                      subCategory.map((category, idx) => (
                        <QuizCard
                          key={category?.id}
                          quizData={category}
                          categoryID={categoryID}
                          reverse={idx % 2 === 0 ? false : true}
                        />
                      ))}
                  </section>
                </>
              )}
            </>
          );
      })()}
    </div>
  );
};

export default Category;
