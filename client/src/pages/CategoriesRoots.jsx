import TabComponent from "../components/TabComponent";
import MainContainer from "../components/Containers/MainContainer";

const CategoriesRoots = () => {
  const tabs = ["categories", "create", "subcategories", "subroots"];

  return (
    <MainContainer>
      <TabComponent Tabs={tabs} />
    </MainContainer>
  );
};

export default CategoriesRoots;
