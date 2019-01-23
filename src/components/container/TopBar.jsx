import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import {
    Drawer, AppBar, Toolbar, Typography,
    IconButton
}  from '@material-ui/core';

import Routes from '../pages/Routes.jsx';

const styles = () => ({
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    drawerPaper: {
        width: 240
    }
});

class TopBar extends React.Component {
    state = {
        open: false,
    };

    handleDrawerToggle = () => {
        this.setState(state => ({ open: !state.open }));
    };

    render() {
        const { classes } = this.props;

        return(
            <Fragment>
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
                        <Typography variant="title" color="inherit">
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
                    <Routes />
                </Drawer>
            </Fragment>
        );
    }
}

export default withStyles(styles)(TopBar);
