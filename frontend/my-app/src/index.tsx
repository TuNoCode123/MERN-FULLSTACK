import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { IntlProvider, FormattedMessage, FormattedNumber } from "react-intl";
import { useAppSelector } from "./redux/hook";
import { selectLanguage } from "./redux/reducer/reducer-login";
import AppIntl from "./index-intL";
import ChatApp from "./components/context/context-chat";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ChatApp>
        <AppIntl>
          <App />
        </AppIntl>
      </ChatApp>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
