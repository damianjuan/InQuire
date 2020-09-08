import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp"
import CreateSurvey from "./pages/CreateSurvey";
import HomePage from "./pages/HomePage";
import ViewResults from './pages/ViewResults';
import ProtectedRoute from './components/ProtectedRoute';
import TakeSurvey from "./pages/TakeSurvey";
import ThankYou from "./pages/ThankYou";
import API from "./utils/API";

class App extends Component {
    // const [user, setUser] = useState();
    state = {
        currentUser: {},
        isAuthenticated: false
    };

    //verify login 
    async componentDidMount() {
        const { user } = await API.checkAuth();
        if (user && user.email) {
            this.setState({
                currentUser: user,
                isAuthenticated: true
            });
        };
    };

    //protected routes check to make sure user is logged in before allowing to continue to target, otherwise redirect to main page
    render() {
        return (
            <Router>
                <Header isAuthenticated={this.state.isAuthenticated} />
                <Switch>
                    <ProtectedRoute exact={true} path="/home/" component={HomePage} isAuthenticated={this.state.isAuthenticated} />
                    <ProtectedRoute exact={true} path="/create-survey/" component={CreateSurvey} isAuthenticated={this.state.isAuthenticated} />
                    <Route exact path="/results/:id" component={ViewResults} />
                    <Route exact path="/take-survey/:id" component={TakeSurvey} />
                    <Route exact path="/signup/" component={SignUp} />
                    <Route exact path="/thankyou/" component={ThankYou} />
                    <Route path="/" component={Main} />
                </Switch>
            </Router>
        );
    }
};

export default App;
