//STYLES
import styles from "../../styles/Navbar/MobileNavbar.module.scss";
import { FaTimes, FaBars } from "react-icons/fa";

//COMPONENTS
import ListItemLink from "./ListItemLink";
import { queryClient } from "../../constants/config";

//UTILS
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogoutUser } from "../../queries/user";

const MobileNavbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const navigate = useNavigate();

  const { mutate: logoutHandler } = useLogoutUser();

  const closeNav = () => {
    setNavOpen(false);
  };

  return (
    <>
      <div className={styles.container}>
        <div>
          {/* CLOSE BUTTON */}
          <div
            className={`${styles.iconContainer} ${styles.bars}`}
            onClick={() => setNavOpen(true)}
          >
            <FaBars />
          </div>

          {/* LINKS */}
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
                url=''
                optionClass={styles.linkColor}
                clickHandler={closeNav}
              >
                <h3>Home</h3>
              </ListItemLink>

              {/* CATEGORIES */}
              <ListItemLink
                url='categories'
                optionClass={styles.linkColor}
                clickHandler={closeNav}
              >
                <h3>Categories</h3>
              </ListItemLink>

              {/* TRANSACTIONS */}
              <ListItemLink
                url='transactions'
                optionClass={styles.linkColor}
                clickHandler={closeNav}
              >
                <h3>Transactions</h3>
              </ListItemLink>

              {/* Wallet */}
              <ListItemLink
                url='wallet'
                optionClass={styles.linkColor}
                clickHandler={closeNav}
              >
                <h3>Wallet</h3>
              </ListItemLink>

              {/* Profile */}
              <div className={styles.mobileMenuLinks}>
                <ListItemLink
                  url='profile'
                  optionClass={styles.linkColor}
                  clickHandler={closeNav}
                >
                  <h3>Profile</h3>
                </ListItemLink>
              </div>

              {/* Settings */}
              <div className={styles.mobileMenuLinks}>
                <ListItemLink
                  url='settings'
                  optionClass={styles.linkColor}
                  clickHandler={closeNav}
                >
                  <h3>Settings</h3>
                </ListItemLink>
              </div>

              {/* LOGOUT*/}
              <button
                url='logout'
                onClick={() => {
                  logoutHandler(null, {
                    onSuccess: () => {
                      queryClient.removeQueries();
                      queryClient.cancelQueries();

                      navigate("/auth");
                    },
                  });
                }}
                style={{
                  background: "transparent",
                  cursor: "pointer",
                  color: "whitesmoke",
                  fontWeight: "500",
                }}
              >
                <h3>Logout</h3>
              </button>
            </ul>
          </nav>
        </div>
      </div>

      {/* BLACK BACKGROUND */}
      <div
        onClick={() => setNavOpen(false)}
        className={styles.blackBg}
        style={navOpen ? { transform: "translateX(0)" } : undefined}
      />
    </>
  );
};

export default MobileNavbar;
