import { useState, useEffect } from "react";
import CategoryCard from "../CategoryCard/CategoryCard";
import "./CategoryList.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import { useToastContext } from "../../Hooks/useToastContext";
import { DANGER } from "../../Constant/constant";
import { createToast } from "../../Utils/createToast";

const CategoryList = () => {
  const [categoryData, setCategoryData] = useState([]);
  const { dispatchToast } = useToastContext();

  useEffect(() => {
    (async () => {
      try {
        const categoryRef = collection(db, "Categories");
        const categorySnap = await getDocs(categoryRef);
        const categoryData = categorySnap.docs.map((snapshot) => ({
          id: snapshot.id,
          ...snapshot.data(),
        }));

        setCategoryData(categoryData);
      } catch (error) {
        dispatchToast({
          type: DANGER,
          payload: createToast(
            DANGER,
            `${error.message}, Try refreshing page.`
          ),
        });
      }
    })();

    // cleanup
    return () => setCategoryData([]);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="categoryList-section">
      {categoryData.length > 0 &&
        categoryData.map((category, idx) => (
          <CategoryCard
            key={category?.id}
            categoryData={category}
            reverse={idx % 2 === 0 ? false : true}
          />
        ))}
    </div>
  );
};

export default CategoryList;
