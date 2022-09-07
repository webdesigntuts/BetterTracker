import MainContainer from "../components/Containers/MainContainer";
import { Title } from "../components/Titles/Titles";
import { useUser, useUserUpdate } from "../queries/user";
import styles from "../styles/profileComponents/Profile.module.scss";
import { useState, useEffect } from "react";

const Profile = () => {
  const { data: user, isSuccess } = useUser();
  const {
    mutate: UserUpdate,
    isSuccess: userUpdated,
    isError: userNotUpdated,
  } = useUserUpdate();

  //state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (isSuccess) {
      try {
        setFirstName(user.data.firstName);
        setLastName(user.data.lastName);
      } catch {}
    }
  }, [isSuccess, user]);

  const body = {
    firstName: firstName,
    lastName: lastName,
  };

  return (
    <MainContainer>
      <Title>Profile</Title>
      <form action="submit" onSubmit={(e) => e.preventDefault()}>
        <div className={styles.container}>
          {/* FIRSTNAME */}
          <div className={styles.firstName}>
            <label htmlFor="firstName">FirstName :</label>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          {/* LASTNAME */}
          <div className={styles.lastName}>
            <label htmlFor="lastName">LastName : </label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          {/* BUTTON */}
          <button onClick={() => UserUpdate(body)}>Update Info</button>
          {userUpdated && (
            <div style={{ marginTop: "1rem", color: "green" }}>Success</div>
          )}
          {userNotUpdated && (
            <div style={{ marginTop: "1rem", color: "red" }}>Error</div>
          )}
        </div>
      </form>
    </MainContainer>
  );
};

export default Profile;
