import "./index.css";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./contexts/AuthContext";
import ThemeContextProvider from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(

  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>

);

reportWebVitals();