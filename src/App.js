import "./App.css";
import "./btn.scss";
import "./input.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import BaseScreen from "./screens/baseScreen/BaseScreen";
import HomeScreen from "./screens/homeScreen/HomeScreen";
import ProductScreen from "./screens/productScreen/ProductScreen";
import ContactScreen from "./screens/contactScreen/ContactScreen";
import CartScreen from "./screens/cartScreen/CartScreen";
import RegisterScreen from "./screens/registerScreen/RegisterScreen";

import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import AdminScreen from "./screens/adminScreen/AdminScreen";
import AccountScreen from "./screens/accountScreen/AccountScreen";
import AccountValidateScreen from "./screens/accountValidateScreen/AccountValidateScreen";
import CategoryScreen from "./screens/categoryScreen/CategoryScreen";
import SingleCategoryScreen from "./screens/singleCategoryScreen/SingleCategoryScreen";

function App() {
  const { auth } = useContext(AuthContext);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BaseScreen />}>
            <Route index element={<HomeScreen />} />
            <Route path="/product" element={<ProductScreen />} />
            <Route path="/category" element={<CategoryScreen />} />

            <Route path="/category/:id" element={<SingleCategoryScreen />} />
            
            <Route path="/contact" element={<ContactScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/register" element={<RegisterScreen />} />

            {auth.role === 4 && (
              <Route path="/admin" element={<AdminScreen />} />
            )}

            {auth.role > 0 && (
              <Route path="/account" element={<AccountScreen />} />
            )}

            {auth.role === 0 && (
              <Route
                path="/account/validate/:token"
                element={<AccountValidateScreen />}
              />
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
