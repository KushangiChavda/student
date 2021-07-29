import React from 'react';
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const adminRoutes = [{
  path: '/',
  icon: 'bx bxs-home-circle',
  name: "Dashboard"
}, {
  path: '/users',
  icon: 'bx bxs-user',
  name: 'Users'
}, {
  path: '/courses',
  icon: 'bx bxs-book',
  name: 'Courses'
}, {
  path: '/testimonials',
  icon: 'bx bxs-message-square-dots',
  name: 'Testimonials'
}, {
  path: '/services',
  icon: 'bx bxs-grid',
  name: 'Services'
}, {
  path: '/blogs',
  icon: 'bx bxs-book-content',
  name: 'Blogs'
}, {
  path: '/settings',
  icon: 'bx bxs-wrench',
  name: 'Settings'
}, {
  path: '/questions',
  icon: 'bx bxs-help-circle',
  name: 'Questions'
}];

const NavigationMenu = () => {
  const { pathname } = useLocation();
  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split("/")[1];
  const { user } = useSelector((state) => state.userProviderReducer);
  const checkActive = (n) => (`/${splitLocation}` === n ? "mm-active" : "");
  const items = user?.role === "admin" ? adminRoutes : user?.role === "student" ? [adminRoutes.find(({path}) => path === '/questions')] : [];

  return <ul className="metismenu list-unstyled" id="side-menu">
    {/* <li className="menu-title" key="t-apps">Apps</li> */}

    {items && items.map(({ path, icon, name }, i) => <li className={checkActive(path)} key={i}><Link to={path} className="waves-effect"><i className={icon}></i><span key={name}>{name}</span></Link></li>)}
 
  </ul>
}

export default NavigationMenu;
