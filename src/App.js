import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BaseScreen from "./screens/baseScreen/BaseScreen";
import HomeScreen from "./screens/homeScreen/HomeScreen";
import ProductScreen from "./screens/productScreen/ProductScreen";
import ContactScreen from "./screens/contactScreen/ContactScreen";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BaseScreen />}>
            <Route index element={<HomeScreen />} />
            <Route path="/product" element={<ProductScreen />} />
            <Route path="/contact" element={<ContactScreen />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
