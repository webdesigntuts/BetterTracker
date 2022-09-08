import styles from "../styles/TabComponent.module.scss";
import { Link, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

const TabComponent = ({ Tabs, baseUrl }) => {
  const { pathname } = useLocation();
  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {Tabs?.map((tab, index) => (
          <Link
            key={index}
            to={`/${baseUrl}/${tab?.link}`}
            className={
              `/${baseUrl}/${tab?.link}` === pathname ? styles.active : ""
            }
          >
            {tab?.name}
          </Link>
        ))}
      </div>
      <div className={styles.children}>
        <Outlet />
      </div>
    </div>
  );
};

TabComponent.defaultProps = {
  Tabs: [
    {
      name: "All",
      link: "results",
    },
    {
      name: "Create",
      link: "create",
    },
  ],
};

export default TabComponent;
