//STYLES
import styles from "../../styles/Navbar/MobileNavbar.module.scss";
import { FaTimes, FaBars } from "react-icons/fa";

//COMPONENTS
import ListItemLink from "./ListItemLink";
import { AuthContext } from "../../context/AuthProvider";
import { queryClient } from "../../constants/config";

//UTILS
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogoutUser } from "../../queries/user";

const MobileNavbar = () => {
  const { setAuth, auth } = useContext(AuthContext);
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();

  const { mutate: logoutHandler, isSuccess } = useLogoutUser();
  useEffect(() => {
    if (isSuccess) {
      queryClient.removeQueries();
      setAuth(false);
      if (!auth) navigate("auth");
    }
  }, [isSuccess]);

  const closeNav = () => {
    setNavOpen(false);
  };

  return (
    <div className={styles.container}>
      {auth && (
        <div>
          <div
            className={`${styles.iconContainer} ${styles.bars}`}
            onClick={() => setNavOpen(true)}
          >
            <FaBars />
          </div>
          <nav className={navOpen ? styles.navActive : undefined}>
            <ul>
              <div
                className={`${styles.iconContainer} ${styles.times}`}
                onClick={() => setNavOpen(false)}
              >
                <FaTimes />
              </div>

              {/* HOME */}
              <ListItemLink
                url=""
                optionClass={styles.linkColor}
                clickHandler={closeNav}
              >
                <h3>Home</h3>
              </ListItemLink>

              {/* CATEGORIES */}
              <ListItemLink
                url="categories"
                optionClass={styles.linkColor}
                clickHandler={closeNav}
              >
                <h3>Categories</h3>
              </ListItemLink>

              {/* TRANSACTIONS */}
              <ListItemLink
                url="transactions"
                optionClass={styles.linkColor}
                clickHandler={closeNav}
              >
                <h3>Transactions</h3>
              </ListItemLink>

              {/* Wallet */}
              <ListItemLink
                url="wallet"
                optionClass={styles.linkColor}
                clickHandler={closeNav}
              >
                <h3>Wallet</h3>
              </ListItemLink>

              {/* Profile */}
              <div className={styles.mobileMenuLinks}>
                <ListItemLink
                  url="profile"
                  optionClass={styles.linkColor}
                  clickHandler={closeNav}
                >
                  <h3>Profile</h3>
                </ListItemLink>
              </div>

              {/* Settings */}
              <div className={styles.mobileMenuLinks}>
                <ListItemLink
                  url="settings"
                  optionClass={styles.linkColor}
                  clickHandler={closeNav}
                >
                  <h3>Settings</h3>
                </ListItemLink>
              </div>

              {/* AUTH MENU */}
              <ListItemLink
                url="logout"
                clickHandler={logoutHandler}
                optionClass={styles.linkColor}
              >
                <h3>Logout</h3>
              </ListItemLink>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;
