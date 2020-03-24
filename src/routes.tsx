import React from 'react';
import { Layout } from 'antd';
import { Redirect, Route, Switch } from 'react-router';

import Pockets from './modules/pockets';
import Widget from './modules/widget';

const Routes: React.FC = () => (
  <Layout.Content>
    <Switch>
      <Route exact path="/" component={Pockets} />
      <Route exact path="/widget" component={Widget} />
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  </Layout.Content>
);

export default Routes;
