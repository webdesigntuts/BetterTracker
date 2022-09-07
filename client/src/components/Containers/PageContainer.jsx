import styles from "../../styles/Containers/PageContainer.module.scss";

const PageContainer = ({ children, optionClass }) => {
  return <div className={`${styles.container} ${optionClass}`}>{children}</div>;
};

PageContainer.defaultProps = {
  optionClass: undefined,
};

export default PageContainer;
