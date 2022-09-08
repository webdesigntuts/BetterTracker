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

  const { mutate: loginHandler, isLoading: loggingIn } = useLoginUser();

  return (
    <MainContainer>
      {/* LOGIN */}
      <form action='submit' onSubmit={(e) => e.preventDefault()}>
        <div className={styles.container}>
          <Title>Login</Title>
          <span>Email :</span>
          <input
            type='email'
            autoComplete='username'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <span>Password :</span>
          <input
            type='password'
            onChange={(e) => setPw(e.target.value)}
            value={pw}
            autoComplete='password'
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
      </form>
      <Link to='/register'>Don't have an acc ? </Link>
      {loggingIn && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.5)",
          }}
        >
          <Spinner />
        </div>
      )}
    </MainContainer>
  );
};

export default Auth;
