import styles from "../styles/Auth.module.scss";
import MainContainer from "../components/Containers/MainContainer";
import { Title } from "../components/Titles/Titles";
import { useState } from "react";
import { useLoginUser } from "../queries/user";
import { useRegisterUser } from "../queries/user";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { queryClient } from "../constants/config";
import Spinner from "../components/Spinner";

const Register = () => {
  //REGISTER
  const [regEmail, setRegEmail] = useState("");
  const [regPw, setRegPw] = useState("");

  let regBody = {
    email: regEmail,
    password: regPw,
  };

  const {
    mutateAsync: registerHandler,
    isSuccess: registerSucc,
    isError: registerError,
    error: registerErr,
    isLoading: registering,
  } = useRegisterUser();

  const {
    mutate: loginHandler,
    isError: loginError,
    error: loginErr,
  } = useLoginUser();

  const navigate = useNavigate();

  return (
    <MainContainer>
      {/* REGISTER FORM */}
      <form
        action="submit"
        onSubmit={(e) => e.preventDefault()}
        className={styles.registerForm}
      >
        <div className={styles.container}>
          <Title>Register</Title>
          <span>Email :</span>
          <input
            type="email"
            onChange={(e) => setRegEmail(e.target.value)}
            value={regEmail}
            autoComplete="email"
          />
          <span>Password :</span>
          <input
            type="password"
            onChange={(e) => setRegPw(e.target.value)}
            value={regPw}
            autoComplete="new-password"
          />

          {/* REGISTER BTN */}
          <button
            onClick={() =>
              registerHandler(regBody, {
                //ONSUCCESS USE LOGINHANDLER
                onSuccess: () => {
                  loginHandler(regBody, {
                    onSuccess: () => queryClient.invalidateQueries("user"),
                    onError: () => {
                      console.log(loginErr);
                    },
                  });
                },
              })
            }
          >
            Register Now
          </button>
          {/* ADD ERROR */}
          {registerError && (
            <div style={{ color: "red", marginTop: "2rem" }}>
              {JSON.stringify(registerErr?.response?.data?.message)}
            </div>
          )}
        </div>
        <Link to="/auth" style={{ textAlign: "center" }}>
          Already have and acc ?
        </Link>
      </form>
      {registering && <Spinner fullPage />}
    </MainContainer>
  );
};

export default Register;
