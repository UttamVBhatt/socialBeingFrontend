import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthController from "./contexts/AuthContext.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthController>
        <App />
        <ToastContainer
          position="top-center"
          hideProgressBar={false}
          newestOnTop={false}
          rtl={false}
          draggable
          className={"toaster"}
        />
      </AuthController>
    </Provider>
  </React.StrictMode>
);
