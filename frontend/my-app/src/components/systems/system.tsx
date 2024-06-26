import "./system.scss";
import Dropdown from "react-bootstrap/Dropdown";
import { FaSignOutAlt } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  exchangeLanguage,
  selectLanguage,
  selectUserInfor,
} from "../../redux/reducer/reducer-login";
import { IntlProvider, FormattedMessage, FormattedNumber } from "react-intl";
import { menu } from "./systemLanguge";
import { languages } from "../../constants/languages";
import { Outlet, useNavigate } from "react-router-dom";
import { PATH } from "../../constants/path";
import { Link } from "react-router-dom";
const System = () => {
  const getName = useAppSelector(selectUserInfor);
  const dispath = useAppDispatch();
  const handlerChangeLanguage = (language: string) => {
    dispath(exchangeLanguage(language));
  };
  const choseLanguage = useAppSelector(selectLanguage);
  const nav = useNavigate();
  return (
    <div className="system-container">
      <div className="system-header">
        <div className="left-system-header">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <FormattedMessage id={`${menu.user.name}`} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {menu &&
                menu.user &&
                menu.user.child.length > 0 &&
                menu.user.child.map((item, index) => {
                  return (
                    <>
                      {" "}
                      <Dropdown.Item as={Link} to={`${item.link}`}>
                        <FormattedMessage id={`${item.id}`} />
                      </Dropdown.Item>
                      {index < menu.user.child.length - 1 ? (
                        <Dropdown.Divider />
                      ) : (
                        ""
                      )}
                    </>
                  );
                })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="right-system-header">
          <div className="system-user">
            <FormattedMessage id={`${menu.leftContent.languages}`} />
            {getName && getName.errCode == 0
              ? ` ${getName.data?.firstName} ${getName.data?.lastName}`
              : ""}
          </div>
          <div className="system-languages">
            <span
              onClick={() => handlerChangeLanguage(languages.vi)}
              className={
                choseLanguage == "vi" ? "language-vi selected" : "language-vi"
              }
            >
              VI
            </span>
            <span
              onClick={() => handlerChangeLanguage(languages.en)}
              className={
                choseLanguage == "en" ? "language-en selected" : "language-en"
              }
            >
              EN
            </span>
          </div>
          <div className="system-out">
            <FaSignOutAlt onClick={() => nav(PATH.Home)} />
          </div>
        </div>
      </div>
      <div className="system-banner">
        <Outlet />
      </div>
    </div>
  );
};
export default System;
