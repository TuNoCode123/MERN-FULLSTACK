import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Dropdown from "react-bootstrap/Dropdown";
import "./header.scss";
import { FaBars } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineAccountCircle } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { IntlProvider, FormattedMessage, FormattedNumber } from "react-intl";
import {
  exchangeLanguage,
  selectUserInfor,
} from "../../../redux/reducer/reducer-login";
import { languages } from "../../../constants/languages";
useEmblaCarousel.globalOptions = { loop: true };
const Header = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({}, [Autoplay()]);
  const dispath = useAppDispatch();
  const handlerChangeLanguage = (language: string) => {
    dispath(exchangeLanguage(language));
  };
  const email = useAppSelector(selectUserInfor);
  return (
    <div className="header-content">
      <div className="header-content-left">
        <div className="header-content-left-bar">
          <FaBars />
        </div>
        <div className="header-content-left-logo">
          <div className="logo-img"></div>
        </div>
      </div>
      <div className="header-content-center">
        <div className="header-content-center-nav">
          <div className="nav-list">
            <div className="nav-child">
              <a href="">
                <FormattedMessage id="Header.All" />
              </a>
            </div>
            <div className="nav-child">
              <a href="">
                {" "}
                <FormattedMessage id="Header.AtHome" />
              </a>
            </div>
            <div className="nav-child">
              <a href="">
                {" "}
                <FormattedMessage id="Header.AtHospital" />
              </a>
            </div>
            <div className="nav-child">
              <a href="">
                {" "}
                <FormattedMessage id="Header.HelthyLife" />
              </a>
            </div>
          </div>
        </div>
        <div className="header-content-center-look">
          <div className="center-look">
            <div className="look-search">
              <IoIosSearch />
            </div>
            <div className="look-input">
              <input type="text" placeholder="fasdfkh" />
            </div>
          </div>
        </div>
      </div>
      <div className="header-content-right">
        <div className="drop-down">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <FormattedMessage id="languages" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => handlerChangeLanguage(languages.vi)}
              >
                VI
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handlerChangeLanguage(languages.en)}
              >
                EN
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="account">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <MdOutlineAccountCircle />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">
                {email.data?.email}
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2">
                {" "}
                <FormattedMessage id="overview" />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
export default Header;
