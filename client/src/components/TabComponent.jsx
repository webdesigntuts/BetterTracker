import styles from "../styles/TabComponent.module.scss";
import { Route, Link, Outlet } from "react-router-dom";

const TabComponent = ({ children, setActiveTab, Tabs }) => {
  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {Tabs?.map((tab, index) => (
          <Link key={index} to={`/${tab}`}>
            {tab}
          </Link>
        ))}
      </div>
      <div className={styles.children}>
        <Outlet />
      </div>
    </div>
  );
};

export default TabComponent;
