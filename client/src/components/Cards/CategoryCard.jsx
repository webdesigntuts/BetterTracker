//STYLES
import styles from "../../styles/Cards/CategoryCard.module.scss";
import { FiBox } from "react-icons/fi";
import { IoGameControllerOutline } from "react-icons/io5";
import { BsHouseDoor } from "react-icons/bs";
import { HiOutlineFire } from "react-icons/hi";

//UTILS

const CategoryCard = ({ category, money }) => {
  const categoryStyle = () => {
    switch (category) {
      default: {
        return {
          ctg: "Other",
          icon: <HiOutlineFire style={{ color: "#ffbece" }} />,
          background: "#ff6275",
        };
      }
      case "Products":
      case 1: {
        return {
          ctg: "Products",
          icon: <FiBox style={{ color: "#fdeacc" }} />,
          background: "#f8aa35",
        };
      }

      case "Entertainment":
      case 2:
        return {
          ctg: "Entertainment",
          icon: <IoGameControllerOutline style={{ color: "#e4f1d5" }} />,
          background: "#92c44c",
        };

      case "Bills":
      case 3: {
        return {
          ctg: "Bills",
          icon: <BsHouseDoor style={{ color: "#b7dffd" }} />,
          background: "#5a92d6",
        };
      }
    }
  };

  const ctg = categoryStyle(category);

  return (
    <div className={styles.container} style={{ background: ctg?.background }}>
      <div className={styles.inner}>
        <div className={styles.iconContainer}>{ctg?.icon}</div>
        <div className={styles.info}>
          <div className={styles.title}>{ctg?.ctg}</div>
          <div className={styles.money}>{money}</div>
        </div>
      </div>
    </div>
  );
};

CategoryCard.defaultProps = {
  category: "Other",
  money: "50k",
};

export default CategoryCard;
