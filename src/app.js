import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import './app.css';
import Home from './pages/home';
import About from './pages/about';

function App() {
  return (
    <Box height={1}>
      <Switch>
        <Route exact path="/" component={About} />
        <Route path="/about" component={About} />
        <Route path="/home" component={Home} />
        <Redirect to="/" />
      </Switch>
    </Box>
  );
}

const WrappedApp = withRouter(App);

export default () => {
  // While the blocklet is deploy to a sub path, this will be work properly.
  const basename = window?.blocklet?.prefix || '/';

  return (
    <Router basename={basename}>
      <WrappedApp />
    </Router>
  );
};
