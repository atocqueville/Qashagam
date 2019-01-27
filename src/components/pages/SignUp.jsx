import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { withStyles } from '@material-ui/core';

import SignUpForm from '../container/SignUpForm.jsx';
import * as FirebaseAction from '../redux/firebase/actions';

const styles = () => ({
    cardContent: {
        paddingTop: 0
    },
    iconButton: {
        color: '#000'
    }
});

class SignUp extends React.Component {

    submitForm = (form) => {
        this.props.firebaseAction.signUp(form.email, form.pass1, this.props.history);
    }

    render() {
        const { firebase, classes } = this.props;

        return (
            <Grid style={{ display: 'flex', flex: '1 0 auto', height: '100vh' }}>
                <Grid style={{ display: 'flex', flex: '1 0 auto', alignItems: 'center', justifyContent: 'center' }}>
                    <Card style={{ minWidth: '300px' }}>
                        {firebase.loading && <LinearProgress />}
                        <IconButton classes={{ root: classes.iconButton }} component={Link} to="/">
                            <ArrowBack />
                        </IconButton>
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

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(SignUp)));
