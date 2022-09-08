import styles from "../styles/TabComponent.module.scss";
import { Link, Outlet } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const TabComponent = ({ Tabs, baseUrl }) => {
  const { pathname } = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    nav(`/${baseUrl}/${Tabs[0]?.link}`);
  }, [Tabs]);

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
