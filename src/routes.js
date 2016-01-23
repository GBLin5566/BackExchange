import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Profile from './components/Profile';
import FriendList from './components/FriendList';
import NotFound from './components/NotFound';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/profile" component={Profile} />
    <Route path="/friends" component={FriendList} />
    <Redirect from="/abc" to="/" />
    <Route path="*" component={NotFound} />
  </Route>
);
