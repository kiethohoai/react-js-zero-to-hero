import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./redux/store";
import { Provider } from "react-redux";
import Layout from "./Layout";
import { BrowserRouter } from "react-router-dom";
import "nprogress/nprogress.css";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </Provider>,
);

reportWebVitals();

// Backup
// {
//   <React.StrictMode>
//          <App />
//       </React.StrictMode>
// }