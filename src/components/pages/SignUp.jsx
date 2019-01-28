import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';

import SignUpForm from '../container/SignUpForm.jsx';
import * as FirebaseAction from '../redux/firebase/actions';

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
        },
        [theme.breakpoints.up('sm')]: {
            minWidth: '300px'
        }
    },
    cardContent: {
        [theme.breakpoints.only('xs')]: {
            padding: 0
        },
        flex: '1 0 auto'
    }
});

class SignUp extends React.Component {

    submitForm = (form) => {
        this.props.firebaseAction.signUp(form.email, form.pass1, form.famille);
    }

    render() {
        const { firebase, classes } = this.props;

        return (
            <Grid className={classes.grid} style={{ display: 'flex', flex: '1 0 auto' }}>
                <Grid style={{ display: 'flex', flex: '1 0 auto', alignItems: 'center', justifyContent: 'center' }}>
                    <Card className={classes.card}>
                        {firebase.loading && <LinearProgress />}
                        <CardContent classes={{ root: classes.cardContent }}>
                            <SignUpForm onSubmit={this.submitForm} errorCode={firebase.signupError}/>
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SignUp));
