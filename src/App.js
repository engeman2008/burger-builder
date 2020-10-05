import React, { Suspense, useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import * as actions from './store/actions/index';

const Logout = React.lazy(() => import('./containers/Auth/Logout/Logout'));
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Auth = React.lazy(() => import('./containers/Auth/Auth'));

const App = props => {
  useEffect(() => {
    props.onTryAutoSignup();
  },[])

  let routes = (
    <Suspense fallback={<span>Loading...</span>}>
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' />
        {/* redirect to home for any unknown request */}
      </Switch>
    </Suspense>
  )
  if (props.isAuth) {
    routes = (
      <Suspense fallback={<span>Loading</span>}>
        <Switch>
          <Route path='/logout' component={Logout} />
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/auth' component={Auth} />
          <Route path='/' exact component={BurgerBuilder} />
        </Switch>
      </Suspense>
    );
  }
  return (
    <div>
      <Layout>
        {routes}
      </Layout>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
