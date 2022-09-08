import MainContainer from "../components/Containers/MainContainer";
import Searchbar from "../components/HomeComponents/Searchbar";
import { Title } from "../components/Titles/Titles";
import CategoryCard from "../components/Cards/CategoryCard";
import TransactionCard from "../components/Cards/TransactionCard";
import styles from "../styles/HomeComponents/Home.module.scss";
import HomeProfile from "../components/HomeComponents/HomeProfile";

import { DateTime } from "luxon";
import { useTransactionsGet } from "../queries/transaction";
import { useCategoriesSum } from "../queries/category";
import { useEffect } from "react";

const Home = () => {
  //LATEST TRS
  const { data: transactions, refetch: fetchTransactions } = useTransactionsGet(
    {
      key: "Trs_Latest",
      skip: 0,
      take: 5,
    }
  );

  const { data: CategoriesSum } = useCategoriesSum();
  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <MainContainer optionClass={styles.container}>
      <div className={styles.main}>
        {/* SEARCHBAR */}
        <div className={styles.searchbar}>
          <Searchbar />
        </div>

        {/* CATEGORIES */}
        <div className={styles.categories}>
          <Title>Categories Last 30 Days</Title>
          <div className={styles.content}>
            {CategoriesSum?.data?.transactions?.map((category, index) => {
              return (
                <CategoryCard
                  key={index}
                  category={category.transactionCategoryId}
                  money={category._sum.money.toFixed(2)}
                />
              );
            })}
          </div>
        </div>

        {/* TRANSACTIONS */}
        <div className={styles.transactions}>
          <Title>Latest Transactions</Title>
          <div className={styles.content}>
            {/* LATEST TRANSACTIONS */}
            {transactions &&
              transactions?.data?.map((transaction, index) => {
                return (
                  <TransactionCard
                    key={index}
                    category={transaction.category.name}
                    date={DateTime.fromISO(transaction.date).toISODate()}
                    money={transaction.money.toFixed(2)}
                    description={transaction.info}
                    title={transaction.title}
                  />
                );
              })}
          </div>
        </div>
      </div>
      <div className={styles.profile}>
        <HomeProfile />
      </div>
    </MainContainer>
  );
};

export default Home;
