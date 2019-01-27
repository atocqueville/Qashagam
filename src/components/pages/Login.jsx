import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core';

import * as FirebaseAction from '../redux/firebase/actions';
import LoginForm from '../container/LoginForm.jsx';

const styles = theme => ({
    grid: {
        [theme.breakpoints.up('sm')]: {
            height: '100vh'
        },
        [theme.breakpoints.only('xs')]: {
            padding: '10vw'
        }
    },
    card: {
        [theme.breakpoints.only('xs')]: {
            flex: '1 0 auto'
        }
    },
    cardContent: {
        [theme.breakpoints.only('xs')]: {
            padding: 0
        },
        flex: '1 0 auto'
    }
});

class Login extends React.Component {

    submitForm = (form) => {
        this.props.firebaseAction.signIn(form.email, form.password, this.props.history);
    }

    render() {
        const { firebase, classes } = this.props;

        return(
            <Grid className={classes.grid} style={{ display: 'flex', flex: '1 0 auto' }}>
                <Grid style={{ display: 'flex', flex: '1 0 auto', alignItems: 'center', justifyContent: 'center' }}>
                    <Card className={classes.card} style={{ display: 'flex', justifyContent: 'center' }}>
                        {firebase.loading && <LinearProgress />}
                        <CardContent classes={{ root: classes.cardContent }}>
                            <LoginForm onSubmit={this.submitForm} errorCode={firebase.signinError} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
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
)(withStyles(styles)(Login)));
