import { useMutation, useQuery } from "react-query";
import Ax from "../utils/Axios";

//AXIOS CALLS
const getCtgs = async () => {
  return await Ax.get("/categories");
};

const getCtgsSum = async () => {
  return await Ax.get("/categories/sum");
};

const postCtg = async (props) => {
  return await Ax.post("/category", props);
};

const deleteCategory = async (params) => {
  return await Ax.delete(`category/delete/${params}`);
};

//HOOKS
const useCategoriesGet = () =>
  useQuery("Categories", getCtgs, {
    staleTime: 50000,
  });

const useCategoriesSum = () =>
  useQuery("Categories_Sum", getCtgsSum, { staleTime: 30000 });

const useCategoriesPost = () => useMutation("Categories_Post", postCtg);

const useCategoryDelete = () => useMutation("Category_Delete", deleteCategory);

export {
  useCategoriesGet,
  useCategoriesSum,
  useCategoriesPost,
  useCategoryDelete,
};
