import TabComponent from "../components/TabComponent";
import MainContainer from "../components/Containers/MainContainer";

const CategoriesRoots = () => {
  const tabs = [
    {
      name: "All",
      link: "results",
    },
    {
      name: "Create",
      link: "create",
    },
    {
      name: "Delete",
      link: "delete",
    },
  ];

  return (
    <MainContainer>
      <TabComponent Tabs={tabs} baseUrl='categories' />
    </MainContainer>
  );
};

export default CategoriesRoots;
