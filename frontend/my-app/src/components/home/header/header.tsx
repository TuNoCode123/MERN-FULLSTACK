import * as React from "react";
// import useEmblaCarousel from "embla-carousel-react";
// import Autoplay from "embla-carousel-autoplay";
// import Dropdown from "react-bootstrap/Dropdown";
// import "./header.scss";
// import { FaBars } from "react-icons/fa6";
// import { IoIosSearch } from "react-icons/io";
// import { MdOutlineAccountCircle } from "react-icons/md";
// import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { IntlProvider, FormattedMessage, FormattedNumber } from "react-intl";
// import {
//   exchangeLanguage,
//   selectUserInfor,
// } from "../../../redux/reducer/reducer-login";
// import { languages } from "../../../constants/languages";
// import { Link, useNavigate } from "react-router-dom";
// useEmblaCarousel.globalOptions = { loop: true };
// // const Header1 = () => {
//   const [emblaRef, emblaApi] = useEmblaCarousel({}, [Autoplay()]);
//   const nav = useNavigate();
//   const dispath = useAppDispatch();
//   const handlerChangeLanguage = (language: string) => {
//     dispath(exchangeLanguage(language));
//   };
//   const email = useAppSelector(selectUserInfor);
//   return (
//     <div className="header-content">
//       <div className="header-content-left">
//         <div className="header-content-left-bar">
//           <FaBars />
//         </div>
//         <div className="header-content-left-logo">
//           <div className="logo-img" onClick={() => nav("/")}></div>
//         </div>
//       </div>
//       <div className="header-content-center">
//         <div className="header-content-center-nav">
//           <div className="nav-list">
//             <div className="nav-child">
//               <a href="">
//                 <FormattedMessage id="Header.All" />
//               </a>
//             </div>
//             <div className="nav-child">
//               <a href="">
//                 {" "}
//                 <FormattedMessage id="Header.AtHome" />
//               </a>
//             </div>
//             <div className="nav-child">
//               <a href="">
//                 {" "}
//                 <FormattedMessage id="Header.AtHospital" />
//               </a>
//             </div>
//             <div className="nav-child">
//               <a href="">
//                 {" "}
//                 <FormattedMessage id="Header.HelthyLife" />
//               </a>
//             </div>
//           </div>
//         </div>
//         <div className="header-content-center-look">
//           <div className="center-look">
//             <div className="look-search">
//               <IoIosSearch />
//             </div>
//             <div className="look-input">
//               <input type="text" placeholder="fasdfkh" />
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="header-content-right">
//         <div className="drop-down">
//           <Dropdown>
//             <Dropdown.Toggle variant="success" id="dropdown-basic">
//               <FormattedMessage id="languages" />
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//               <Dropdown.Item
//                 onClick={() => handlerChangeLanguage(languages.vi)}
//               >
//                 VI
//               </Dropdown.Item>
//               <Dropdown.Item
//                 onClick={() => handlerChangeLanguage(languages.en)}
//               >
//                 EN
//               </Dropdown.Item>
//             </Dropdown.Menu>
//           </Dropdown>
//         </div>
//         <div className="account">
//           <Dropdown>
//             <Dropdown.Toggle variant="success" id="dropdown-basic">
//               <MdOutlineAccountCircle />
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//               <Dropdown.Item href="#/action-1">
//                 {email?.data?.email}
//               </Dropdown.Item>
//               <Dropdown.Item href="#/action-2">
//                 {" "}
//                 <FormattedMessage id="overview" />
//               </Dropdown.Item>
//               <Link to="/chat" className="dropdown-item">
//                 {" "}
//                 <span>Chat để hỗ trợ</span>
//               </Link>
//             </Dropdown.Menu>
//           </Dropdown>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Header1;
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { styled, alpha } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Link from "@mui/material/Link";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import { Link as RouterLink } from "react-router-dom";
import uk from "../../../assert/united-kingdom.png";
import vn from "../../../assert/vietnam.png";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import {
  exchangeLanguage,
  selectLanguage,
  selectUserInfor,
} from "../../../redux/reducer/reducer-login";
const pages = [
  "Header.All",
  "Header.AtHome",
  "Header.AtHospital",
  "Header.HelthyLife",
];

function Header() {
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const dispath = useAppDispatch();
  const languageChose = useAppSelector(selectLanguage);
  const user = useAppSelector(selectUserInfor);
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  let settings = ["Chat Support", "Log Out"];
  if (user && user.data && user.data.email) {
    settings = [user.data.email, ...settings];
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number,
    language: string
  ) => {
    dispath(exchangeLanguage(language));
    setSelectedIndex(index);
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const options = ["EN", "VI"];
  return (
    <AppBar position="static" sx={{ background: "#edfffa", color: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link
              component={RouterLink}
              to="/"
              underline="none"
              color="inherit"
            >
              Logo
            </Link>
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" sx={{ color: "black" }}>
                    <FormattedMessage id={page} />
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",
              },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "black",
                  display: "block",
                }}
              >
                <FormattedMessage id={page} />
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              background: "white",
              color: "black",
              marginRight: "100px",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
              borderRadius: "10px",
            }}
          >
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder={languageChose == "en" ? "Search…" : "Tìm Kiếm..."}
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>
          <Box>
            {languageChose == "vi" ? (
              <img src={vn} height={25} />
            ) : (
              <img src={uk} height={25} />
            )}
          </Box>

          <Box>
            <List
              component="nav"
              aria-label="Device settings"
              sx={{ bgcolor: "background.paper", marginRight: "20px" }}
            >
              <ListItemButton
                id="lock-button"
                aria-haspopup="listbox"
                aria-controls="lock-menu"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClickListItem}
                sx={{ height: "50px", background: "#edfffa" }}
              >
                <ListItemText
                  secondary={languageChose == "vi" ? options[1] : options[0]}
                />
              </ListItemButton>
            </List>
            <Menu
              id="lock-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "lock-button",
                role: "listbox",
              }}
            >
              {options.map((option, index) => (
                <MenuItem
                  key={option}
                  selected={index === selectedIndex}
                  onClick={(event) =>
                    handleMenuItemClick(
                      event,
                      index,
                      options[index].toLowerCase()
                    )
                  }
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => {
                if (setting == "Chat Support") {
                  return (
                    <>
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Link
                          component={RouterLink}
                          to="/chat"
                          underline="none"
                          color="inherit"
                        >
                          {setting}
                        </Link>
                      </MenuItem>
                    </>
                  );
                } else {
                  return (
                    <>
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    </>
                  );
                }
              })}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
