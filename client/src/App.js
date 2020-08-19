import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp"
import CreateSurvey from "./pages/CreateSurvey";
import HomePage from "./pages/HomePage";
import ViewResults from './pages/ViewResults';
import axios from "axios";

function App() {


  const [user, setUser] = useState();

  useEffect(() => {
    axios.get('api/checkAuthentication').then(res => {
      setUser(res.data.user);
    })
  }, []);

  function loggedInRoutes() {
    if (user && user.email) {
      return (
        <>
          <Route path="/home/" component={HomePage} />
          <Route path="/create-survey/" component={CreateSurvey} />
          <Route path="/results/:id" component={ViewResults} />
        </>
      )
    } else {
      return (
        <>
          <Route exact path="/signup/" component={SignUp} />
          <Route component={Main} />
        </>
      )
    }

  };


  return (
    <Router>
      <Header />
      <Switch>
        {
          user ? (
            <Route path="/home/" component={HomePage} />
            <Route path="/create-survey/" component={CreateSurvey} />
            <Route path="/results/:id" component={ViewResults} />
         ) : (
              <Route exact path="/signup/" component={SignUp} />
              <Route component={Main} />
         )
        }
      </Switch>
    </Router>)
};


export default App;
