import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BaseScreen from "./screens/baseScreen/BaseScreen";
import HomeScreen from "./screens/homeScreen/HomeScreen";
import ProductScreen from "./screens/productScreen/ProductScreen";
import ContactScreen from "./screens/contactScreen/ContactScreen";
import ProfileScreen from "./screens/profileScreen/ProfileScreen";
import CartScreen from "./screens/cartScreen/CartScreen";
import LoginScreen from "./screens/loginScreen/LoginScreen";
import RegisterScreen from "./screens/registerScreen/RegisterScreen";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BaseScreen />}>
            <Route index element={<HomeScreen />} />
            <Route path="/product" element={<ProductScreen />} />
            <Route path="/contact" element={<ContactScreen />} />
            <Route path="/profile" element={<ProfileScreen />}/>
            <Route path="/cart" element={<CartScreen />}/>
            <Route path="/login" element={<LoginScreen />}/>
            <Route path="/register" element={<RegisterScreen />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
