import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./contexts/AuthContext";
import ThemeContextProvider from "./contexts/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(

  <React.StrictMode>
    <AuthProvider>
      <ThemeContextProvider>
        <React.Suspense fallback="loading">
          <App />
        </React.Suspense>
      </ThemeContextProvider>
    </AuthProvider>
  </React.StrictMode>
  
);

reportWebVitals();