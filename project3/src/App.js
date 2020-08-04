import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TailWindTest from './pages/TailWindTest';
import NoMatch from './pages/NoMatch';
import TestPage2 from './pages/TestPage2';

function App() {
  return (
    <Router>
      <div>

        <Switch>
          <Route exact path={"/"}>
            <TailWindTest />
          </Route>
          <Route exact path="/page2">
            <TestPage2 />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
