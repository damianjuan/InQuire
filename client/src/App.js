import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Main from "./pages/Main";
import CreateSurvey from "./pages/CreateSurvey";

function App() {
  return (
    <Router>
        <Header />
        <Switch>
            <Route exact path="/create-survey/" component={CreateSurvey} />
            <Route path="*" component={Main} />
        </Switch>
    </Router>
  );
}

export default App;
