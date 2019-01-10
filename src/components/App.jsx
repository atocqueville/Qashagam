import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import MenuIcon from '@material-ui/icons/Menu';
import {
    Drawer, AppBar, Toolbar, Typography,
    IconButton
}  from '@material-ui/core';

import CalendarPage from './pages/CalendarPage.jsx';
import TripsPage from './pages/TripsPage.jsx';
import Routes from './pages/Routes.jsx';

import theme from './theme.js';
import './app.css';

const styles = () => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    drawerPaper: {
        width: 240
    }
});

class App extends React.Component {
    state = {
        open: false,
    };

    handleDrawerToggle = () => {
        this.setState(state => ({ open: !state.open }));
    };

    render() {
        const { classes } = this.props;
        const drawer = (
            <div>
                <div className={classes.toolbar} />
                <Routes />
            </div>
        );

        return (
            <MuiThemeProvider theme={theme}>
                <AppBar>
                    <Toolbar>
                        <IconButton
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="Menu"
                            onClick={this.handleDrawerToggle}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.grow}>
                            QASHAGAM
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant='temporary'
                    anchor='left'
                    classes={{ paper: classes.drawerPaper }}
                    open={this.state.open}
                    onClick={this.handleDrawerToggle}
                >
                    {drawer}
                </Drawer>
                <Switch>
                    <Route exact path="/" component={CalendarPage}/>
                    <Route path="/trips" component={TripsPage}/>
                </Switch>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles, { withTheme: true })(App);