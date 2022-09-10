import styles from "../../styles/CategoriesComponents/CategoryCreate.module.scss";
import { Title } from "../Titles/Titles";
import { queryClient } from "../../constants/config";
import { useState } from "react";
import { useCategoriesPost } from "../../queries/category";
import Spinner from "../Spinner";

const CategoryCreate = () => {
  const [ctgName, setCtgName] = useState("");
  const {
    mutate: postCategory,
    error,
    isError,
    isSuccess,
    isLoading,
  } = useCategoriesPost({
    onSuccess: () => {
      queryClient.invalidateQueries("Categories");
    },
  });

  return (
    <div className={styles.categoryContainer}>
      {/* CREATE A CATEGORY */}
      <Title>Create Category</Title>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Category Name..."
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
          disabled={isLoading}
        >
          Create Category
        </button>
        {isError && (
          <p style={{ color: "red" }}>
            {JSON.stringify(error?.response?.data?.message)}
          </p>
        )}
        {isSuccess && (
          <p style={{ color: "green" }}>Category created successfully</p>
        )}
      </form>
      {isLoading && <Spinner fullPage />}
    </div>
  );
};

export default CategoryCreate;
