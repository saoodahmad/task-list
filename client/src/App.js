import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NavBar } from './components';
import { routes } from './routes';
const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          {routes.map((route) => {
            if (route.exact) {
              return (
                <Route
                  path={route.path}
                  exact
                  component={route.component}
                  key={route.path}
                />
              );
            } else {
              return (
                <Route
                  path={route.path}
                  component={route.component}
                  key={route.path}
                />
              );
            }
          })}
        </Switch>
      </Router>
    </div>
  );
};

export default App;
