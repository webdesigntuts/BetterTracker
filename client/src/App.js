//GLOBAL STYLES
import styles from "./styles/App.module.scss";

//REACT ROUTER
import { Routes, Route } from "react-router-dom";

//COMPONENTS
import PageContainer from "./components/Containers/PageContainer";
import MobileNavbar from "./components/Navbar/MobileNavbar";
import MainContainer from "./components/Containers/MainContainer";
import PageLayout from "./components/PageLayout";
import AuthGuard from "./components/AuthGuard";

//PAGES
import Auth from "./pages/Auth";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import TransactionsRoot from "./pages/TransactionsRoot";
//TRANSACTIONS SUBPAGES
import TransactionCreate from "./components/TransactionComponents/TransactionCreate";
import TransactionDelete from "./components/TransactionComponents/TransactionDelete";

import CategoriesRoot from "./pages/CategoriesRoot";
//CATEGORIES SUBPAGES
import Categories from "./components/CategoriesComponents/Categories";
import CategoryCreate from "./components/CategoriesComponents/CategoryCreate";
import CategoryDelete from "./components/CategoriesComponents/CategoryDelete";

//REACT QUERY
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./constants/config";

function App() {
  return (
    <div className={styles.App}>
      <QueryClientProvider client={queryClient}>
        <AuthGuard>
          <PageContainer optionClass={styles.pageContainer}>
            <div className={styles.mobileMenu}>
              <MobileNavbar />
            </div>
            <Routes>
              {/* LOGIN PAGE */}
              <Route path='/auth' element={<Auth />} />
              {/* REGISTER PAGE */}
              <Route path='/register' element={<Register />} />
              {/* PAGE LAYOUT */}
              <Route element={<PageLayout />}>
                {/* HOME */}
                <Route path='/' element={<Home />} />
                {/* SETTINGS */}
                <Route path='settings' element={<Settings />} />
                {/* PROFILE */}
                <Route path='profile' element={<Profile />} />
                {/* TRANSACTIONS */}
                <Route path='transactions' element={<TransactionsRoot />}>
                  <Route path='create' element={<TransactionCreate />} />
                  <Route path='delete' element={<TransactionDelete />} />
                </Route>
                {/* CATEGORIES */}
                <Route path='categories' element={<CategoriesRoot />}>
                  <Route path='results' element={<Categories />} />
                  <Route path='create' element={<CategoryCreate />} />
                  <Route path='delete' element={<CategoryDelete />} />
                </Route>

                {/* 404 */}
                <Route
                  path='/*'
                  element={
                    <MainContainer>
                      <span style={{ fontSize: "1.2rem" }}>
                        404 Page Not Found
                      </span>
                    </MainContainer>
                  }
                />
              </Route>
            </Routes>
          </PageContainer>
        </AuthGuard>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  );
}

export default App;
