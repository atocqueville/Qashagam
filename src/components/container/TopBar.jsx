import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import DrawerLinks from '../atoms/DrawerLinks.jsx';
import * as FirebaseAction from '../redux/firebase/actions';

const styles = () => ({
    menuButton: {
        marginLeft: -12,
        marginRight: 6
    },
    drawerPaper: {
        width: 240
    },
    grow: {
        flexGrow: 1,
    }
});

class TopBar extends React.Component {
    state = {
        open: false,
    };

    logOut = () => {
        this.props.firebaseAction.signOut();
    }

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
                            color='inherit'
                            aria-label='Menu'
                            onClick={this.handleDrawerToggle}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant='h6' color='inherit' className={classes.grow}>
                            QASHAGAM
                        </Typography>
                        <Button
                            color='inherit'
                            onClick={this.logOut}
                        >
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant='temporary'
                    anchor='left'
                    classes={{ paper: classes.drawerPaper }}
                    open={this.state.open}
                    onClick={this.handleDrawerToggle}
                >
                    <DrawerLinks />
                </Drawer>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    firebase: state.firebase
});

const mapDispatchToProps = (dispatch) => ({
    firebaseAction: bindActionCreators(FirebaseAction, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(TopBar));
