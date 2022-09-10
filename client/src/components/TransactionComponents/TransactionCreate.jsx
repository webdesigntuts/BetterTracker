//STYLES
import styles from "../../styles/TransactionComponents/TransactionCreate.module.scss";
//COMPONENTS
import { Title } from "../Titles/Titles";
import Spinner from "../Spinner";

//UTILS
import { useCategoriesGet } from "../../queries/category";
import { useTransactionPost } from "../../queries/transaction";
import { queryClient } from "../../constants/config";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";

const Error = ({ error }) => {
  return (
    <>
      {error && (
        <span style={{ color: "red", marginBottom: "0.5rem" }}>{error}</span>
      )}
    </>
  );
};

const TransactionDelete = () => {
  const schema = z.object({
    title: z
      .string()
      .min(2, { message: "Title must be at least 2 characters" }),
    money: z
      .number()
      .positive({ message: "Money must be a positive value" })
      .or(z.string().regex(/\d+/).transform(Number))
      .refine((n) => n > 0, {
        message: "Money must be a positive number",
      }),
    date: z.string().min(1, { message: "Date is required" }),
    info: z.string().optional(),
    transactionCategoryId: z.string({ message: "Invalid Category" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isValidating: formValidating },
    reset: formReset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    mutate: postTransaction,
    isLoading: postingTransaction,
    isSuccess: postedTransaction,
    isError: postingTransactionError,
    error: postingTransactionErr,
  } = useTransactionPost();

  const { data: ctgs, isFetched: ctgsFetched } = useCategoriesGet();

  return (
    <div className={styles.inner}>
      <form
        onSubmit={handleSubmit((d) => {
          postTransaction(d, {
            onSuccess: () => {
              queryClient.invalidateQueries("Categories_Sum");
              formReset();
            },
          });
        })}
      >
        <Title>Add a Transaction</Title>
        <input type="text" placeholder="* Title " {...register("title")} />
        <Error error={formErrors?.title?.message} />
        <input
          type="number"
          step={0.01}
          placeholder="* Money"
          {...register("money")}
        />
        <Error error={formErrors?.money?.message} />
        <input type="date" placeholder="* Date" {...register("date")} />
        <Error error={formErrors?.date?.message} />
        <input type="text" placeholder="Information" {...register("info")} />
        <Error error={formErrors?.info?.message} />

        {/* CATEGORIES */}
        {ctgs && ctgsFetched ? (
          <>
            <select {...register("transactionCategoryId")}>
              {ctgs?.data?.ctgs?.map((ctg) => {
                return (
                  <option key={ctg.id} value={ctg.id}>
                    {ctg.name}
                  </option>
                );
              })}
            </select>
            <Error error={formErrors?.transactionCategoryId?.message} />
          </>
        ) : (
          <div>loading...</div>
        )}

        {/* POST TRANSACTION */}
        <button type="submit">Add Transaction</button>

        {/* ERROR */}
        <div style={{ marginBottom: "1rem" }}>
          {postingTransactionError ? (
            <div style={{ color: "red" }}>
              {postingTransactionErr?.response?.data?.message}
            </div>
          ) : null}
          {postedTransaction && <div style={{ color: "green" }}>Success</div>}
        </div>
        {(postingTransaction || formValidating) && <Spinner fullPage />}
      </form>
    </div>
  );
};

export default TransactionDelete;
