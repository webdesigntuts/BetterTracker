import { useQuery, useMutation } from "react-query";
import Ax from "../utils/Axios";

//AXIOS CALLS
const deleteTr = async (params) => {
  return await Ax.delete(`transaction/delete/${params}`);
};

const getTrs = async (params) => {
  return await Ax.get("transactions", { params: params });
};

const postTr = async (params) => {
  return await Ax.post("transaction", params);
};
const useTrasactionDelete = () => useMutation("deleteTr", deleteTr);
const useTransactionsGet = ({
  firstDate,
  lastDate,
  category,
  dateSort,
  priceSort,
  skip,
  take,
  key,
  enabled,
}) =>
  useQuery(
    key,
    () =>
      getTrs({
        firstDate,
        lastDate,
        category,
        dateSort,
        priceSort,
        skip,
        take,
      }),
    {
      refetchOnWindowFocus: false,
      enabled: enabled || false,
      keepPreviousData: true,
    }
  );

const useTransactionPost = () => useMutation("postTransaction", postTr);
export { useTransactionsGet, useTrasactionDelete, useTransactionPost };
