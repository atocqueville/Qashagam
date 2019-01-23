import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import theme from './theme.js';
import CalendarPage from './pages/CalendarPage.jsx';
import TripsPage from './pages/TripsPage.jsx';
import TopBar from './container/TopBar.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';

import './app.css';

class App extends React.Component {
    render() {

        return (
            <MuiThemeProvider theme={theme}>
                {/* <Redirect to="/calendar/resa" /> */}
                <Route exact path="/" component={Login} />
                <Route exact path="/signup" component={SignUp} />
                <Route path="/calendar" component={TopBar}/>
                <Route exact path="/calendar/resa" component={CalendarPage}/>
                <Route exact path="/calendar/trips" component={TripsPage}/>
            </MuiThemeProvider>
        );
    }
}

export default App;