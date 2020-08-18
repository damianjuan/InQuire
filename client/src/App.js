import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp"
import CreateSurvey from "./pages/CreateSurvey";
import HomePage from "./pages/HomePage";
import ViewResults from './pages/ViewResults';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/signup/" component={SignUp} />
        <Route exact path="/home/" component={HomePage} />
        <Route exact path="/create-survey/" component={CreateSurvey} />
        <Route exact path="/results/:id" component={ViewResults} />
        <Route path="*" component={Main} />
      </Switch>
    </Router>
  );
}

export default App;
