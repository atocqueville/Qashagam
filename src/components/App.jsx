import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import CalendarPage from './pages/CalendarPage.jsx';
import TripsPage from './pages/TripsPage.jsx';
import ResponsiveDrawer from './container/ResponsiveDrawer.jsx';

import theme from './theme.js';
import './app.css';

const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        borderLeft: '1px solid rgba(0, 0, 0, 0.12)'
    },
});

class App extends React.Component {
    
    render() {
        const { classes } = this.props;

        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.root}>
                    <ResponsiveDrawer />
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Switch>
                            <Route exact path="/" component={CalendarPage}/>
                            <Route path="/trips" component={TripsPage}/>
                        </Switch>
                    </main>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles, { withTheme: true })(App);