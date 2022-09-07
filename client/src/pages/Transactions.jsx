import { Title } from "../components/Titles/Titles";
import MainContainer from "../components/Containers/MainContainer";
import AddTransactionForm from "../components/transactionComponents/AddTransactionForm";
import DeleteTransactionForm from "../components/transactionComponents/DeleteTransactionForm";
const Transactions = () => {
  return (
    <MainContainer>
      <Title>Transactions</Title>
      <AddTransactionForm />
      <DeleteTransactionForm />
    </MainContainer>
  );
};

export default Transactions;
