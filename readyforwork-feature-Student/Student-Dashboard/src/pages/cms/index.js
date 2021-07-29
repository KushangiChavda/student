import React from 'react';
import { Route, Switch } from 'react-router-dom';
import List from './List';
import AddEdit from './AddEdit';

const CMS = ({ match }) => {
  const { path } = match;
  return (
      <Switch>
          <Route exact path={path} component={List} />
          <Route exact path={`${path}/add`} component={AddEdit} />
          <Route path={`${path}/edit/:id`} component={AddEdit} />
          <Route path={`${path}/:namespace`} component={List} />
      </Switch>
  );
}

export default CMS;