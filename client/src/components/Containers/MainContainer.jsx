import styles from "../../styles/Containers/MainContainer.module.scss";

const MainContainer = ({ children, optionClass }) => {
  return <div className={`${styles.container} ${optionClass}`}>{children}</div>;
};

MainContainer.defaultProps = {
  optionClass: undefined,
};

export default MainContainer;
