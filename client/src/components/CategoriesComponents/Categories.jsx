import { Title } from "../Titles/Titles";
import React, { useState } from "react";
import { useCategoriesGet } from "../../queries/category";
import { useTransactionsGet } from "../../queries/transaction";
import TransactionCard from "../Cards/TransactionCard";
import styles from "../../styles/CategoriesComponents/Categories.module.scss";
import { DateTime } from "luxon";

const Categories = () => {
  //SEARCH FILTERS
  const [timeSpan, setTimeSpan] = useState(
    DateTime.now()
      .minus({
        days: 7,
      })
      .toISODate()
  );
  const [categories, setCategories] = useState("");
  const [sortingField, setSortingField] = useState("dateSort");
  const [order, setOrder] = useState("asc");
  const { data: ctgs } = useCategoriesGet();
  const [skip, setSkip] = useState(0);
  const { data: FilteredTransactions, refetch: fetchTransactions } =
    useTransactionsGet({
      firstDate: timeSpan,
      category: categories ? categories : undefined,
      [sortingField]: order,
      skip: skip,
      take: 10,
      key: "CategoriesTrs",
    });

  return (
    <div className={styles.container}>
      <Title>Categories</Title>
      {/* FITLERS */}
      <div className={styles.filters}>
        <div className={styles.filterContainer}>
          {/* TIME SPAN */}
          <div className={styles.filter}>
            <label htmlFor='timeSpan'>Time Span :</label>
            <select
              name='timeSpan'
              onChange={(e) => {
                setTimeSpan(e.target.value);
              }}
            >
              <option
                value={DateTime.now()
                  .minus({
                    days: 7,
                  })
                  .toISODate()}
              >
                Last 7 days
              </option>
              <option
                value={DateTime.now()
                  .minus({
                    days: 28,
                  })
                  .toISODate()}
              >
                Last 28 days
              </option>
              <option
                value={DateTime.now()
                  .minus({
                    days: 90,
                  })
                  .toISODate()}
              >
                Last 90 days
              </option>
              <option
                value={DateTime.now()
                  .minus({
                    days: 365,
                  })
                  .toISODate()}
              >
                Last 365 days
              </option>
            </select>
          </div>
        </div>

        {/* CATEGORIES */}
        <div className={styles.filterContainer}>
          <div className={styles.filter}>
            <label htmlFor='categories'>Categories :</label>
            {ctgs?.data?.ctgs?.length > 0 ? (
              <select
                name='categories'
                onChange={(e) => {
                  setCategories(e.target.value);
                }}
              >
                {ctgs?.data?.ctgs?.map((category, index) => {
                  return (
                    <option key={index} value={category.id}>
                      {category.name}
                    </option>
                  );
                })}
                <option value=''>All</option>
              </select>
            ) : (
              <div style={{ padding: "0.61rem 1.5rem", background: "#ececec" }}>
                No Categories
              </div>
            )}
          </div>
        </div>

        {/* SORTING FIELD */}
        <div className={styles.filterContainer}>
          <div className={styles.filter}>
            <label htmlFor='sortingField'>Sorting Field :</label>
            <select
              name='sortingField'
              onChange={(e) => {
                setSortingField(e.target.value);
              }}
            >
              <option value='date'>Date</option>
              <option value='price'>Price</option>
            </select>
          </div>
        </div>

        {/* ASC OR DESC */}
        <div className={styles.filterContainer}>
          <div className={styles.filter}>
            <label htmlFor='order'>Order :</label>
            <select
              name='order'
              onChange={(e) => {
                setOrder(e.target.value);
              }}
            >
              <option value='asc'>Ascending</option>
              <option value='desc'>Descending</option>
            </select>
          </div>
        </div>

        {/* RESULTS */}
        <div className={styles.results}>
          <button className={styles.btn} onClick={() => fetchTransactions()}>
            Show Results
          </button>
          <div className={styles.inner}>
            {FilteredTransactions &&
              FilteredTransactions?.data?.map((transaction, index) => {
                return (
                  <TransactionCard
                    key={index}
                    category={transaction.category.name}
                    money={transaction.money}
                    date={DateTime.fromISO(transaction.date).toISODate()}
                    description={transaction.info}
                    title={transaction.title}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;