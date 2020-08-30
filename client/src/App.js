import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp"
import CreateSurvey from "./pages/CreateSurvey";
import HomePage from "./pages/HomePage";
import ViewResults from './pages/ViewResults';
import axios from "axios";
import ProtectedRoute from './components/ProtectedRoute';
import TakeSurvey from "./pages/TakeSurvey";
import ThankYou from "./pages/ThankYou";

function App() {
    // const [user, setUser] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    //verify login 
    useEffect(() => {
        axios.get('api/checkAuthentication').then(res => {
            // setUser(res.data.user);
            if (res.data.user && res.data.user.email) {
                setIsAuthenticated(true);
            }
        })
    }, []);

    //protected routes check to make sure user is logged in before allowing to continue to target, otherwise redirect to main page
    return (
        <Router>
            <Header isAuthenticated={isAuthenticated} />
            <Switch>
                <ProtectedRoute exact={true} path="/home/" component={HomePage} isAuthenticated={isAuthenticated} />
                <ProtectedRoute exact={true} path="/create-survey/" component={CreateSurvey} isAuthenticated={isAuthenticated} />
                <Route exact path="/results/:id" component={ViewResults} />
                <Route exact path="/take-survey/:id" component={TakeSurvey} />
                <Route exact path="/signup/" component={SignUp} />
                <Route exact path="/thankyou/" component={ThankYou} />
                <Route path="/" component={Main} />
            </Switch>
        </Router>)
};

export default App;
