import styles from "../../styles/CategoriesComponents/Categories.module.scss";
import { Title } from "../Titles/Titles";
import { queryClient } from "../../constants/config";
import { useState } from "react";
import { useCategoriesGet, useCategoryDelete } from "../../queries/category";

const CategoryDelete = () => {
  const [ctgName, setCtgName] = useState("");
  const { data: ctgs } = useCategoriesGet();
  return (
    <div className={styles.container}>
      {/* DELETE CTG */}
      <div className={styles.categoryContainer}>
        <Title>DELETE A Category</Title>
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
    </div>
  );
};

export default CategoryDelete;
