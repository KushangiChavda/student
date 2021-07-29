import React from "react";
import { Route, Switch } from "react-router-dom";
import AssessmentList from "./AssessmentList";
import AddAssessment from "./AddAssessment";

const Assessment = ({ match }) => {
  const { path } = match;
  return (
    <Switch>
      <Route exact path={path} component={AssessmentList} />
      <Route path={`${path}/add`} component={AddAssessment} />
      {/* <Route path={`${path}/edit/:id`} component={AddEdit} /> */}
    </Switch>
  );
};

export default Assessment;
