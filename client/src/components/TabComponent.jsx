import styles from "../styles/TabComponent.module.scss";
import { Link, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const TabComponent = ({ Tabs, baseUrl }) => {
  const { pathname } = useLocation();

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {Tabs?.map((tab, index) => {
          return (
            <Link
              key={index}
              to={`/${baseUrl}/${tab?.link}`}
              className={
                index != 0
                  ? pathname === `/${baseUrl}/${tab?.link}`
                    ? styles.active
                    : undefined
                  : pathname === `/${baseUrl}` ||
                    pathname === `/${baseUrl}/${tab?.link}`
                  ? styles.active
                  : undefined
              }
            >
              {tab?.name}
            </Link>
          );
        })}
      </div>
      <div className={styles.children}>
        <Outlet />
      </div>
    </div>
  );
};

// TabComponent.defaultProps = {
//   Tabs: [
//     {
//       name: "All",
//       link: "results",
//     },
//     {
//       name: "Create",
//       link: "create",
//     },
//   ],
// };

export default TabComponent;
