import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";

import {
  Login,
  Dashboard,
  ForgotPassword,
  // AddUser,
  //EditUser,
  // UsersList,
  // AddCourse,
  // EditCourse,
  PasswordReset,
  NotFound,
  EditUser,
  RequestMentor,
  JoinCommunity,
  Announcements,
  FeedBack,
  ClassRoom,
  // Assessment,
  // AssessmentList,
  Assessment,
  // CoursesList,
} from "./pages";
// import AddAssessment from "./Assessment/AddAssessment";
import { LayoutWrapper, PrivateRoute, PublicRoute } from "./components";
import { useQuery, login } from "./utils";
import Alerts from "./Alerts";
import ViewClassRoom from "./pages/Classroom/ViewClassRoom";
import Temp from "./pages/Profile/Temp";
import Template1 from "./pages/Templates/Template1";

const PublicLayout = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const query = useQuery();
  React.useEffect(() => {
    let authtoken = query.get("authtoken") || null;
    let role = query.get("role") || null;
    if (authtoken && role) {
      login({ authtoken, role }).then(() => history.push("/"));
    }
  }, [history, query]);
  return (
    <LayoutWrapper>
      <Switch>
        <PrivateRoute path="/join-community" component={JoinCommunity} />
        <PrivateRoute path="/update-profile" component={EditUser} />
        <PrivateRoute path="/request-mentor" component={RequestMentor} />
        <PrivateRoute path="/announcements" component={Announcements} />
        <PrivateRoute path="/feedback" component={FeedBack} />
        <PrivateRoute path="/classroom" component={ClassRoom} />
        <PrivateRoute path="/my-projects" />
        <PrivateRoute path="/my-assessments" component={Assessment} />
        <PrivateRoute path="/courses/:id/lesson" component={ViewClassRoom} />
        <PrivateRoute path="/download-resume" component={Temp} />
        <PrivateRoute path="/temp1" component={Template1} />
        {/* <PrivateRoute path="/my-assessments/add" component={AddAssessment} /> */}
        {/* http://localhost:3001/learner/my-assessments/add */}
        {/* <PrivateRoute path="/users/edit/:id" component={EditUser} /> */}
        {/* <PrivateRoute exact path="/users" component={UsersList} restricted={isAdmin} NotFoundPage={NotFound} />
        <PrivateRoute path="/users/edit/:id" component={EditUser} restricted={isAdmin} NotFoundPage={NotFound} />
        <PrivateRoute path="/users/add" component={AddUser} restricted={isAdmin} NotFoundPage={NotFound} />
        <PrivateRoute exact path="/courses" component={CoursesList} restricted={isAdmin} NotFoundPage={NotFound} />
        <PrivateRoute path="/courses/add" component={AddCourse} restricted={isAdmin} NotFoundPage={NotFound} />
        <PrivateRoute path="/courses/edit/:id" component={EditCourse} restricted={isAdmin} NotFoundPage={NotFound} />
        <PrivateRoute path="/testimonials" component={Testimonials} restricted={isAdmin} NotFoundPage={NotFound} />
        <PrivateRoute path="/services" component={Services} restricted={isAdmin} NotFoundPage={NotFound} />
        <PrivateRoute path="/blogs" component={Blogs} restricted={isAdmin} NotFoundPage={NotFound} />
        <PrivateRoute path="/settings" component={Settings} restricted={isAdmin} NotFoundPage={NotFound} />
        <PrivateRoute path="/questions" component={Questions} restricted={isAdmin} NotFoundPage={NotFound} />
        <PrivateRoute path="/tracks" component={Tracks} restricted={isAdmin} NotFoundPage={NotFound} />
        <PrivateRoute path="/assessments" component={Assessment} restricted={isAdmin} NotFoundPage={NotFound} />
        <PrivateRoute path="/inquiries" component={ContactUs} restricted={isAdmin} NotFoundPage={NotFound} />
        <PrivateRoute path="/cms" component={CMS} restricted={isAdmin} NotFoundPage={NotFound} /> */}
        <PrivateRoute
          exact
          path="/"
          component={Dashboard}
          // restricted={isAdmin}
        />
        <Redirect to={{ pathname: pathname, state: "404" }} />
      </Switch>
    </LayoutWrapper>
  );
};

const App = () => {
  return (
    <Router>
      <Alerts />
      <Router basename={"/learner"}>
        <Switch>
          <PublicRoute
            exact
            path="/forgotPassword"
            component={ForgotPassword}
          />
          <PublicRoute exact path="/passwordReset" component={PasswordReset} />
          <PublicRoute exact path="/login" component={Login} redirect={"/"} />
          <PublicRoute exact path="/404" component={NotFound} />
          <Route path="/" component={PublicLayout} />
        </Switch>
      </Router>
    </Router>
  );
};

export default App;
