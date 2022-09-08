import styles from "../styles/authComponents/Auth.module.scss";
import MainContainer from "../components/Containers/MainContainer";
import { Title } from "../components/Titles/Titles";
import { useState, useEffect } from "react";
import { useLoginUser } from "../queries/user";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuth from "../context/AuthProvider";

const Auth = () => {
  //LOGIN
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  //CONTEXT
  const { auth, setAuth } = useAuth();

  //navigate
  const navigate = useNavigate();

  let body = {
    email: email,
    password: pw,
  };

  const {
    mutate: loginHandler,
    isError: loginError,
    error: loginErr,
  } = useLoginUser();

  useEffect(() => {
    if (auth) navigate("/");
  });

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
                onError: () => {
                  console.log(loginErr);
                },
                onSuccess: () => setAuth(true),
              })
            }
          >
            Login Now
          </button>
        </div>
      </form>
      <Link to='/register'>Don't have an acc ? </Link>
    </MainContainer>
  );
};

export default Auth;
