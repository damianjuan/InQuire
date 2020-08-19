import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp"
import CreateSurvey from "./pages/CreateSurvey";
import HomePage from "./pages/HomePage";
import ViewResults from './pages/ViewResults';
import axios from "axios";
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [user, setUser] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    axios.get('api/checkAuthentication').then(res => {
      setUser(res.data.user);
      if (res.data.user && res.data.user.email) {
        setIsAuthenticated(true);
      }
    })
  }, []);

  // function loggedInRoutes() {
  //   if (user && user.email) {
  //     return (
  //       <>
  //         <Route path="/home/" component={HomePage} />
  //         <Route path="/create-survey/" component={CreateSurvey} />
  //         <Route path="/results/:id" component={ViewResults} />
  //       </>
  //     )
  //   } else {
  //     return (
  //       <>
  //         <Route exact path="/signup/" component={SignUp} />
  //         <Route component={Main} />
  //       </>
  //     )
  //   }

  // };

  function checkAuthentication() {
    if (user && user.email) {
      setIsAuthenticated(true);
    }
  };

  return (
    <Router>
      <Header />
      <Switch>
        <ProtectedRoute exact={true} path="/home/" component={HomePage} isAuthenticated={isAuthenticated} />
        <Route exact path="/create-survey/" component={CreateSurvey} />
        <Route exact path="/results/:id" component={ViewResults} />
        <Route exact path="/signup/" component={SignUp} />
        <Route component={Main} />
      </Switch>
    </Router>)
};


export default App;
