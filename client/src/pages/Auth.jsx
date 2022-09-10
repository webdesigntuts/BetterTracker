import styles from "../styles/Auth.module.scss";
import MainContainer from "../components/Containers/MainContainer";
import { Title } from "../components/Titles/Titles";
import { useState } from "react";
import { useLoginUser } from "../queries/user";
import { Link } from "react-router-dom";
import { queryClient } from "../constants/config";
import Spinner from "../components/Spinner";

const Auth = () => {
  //LOGIN
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  let body = {
    email: email,
    password: pw,
  };

  const {
    mutate: loginHandler,
    isLoading: loggingIn,
    isError,
    error,
  } = useLoginUser();

  return (
    <MainContainer>
      {/* LOGIN */}
      <form action="submit" onSubmit={(e) => e.preventDefault()}>
        <div className={styles.container}>
          <Title>Login</Title>
          <span>Email :</span>
          <input
            type="email"
            autoComplete="username"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <span>Password :</span>
          <input
            type="password"
            onChange={(e) => setPw(e.target.value)}
            value={pw}
            autoComplete="password"
          />

          {/* LOGIN BTN */}
          <button
            onClick={() =>
              loginHandler(body, {
                onSuccess: () => queryClient.invalidateQueries("user"),
              })
            }
          >
            Login Now
          </button>
        </div>
        <Link style={{ textAlign: "center" }} to="/register">
          Don't have an acc ?
        </Link>
        {isError && (
          <p style={{ color: "red", textAlign: "center" }}>
            {JSON.stringify(error?.response?.data?.message)}
          </p>
        )}
      </form>

      {loggingIn && <Spinner fullPage />}
    </MainContainer>
  );
};

export default Auth;
