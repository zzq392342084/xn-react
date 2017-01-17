import React from 'react';
import { Router, Route, IndexRoute, hashHistory, Redirect } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import Store from './store';
import {autobind} from 'core-decorators';
import {setAuthAction} from './actions/auth.action';
import App from './components/App/app.component';
import Manage from './components/Manage/manage.component';
//routes
import Login from './routes/Login/index';
import AccountsIndex from './routes/Accounts/index';
import AccountPostIndex from './routes/AccountsPost/index';
import DashBoardIndex from './routes/Dashboard/index';

const history = syncHistoryWithStore(hashHistory, Store);

class router extends React.Component {
  constructor(props) {
    super(props);
  }

  @autobind()
  checkLogin(next, replace) {
    let isLogin = Store.getState().auth.token;
    if (!isLogin && !this.checkLocalSession()) {
      replace('/login');
    }
  }

  @autobind()
  checkLocalSession() {
    let localToken = window.localStorage.getItem('session');
    if (localToken) {
      //verify
      const authData = JSON.parse(localToken);
      Store.dispatch(setAuthAction(authData));
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <Provider store={Store}>
        <Router history={history}>
          <Route component={App} >
            <Route path="/login" component={Login} />
            <Route path="/" component={Manage} onEnter={this.checkLogin}>
              <IndexRoute component={DashBoardIndex}/>
              <Route path="accounts" component={AccountsIndex} />
              <Route path="accounts/post" component={AccountPostIndex} />
              <Route path="accounts/edit/:id" component={AccountPostIndex} />
            </Route>
          </Route>
          <Redirect from="*" to="/" />
        </Router>
      </Provider>
    );
  }
}

export default router;
