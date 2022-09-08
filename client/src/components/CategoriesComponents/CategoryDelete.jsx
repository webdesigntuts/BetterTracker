import styles from "../../styles/CategoriesComponents/CategoryDelete.module.scss";
import { Title } from "../Titles/Titles";
import { queryClient } from "../../constants/config";
import { useState } from "react";
import { useCategoriesGet, useCategoryDelete } from "../../queries/category";

const CategoryDelete = () => {
  const [ctgName, setCtgName] = useState("");
  const { data: ctgs } = useCategoriesGet();
  return (
    <div className={styles.categoryContainer}>
      {/* DELETE CTG */}
      <Title>Delete Category</Title>
      <form onSubmit={(e) => e.preventDefault()}>
        <select>
          <option>All</option>
          {ctgs?.data?.ctgs?.map((category, index) => {
            return (
              <option key={index} value={category.id}>
                {category.name}
              </option>
            );
          })}
        </select>
        <button>Delete Category</button>
      </form>
    </div>
  );
};

export default CategoryDelete;
