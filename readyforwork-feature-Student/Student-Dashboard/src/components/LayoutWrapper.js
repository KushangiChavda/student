import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { NavigationMenu, Footer } from "./";
import { logout as removeToken } from "../utils";
import {
  logout as logoutAction,
  login as loginAction,
} from "../Stores/User/actions";
import API from "../api";
import api from "../api";
import NotFound from "../pages/notFound";
import { withStyles } from "@material-ui/core/styles";
import { Avatar, Menu, MenuItem, Badge, Typography } from "@material-ui/core";
// active
const LayoutWrapper = (props) => {
  // const [user, setUser] = useState();
  const { children } = props;
  const { state } = useLocation();
  const history = useHistory();
  const { user } = useSelector((state) => state.userProviderReducer);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAnnounceClick = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloses = () => {
    setAnchorEl1(null);
  };
  const [announcements, setAnnouncements] = useState([]);
  const getAnnouncements = () => {
    api
      .get("/announcements")
      .then((res) => {
        let announcementsData = res.data.announcements
          // .filter(({ isDeleted }) => isDeleted === false)
          .map((u) => {
            return { select: false, id: u._id, ...u };
          });
        return setAnnouncements(announcementsData);
      })
      .catch((err) => {
        console.log(err);
        return setAnnouncements([]);
      });
  };
  useEffect(getAnnouncements, []);
  useEffect(() => {
    const { firstName = null, lastName = null } = user || {};
    if ((!firstName || !lastName) && !state) {
      API.get("/profile")
        .then((res) => {
          if (res.status === 200) {
            return dispatch(loginAction(res.data.user));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line
  }, []);

  if (state === "404") return <NotFound />;

  const logout = () => {
    dispatch(logoutAction());
    removeToken().then(() => {
      history.push("/login");
    });
  };

  const handleToggleNav = (e) => {
    // e.preventDefault();
    const { classList } = document.body;
    classList.toggle("sidebar-enable");
    // 992 <= window.innerWidth ? classList.toggle("vertical-collpsed") : classList.remove("vertical-collpsed");
    return true;
  };

  const handleGoBack = () => {
    history.goBack();
  };

  const StyledMenu = withStyles({
    paper: {
      border: "1px solid #d3d4d5",
      width: "auto",
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      {...props}
    />
  ));
  const StyledMenuItem = withStyles((theme) => ({
    root: {
      "&:focus": {
        backgroundColor: theme.palette.primary.main,
        "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

  return (
    <>
      <div id="layout-wrapper">
        <header id="page-topbar">
          <div className="navbar-header">
            <div className="d-flex">
              {/* LOGO */}
              <div className="navbar-brand-box">
                <Link to="/" className="logo logo-dark">
                  <span className="logo-sm">
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/images/readyforwork-logo.png`}
                      alt="logo light"
                      height={22}
                      style={{ transform: "translateX(-25%)" }}
                    />
                  </span>
                  <span className="logo-lg">
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/images/readyforwork-logo.png`}
                      alt="logo light"
                      height={70}
                    />
                  </span>
                </Link>
                <Link to="/" className="logo logo-light">
                  <span className="logo-sm">
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/images/readyforwork-logo.png`}
                      alt="logo light"
                      height={22}
                      style={{ transform: "translateX(-25%)" }}
                    />
                  </span>
                  <span className="logo-lg">
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/images/readyforwork-logo.png`}
                      alt="logo light"
                      height={70}
                    />
                  </span>
                </Link>
              </div>
              <button
                onClick={handleToggleNav}
                type="button"
                className="btn btn-sm px-3 font-size-16 header-item waves-effect"
                id="vertical-menu-btn"
              >
                <i className="fa fa-fw fa-bars" />
              </button>
              <button
                onClick={handleGoBack}
                type="button"
                className="btn btn-sm px-3 font-size-16 header-item waves-effect"
                id="vertical-menu-btn"
              >
                Go Back
                {/* <i className="fa fa-fw fa-bars" /> */}
              </button>
            </div>
            <div className="d-flex">
              <div className="dropdown d-inline-block d-lg-none ms-2">
                <div
                  className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                  aria-labelledby="page-header-search-dropdown"
                >
                  <form className="p-3">
                    <div className="form-group m-0">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search ..."
                          aria-label="Recipient's username"
                        />
                        <div className="input-group-append">
                          <button className="btn btn-primary" type="submit">
                            <i className="mdi mdi-magnify" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="d-flex">
                <div
                  style={{ color: "black" }}
                  className="d-flex"
                  onClick={handleAnnounceClick}
                >
                  <button className="btn header-item waves-effect">
                    <Badge variant="dot" color="primary">
                      <i className="bx bxs-bell font-size-20" />
                    </Badge>
                  </button>
                </div>
                <div onClick={handleClick}>
                  <button
                    type="button"
                    className="btn header-item waves-effect"
                  >
                    {user?.profile && (
                      <Avatar
                        src={`${process.env.REACT_APP_IMG_PUBLIC_URL}${user?.profile}`}
                      />
                    )}
                  </button>
                  <span
                    className="d-xl-inline-block ms-1"
                    key="t-henry"
                    style={{ cursor: "pointer" }}
                  >
                    {user ? `${user.firstName}` : "Guest"} &nbsp;
                    {user ? `${user.lastName}` : "Guest"}
                    <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                  </span>
                </div>
              </div>

              <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                //keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Link className="dropdown-item" to="/update-profile">
                  <i className="bx bx-user font-size-16 align-middle me-1" />{" "}
                  <span key="t-profile" onClick={handleClose}>
                    {" "}
                    My Profile
                  </span>
                </Link>

                <div className="dropdown-divider" />

                <a
                  className="dropdown-item text-danger"
                  href="#"
                  onClick={logout}
                >
                  <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />{" "}
                  <span key="t-logout">Logout</span>
                </a>
              </StyledMenu>

              <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl1}
                keepMounted
                open={Boolean(anchorEl1)}
                onClose={handleCloses}
              >
                <Typography
                  variant="h6"
                  style={{ fontWeight: 600, paddingLeft: "1rem" }}
                >
                  Announcements
                </Typography>
                <StyledMenuItem>
                  <div>
                    {announcements &&
                      announcements.slice(0, 3).map((announcement, i) => (
                        <div style={{ display: "flex" }}>
                          <img
                            src={
                              announcement?.track?.image ||
                              `${process.env.PUBLIC_URL}/assets/images/readyforwork-logo.png`
                            }
                            alt=""
                            className="avatar-sm"
                          />
                          <span
                            className="card"
                            key={i}
                            // style={{ padding: "0.5rem" }}
                          >
                            <p>{announcement?.title}</p>{" "}
                          </span>
                        </div>
                      ))}
                    <Link to="/announcements" className="btn btn-primary">
                      View All
                    </Link>
                  </div>
                  {/* <div className="media">
                      <div className="avatar-xs me-3">
                          <span className="avatar-title bg-primary rounded-circle font-size-16">
                              <i className="bx bx-cart"></i>
                          </span>
                      </div>
                      <div className="media-body">
                          <h6 className="mt-0 mb-1" key="t-your-order">Your order is placed</h6>
                          <div className="font-size-12 text-muted">
                              <p className="mb-1" key="t-grammer">If several languages coalesce the grammar</p>
                              <p className="mb-0"><i className="mdi mdi-clock-outline"></i> <span key="t-min-ago">3 min ago</span></p>
                          </div>
                      </div>
                  </div> */}
                </StyledMenuItem>
              </StyledMenu>
            </div>
          </div>
        </header>
        {/* ========== Left Sidebar Start ========== */}
        <div style={{ overflowY: "auto" }} className="vertical-menu">
          <div data-simplebar className="h-100">
            {/*- Sidemenu */}
            <div id="sidebar-menu">
              {/* Left Menu Start */}
              <NavigationMenu onChange={handleToggleNav} />
            </div>
            {/* Sidebar */}
          </div>
        </div>

        <div className="main-content">
          <div className="page-content">{children && children}</div>
          <Footer />
        </div>
        {/* end main content*/}
      </div>
    </>
  );
};

export default LayoutWrapper;
