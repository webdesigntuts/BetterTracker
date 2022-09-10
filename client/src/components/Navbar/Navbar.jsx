//STYLES
import styles from "../../styles/Navbar/Navbar.module.scss";

//COMPONENTS
import ListItemLink from "./ListItemLink";

//UTILS
import { Link } from "react-router-dom";

//REACT QUERY
import { useLogoutUser } from "../../queries/user";
import { queryClient } from "../../constants/config";

//HOOKS
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { mutate: logoutHandler } = useLogoutUser();

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link to="/">
          <div>Tracker</div>
        </Link>
      </div>

      {/* NAV */}
      <nav>
        <ul>
          {/* HOME */}
          <ListItemLink url="">
            <h3>Home</h3>
          </ListItemLink>

          {/* CATEGORIES */}
          <ListItemLink url="categories">
            <h3>Categories</h3>
          </ListItemLink>

          {/* TRANSACTIONS */}
          <ListItemLink url="transactions">
            <h3>Transactions</h3>
          </ListItemLink>

          {/* Wallet */}
          {/* <ListItemLink url='wallet'>
            <h3>Wallet</h3>
          </ListItemLink> */}

          {/* Profile */}
          <div className={styles.mobileMenuLinks}>
            <ListItemLink url="profile">
              <h3>Profile</h3>
            </ListItemLink>
          </div>

          {/* Settings */}
          <div className={styles.mobileMenuLinks}>
            <ListItemLink url="settings">
              <h3>Settings</h3>
            </ListItemLink>
          </div>
          <button
            className={styles.logout}
            onClick={() => {
              logoutHandler(null, {
                onSuccess: () => {
                  queryClient.removeQueries();
                  queryClient.cancelQueries();
                  navigate("/auth");
                },
              });
            }}
          >
            <span>Logout</span>
          </button>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
