import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { store, persistor } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import "react-perfect-scrollbar/dist/css/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "nprogress/nprogress.css";
import Layout from "./Layout";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
);

reportWebVitals();

// Backup
// {
//   <React.StrictMode>
//          <App />
//       </React.StrictMode>
// }