import { IntlProvider } from "react-intl";
import App from "./App";
import { getLanguages } from "./util/getMessage";
import { useAppSelector } from "./redux/hook";
import { selectLanguage } from "./redux/reducer/reducer-login";
const AppIntl = ({ children }: { children: JSX.Element }) => {
  const choseLanguage = useAppSelector(selectLanguage);
  const message = getLanguages(choseLanguage);
  return (
    <IntlProvider messages={message} locale={choseLanguage} defaultLocale="vi">
      {children}
    </IntlProvider>
  );
};
export default AppIntl;
