import { NavLink } from "react-router-dom";
import styles from "../../styles/Navbar/ListItemLink.module.scss";

const ListItemLink = ({
  url,
  children,
  clickHandler,
  optionClass,
  isButton,
}) => {
  return (
    <li className={`${styles.listItem} ${optionClass}`} onClick={clickHandler}>
      {!isButton ? (
        <NavLink
          to={`/${url}`}
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          {children}
        </NavLink>
      ) : (
        <button onClick={clickHandler}>{children}</button>
      )}
    </li>
  );
};

ListItemLink.defaultProps = {
  url: "",
  optionClass: undefined,
  isButton: false,
};

export default ListItemLink;
