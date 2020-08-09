import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp"
import CreateSurvey from "./pages/CreateSurvey";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/create-survey/" component={CreateSurvey} />
        <Route exact path="/signup/" component={SignUp} />
        <Route path="*" component={Main} />
      </Switch>
    </Router>
  );
}

export default App;
