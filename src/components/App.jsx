import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './app.css';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import theme from './theme.js';
import CalendarPage from './pages/CalendarPage.jsx';
import TripsPage from './pages/TripsPage.jsx';
import TopBar from './container/TopBar.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import AuthRoute from './atoms/AuthRoute.jsx';

import * as FirebaseAction from './redux/firebase/actions';

class App extends React.Component {
    state = {
        loadingApp: true
    };

    componentWillMount() {
        this.props.firebase.app.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ loadingApp: false });
                this.props.firebaseAction.updateUser(user, true);
                this.props.history.push('/calendar/resa');
            } else {
                this.setState({ loadingApp: false });
                this.props.firebaseAction.updateUser(undefined, false);
                this.props.history.push('/calendar/resa');
            }
        });
    }

    render() {
        const { firebase } = this.props;

        if (this.state.loadingApp) {
            return (
                <p> Loading... </p>
            );
        }

        return (
            <MuiThemeProvider theme={theme}>
                <Route exact path="/" component={Login} />
                <Route exact path="/signup" component={SignUp} />
                <AuthRoute path="/calendar" component={TopBar} authenticated={firebase.authenticated} />
                <AuthRoute exact path="/calendar/resa" component={CalendarPage} authenticated={firebase.authenticated} />
                <AuthRoute exact path="/calendar/trips" component={TripsPage} authenticated={firebase.authenticated} />
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = (state) => ({
    firebase: state.firebase
});

const mapDispatchToProps = (dispatch) => ({
    firebaseAction: bindActionCreators(FirebaseAction, dispatch)
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App));