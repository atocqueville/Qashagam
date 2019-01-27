import React from 'react';
import { reduxForm } from 'redux-form';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import TextField from '../redux/form/InputField.jsx';

const validate = values => {
    const errors = {};

    let mailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!values.email) {
        errors.email = 'Champ obligatoire';
    } else if (!mailRegex.test(values.email)) {
        errors.email = 'Mail incorrect';
    }

    if (!values.pass1) {
        errors.pass1 = 'Champ obligatoire';
    }

    if (!values.pass2) {
        errors.pass2 = 'Champ obligatoire';
    } else if (values.pass1 !== values.pass2) {
        errors.pass2 = 'Les mots de passe ne correspondent pas';
    }

    if (!values.secret) {
        errors.secret = 'Champ obligatoire';
    } else if (values.secret.toLowerCase() !== 'qashagam') {
        errors.secret = 'Non non, petit scarabée';
    }

    return errors;
};

class SignUpForm extends React.Component {
    static defaultProps ={
        label: 'default',
        variant: 'standard',
        type: 'text'
    };

    render() {
        const { handleSubmit, errorCode } = this.props;

        return(
            <form onSubmit={handleSubmit}>
                <Grid container direction='column'>
                    <Grid item style={{ display: 'flex', justifyContent: 'center', padding: '0px 20px 20px' }}>
                        <Typography variant='display4'> Inscription </Typography>
                    </Grid>
                    <Grid item style={{ display: 'flex', justifyContent: 'center', paddingBottom: '15px' }}>
                        <TextField
                            name='email'
                            label='Adresse e-mail'
                            variant='outlined'
                            type='text'
                        />
                    </Grid>
                    <Grid item style={{ display: 'flex', justifyContent: 'center', paddingBottom: '15px' }}>
                        <TextField
                            name='pass1'
                            label='Mot de passe'
                            variant='outlined'
                            type='password'
                        />
                    </Grid>
                    <Grid item style={{ display: 'flex', justifyContent: 'center', paddingBottom: '15px' }}>
                        <TextField
                            name='pass2'
                            label='Confirmation'
                            variant='outlined'
                            type='password'
                        />
                    </Grid>
                    <Grid item style={{ display: 'flex', justifyContent: 'center', paddingBottom: '15px' }}>
                        <TextField
                            name='secret'
                            label='Nom du bateau'
                            variant='outlined'
                            type='text'
                        />
                    </Grid>
                    <Grid item style={{ display: 'flex', justifyContent: 'center', paddingTop: '15px' }}>
                        <Button variant='contained' color='primary' type='submit'>
                            S'enregistrer
                        </Button>
                    </Grid>
                    <Grid item style={{ display: 'flex', justifyContent: 'center', paddingTop: '15px' }}>
                        <Typography color='error'>
                            {errorCode.toString()}
                        </Typography>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

export default reduxForm({
    form: 'signupForm',
    validate
})(SignUpForm);
