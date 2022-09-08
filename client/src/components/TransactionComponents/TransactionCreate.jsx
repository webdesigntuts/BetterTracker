//STYLES
import styles from "../../styles/TransactionComponents/TransactionCreate.module.scss";
//COMPONENTS
import { Title } from "../Titles/Titles";

//UTILS
import { useState } from "react";
import { useCategoriesGet } from "../../queries/category";
import { useTransactionPost } from "../../queries/transaction";
import { DateTime } from "luxon";
import { queryClient } from "../../constants/config";
import { useEffect } from "react";

const TransactionDelete = () => {
  const [title, setTitle] = useState("");
  const [money, setMoney] = useState("");
  const [date, setDate] = useState(DateTime.now().toISODate());
  const [info, setInfo] = useState("");
  const [category, setCategory] = useState("");
  const { data: ctgs } = useCategoriesGet();

  const {
    mutate: postTransaction,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useTransactionPost();

  let body = {
    title: title,
    money: parseFloat(money),
    date: date,
    info: info,
    transactionCategoryId: category,
  };

  useEffect(() => {
    setCategory(ctgs?.data?.ctgs[0]?.id);
  }, [ctgs]);

  return (
    <div className={styles.inner}>
      <Title>Add a Transaction</Title>
      <input
        type='text'
        placeholder='* Title '
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <input
        type='number'
        placeholder='* Money'
        onChange={(e) => setMoney(e.target.value)}
        value={money}
      />
      <input
        type='date'
        placeholder='* Date'
        onChange={(e) => setDate(e.target.value)}
        value={date}
      />
      <input
        type='text'
        placeholder='Information'
        onChange={(e) => setInfo(e.target.value)}
        value={info}
      />

      {/* CATEGORIES */}
      {ctgs ? (
        <select onChange={(e) => setCategory(e.target.value)}>
          {ctgs?.data?.ctgs?.map((ctg) => {
            return (
              <option key={ctg.id} value={ctg.id}>
                {ctg.name}
              </option>
            );
          })}
        </select>
      ) : (
        <div>loading...</div>
      )}

      {/* POST TRANSACTION */}
      <button
        onClick={() => {
          postTransaction(body, {
            onSuccess: () => {
              queryClient.invalidateQueries("Categories_Sum");
              setTitle("");
              setMoney("");
              setDate(DateTime.now().toISODate());
              setInfo("");
            },
          });
        }}
      >
        {isLoading ? "Loading..." : "Add Transaction"}
      </button>

      {/* ERROR */}
      <div style={{ marginBottom: "1rem" }}>
        {isError ? (
          <div style={{ color: "red" }}>
            {"Please Fill The Required Fields"}
          </div>
        ) : null}
        {isSuccess && <div style={{ color: "green" }}>Success</div>}
      </div>
    </div>
  );
};

export default TransactionDelete;
