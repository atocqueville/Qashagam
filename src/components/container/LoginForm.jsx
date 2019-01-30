import React from 'react';
import { reduxForm } from 'redux-form';
import { Link as RouterLink } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

import TextField from '../redux/form/InputField.jsx';

const validate = values => {
    const errors = {};

    let mailRegex = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!values.email) {
        errors.email = 'Champ obligatoire';
    } else if (!mailRegex.test(values.email)) {
        errors.email = 'Mail incorrect';
    }

    if (!values.password) {
        errors.password = 'Champ obligatoire';
    }

    return errors;
};

class LoginForm extends React.Component {
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
                    <Grid item style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                        <Typography variant='h4'> Authentification </Typography>
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
                            name='password'
                            label='Mot de passe'
                            variant='outlined'
                            type='password'
                        />
                    </Grid>
                    
                    <Grid item style={{ display: 'flex', justifyContent: 'center', paddingBottom: '15px' }}>
                        <Button variant='contained' color='primary' type='submit'>
                            Connexion
                        </Button>
                    </Grid>

                    {errorCode.code && <Grid item style={{ display: 'flex', justifyContent: 'center', paddingBottom: '15px' }}>
                        <Typography color='error'>
                            {errorCode.toString()}
                        </Typography>
                    </Grid>}

                    <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                        <Link component={RouterLink} to='/signup' variant='subtitle1'>
                            Créer un compte
                        </Link>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

export default reduxForm({
    form: 'loginForm',
    validate
})(LoginForm);
