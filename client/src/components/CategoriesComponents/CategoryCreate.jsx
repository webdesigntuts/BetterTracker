import styles from "../../styles/CategoriesComponents/Categories.module.scss";
import { Title } from "../Titles/Titles";
import { queryClient } from "../../constants/config";
import { useState } from "react";
import { useCategoriesPost } from "../../queries/category";

const CategoryCreate = () => {
  const [ctgName, setCtgName] = useState("");

  const { mutate: postCategory } = useCategoriesPost({
    onSuccess: () => {
      queryClient.invalidateQueries("Categories");
    },
  });

  return (
    <div className={styles.container}>
      <Title>Create Category</Title>
      {/* CREATE A CATEGORY */}
      <div className={styles.categoryContainer}>
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
    </div>
  );
};

export default CategoryCreate;
