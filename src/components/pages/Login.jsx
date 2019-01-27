import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import * as FirebaseAction from '../redux/firebase/actions';
import LoginForm from '../container/LoginForm.jsx';

class Login extends React.Component {

    submitForm = (form) => {
        this.props.firebaseAction.signIn(form.email, form.password, this.props.history);
    }

    render() {
        const { firebase } = this.props;

        return(
            <Grid style={{ display: 'flex', flex: '1 0 auto', height: '100vh' }}>
                <Grid style={{ display: 'flex', flex: '1 0 auto', alignItems: 'center', justifyContent: 'center' }}>
                    <Card style={{ minWidth: '300px' }}>
                        {firebase.loading && <LinearProgress />}
                        <CardContent>
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
)(Login));
