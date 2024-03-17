import "./App.scss";
import "./btn.scss";
import "./input.scss";
import './i18n';

import React, { useContext, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";

import BaseScreen from "./screens/baseScreen/BaseScreen";
import AdminScreen from "./screens/adminScreen/AdminScreen";
import AccountValidateScreen from "./screens/accountValidateScreen/AccountValidateScreen";

import ContactScreen from "./screens/contactScreen/ContactScreen";
import TermScreen from "./screens/termScreen/TermScreen";
import PrivacyScreen from './screens/privacyScreen/PrivacyScreen'

import CartScreen from "./screens/cartScreen/CartScreen";
import NotFoundScreen from "./screens/notFoundScreen/NotFoundScreen";
import LoadingSpinner from "./components/loadingSpinner/LoadingSpinner";
import SettingsScreen from "./screens/settingsScreen/SettingsScreen";
import TrollScreen from "./screens/trollScreen/TrollScreen";

const HomeScreen = React.lazy(() => import('./screens/homeScreen/HomeScreen'));
const AccountScreen = React.lazy(() => import('./screens/accountScreen/AccountScreen'));
const CategoryScreen = React.lazy(() => import('./screens/categoryScreen/CategoryScreen'));
const SingleCategoryScreen = React.lazy(() => import('./screens/singleCategoryScreen/SingleCategoryScreen'));

function App() {

  const { auth } = useContext(AuthContext);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BaseScreen />}>

            <Route index element={
              <Suspense fallback={<LoadingSpinner />}>
                <HomeScreen />
              </Suspense>
            } />

            <Route path="category" element={
              <Suspense fallback={<LoadingSpinner />}>
                <CategoryScreen />
              </Suspense>
            } />

            <Route path="category/:id" element={
              <Suspense fallback={<LoadingSpinner />}>
                <SingleCategoryScreen />
              </Suspense>
            } />

            <Route path="admin" element={<TrollScreen />} />
            <Route path="settings" element={<SettingsScreen />} />
            <Route path="cart" element={<CartScreen />} />

            <Route path="contact" element={<ContactScreen />} />
            <Route path="terms" element={<TermScreen />} />
            <Route path="privacy" element={<PrivacyScreen />} />
            
            {auth.role === 4 && (
              <Route path="managerPanel" element={<AdminScreen />} />
            )}

            {auth.role > 0 && (
              <Route path="account" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <AccountScreen />
                </Suspense>
              } />
            )}

            {auth.role === 0 && (
              <Route
                path="account/validate/:token"
                element={<AccountValidateScreen />}
              />
            )}

            <Route path='*' element={
              <NotFoundScreen />
            } />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;