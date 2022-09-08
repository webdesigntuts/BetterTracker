import styles from "../../styles/CategoriesComponents/Categories.module.scss";
import { Title } from "../Titles/Titles";
import { queryClient } from "../../constants/config";
import { useState } from "react";
import { useCategoriesPost, useCategoriesGet } from "../../queries/category";

const CategoryCreate = () => {
  const [ctgName, setCtgName] = useState("");

  const { mutate: postCategory } = useCategoriesPost({
    onSuccess: () => {
      queryClient.invalidateQueries("Categories");
    },
  });

  const { data: ctgs } = useCategoriesGet();

  return (
    <div>
      <Title>Create Category</Title>
      <div className={styles.container}>
        {/* CREATE A CATEGORY */}
        <div className={styles.categoryContainer}>
          <Title>Create A Category</Title>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type='text'
              placeholder='Category Name...'
              value={ctgName}
              onChange={(e) => setCtgName(e.target.value)}
            />
            <button
              onClick={() =>
                postCategory(
                  {
                    name: ctgName,
                  },
                  {
                    onSuccess: () => {
                      setCtgName("");
                      queryClient.invalidateQueries("Categories");
                    },
                  }
                )
              }
            >
              Create Category
            </button>
          </form>
        </div>

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
            <button
              onClick={() =>
                postCategory(
                  {
                    name: ctgName,
                  },
                  {
                    onSuccess: () => {
                      setCtgName("");
                      queryClient.invalidateQueries("Categories");
                    },
                  }
                )
              }
            >
              Delete Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
