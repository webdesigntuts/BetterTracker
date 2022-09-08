import styles from "../styles/TabComponent.module.scss";
import { Link, Outlet } from "react-router-dom";

const TabComponent = ({ Tabs }) => {
  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        {Tabs?.map((tab, index) => (
          <Link key={index} to={`/categories/${tab?.link}`}>
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
