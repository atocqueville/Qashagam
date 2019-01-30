import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './app.css';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme.js';

import CalendarPage from './pages/CalendarPage.jsx';
import TripsPage from './pages/TripsPage.jsx';
import Login from './pages/Login.jsx';
import LoadingPage from './pages/LoadingPage.jsx';
import SignUp from './pages/SignUp.jsx';
import TopBar from './container/TopBar.jsx';
import AuthRoute from './atoms/AuthRoute.jsx';

import firebase from './redux/firebase/initFirebase';
import * as FirebaseAction from './redux/firebase/actions';

class App extends React.Component {
    state = {
        loadingApp: true
    };

    componentWillMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.firebaseAction.updateUser(true);
                this.props.firebaseAction.getFamily(user);
                this.props.history.push('/calendar/reservation');
                this.setState({ loadingApp: false });
            } else {
                this.props.firebaseAction.updateUser(false);
                this.setState({ loadingApp: false });
            }
        });
    }

    render() {
        const { firebase } = this.props;

        if (this.state.loadingApp) {
            return (
                <LoadingPage />
            );
        }

        return (
            <MuiThemeProvider theme={theme}>
                <Route exact path='/' component={Login} />
                <Route exact path='/signup' component={SignUp} />
                <AuthRoute path='/calendar' component={TopBar} authenticated={firebase.authenticated} />
                <AuthRoute exact path='/calendar/reservation' component={CalendarPage} authenticated={firebase.authenticated} />
                <AuthRoute exact path='/calendar/trips' component={TripsPage} authenticated={firebase.authenticated} />
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