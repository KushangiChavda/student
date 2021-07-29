import React from "react";
import { useLocation, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
} from "@material-ui/core";
import IconExpandLess from "@material-ui/icons/ExpandLess";
import IconExpandMore from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  icon: {
    display: "inline-block",
    minWidth: "1.75rem",
    paddingBottom: ".125em",
    fontSize: "1.25rem",
    lineHeight: "1.40625rem",
    verticalAlign: "middle",
    color: "#7f8387",
    transition: "all .4s",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const initialState = [
  {
    path: "/",
    icon: "bx bxs-edit",
    name: "Dashboard",
  },
  {
    path: "/join-community",
    icon: "bx bx-group",
    name: "Join Community",
  },
  {
    path: "/download-resume",
    icon: "bx bx-download",
    name: "Download Resume",
  },
  {
    path: "/request-mentor",
    icon: "bx bxs-user-voice",
    name: "Request Mentor",
  },
  {
    path: "/announcements",
    icon: "bx bxs-megaphone",
    name: "Announcements",
  },
  {
    path: "/feedback",
    icon: "bx bx-message-alt-dots",
    name: "Feedback",
  },
  {
    path: "/classroom",
    icon: "bx bx-id-card",
    name: "Enter Classroom",
  },
  {
    name: "Workstation",
    icon: "bx bx-folder-plus",
    routes: [
      {
        path: "/my-projects",
        icon: "bx bx-spreadsheet",
        name: "My Projects",
      },
      {
        path: "/my-assessments",
        icon: "bx bx-clipboard",
        name: "My Assessments",
      },
    ],
  },
];

const ListItemWithLink = (props) => {
  const { icon, primary, to, isNested = false, onChange } = props;
  const { pathname: _p } = useLocation();
  const pathname =
    _p.trim().length > 1 && _p.endsWith("/") ? _p.slice(0, -1) : _p;
  const checkActive = (n) => pathname === n;

  const CustomLink = React.useMemo(
    () =>
      React.forwardRef((linkProps, ref) => (
        <Link ref={ref} to={to} {...linkProps} />
      )),
    [to]
  );

  return (
    <ListItem
      selected={checkActive(to)}
      onClick={onChange}
      style={{ ...(isNested ? {} : {}), color: "inherit !important" }}
      button
      component={CustomLink}
    >
      {icon && <ListItemIcon style={{ minWidth: "auto" }}>{icon}</ListItemIcon>}
      <ListItemText primary={primary} />
    </ListItem>
  );
};

const NavigationMenu = ({ onChange }) => {
  const classes = useStyles();
  const [adminRoutes] = React.useState([...initialState]);

  return (
    <div className={classes.root}>
      {adminRoutes &&
        adminRoutes.map(({ path, icon = null, name, routes = null }, n) => {
          if (!routes || routes.length < 0) {
            return (
              <ListItemWithLink
                key={n}
                to={path}
                primary={name}
                icon={<i className={`${classes.icon} ${icon}`}></i>}
                onChange={onChange}
              />
            );
          }
          return (
            <CustomColleps
              key={n}
              name={name}
              routes={routes}
              icon={
                !icon ? null : <i className={`${classes.icon} ${icon}`}></i>
              }
              onChange={onChange}
            />
          );
        })}
    </div>
  );
};

const CustomColleps = ({ routes, name, icon, onChange }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { pathname: _p } = useLocation();
  const pathname = _p.endsWith("/") ? _p.slice(0, -1) : _p;
  const checkOpen = (n) =>
    n && n.length > 0 ? n.some(({ path }) => pathname === path) : false;
  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  React.useEffect(() => {
    return setOpen(checkOpen(routes));
    // eslint-disable-next-line
  }, [routes]);
  return (
    <>
      <ListItem button onClick={handleClick} className={classes.menuItem}>
        <ListItemIcon
          className={classes.menuItemIcon}
          style={{ minWidth: "auto" }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText primary={name} />
        {open ? <IconExpandLess /> : <IconExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Divider />
        <List component="div" disablePadding style={{ paddingLeft: "30px" }}>
          {routes &&
            routes.map(({ path, icon = null, name, routes = null }, nIndex) => {
              if (routes && routes.length > 0) {
                return (
                  <CustomColleps
                    key={nIndex}
                    name={name}
                    routes={routes}
                    icon={
                      !icon ? null : (
                        <i className={`${classes.icon} ${icon}`}></i>
                      )
                    }
                    onChange={onChange}
                  />
                );
              }
              return (
                <ListItemWithLink
                  onChange={onChange}
                  key={nIndex}
                  isNested={true}
                  to={path}
                  primary={name}
                  icon={
                    !icon ? null : <i className={`${classes.icon} ${icon}`}></i>
                  }
                />
              );
            })}
        </List>
      </Collapse>
    </>
  );
};

export default NavigationMenu;
