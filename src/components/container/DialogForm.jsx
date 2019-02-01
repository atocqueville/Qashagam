import React from 'react';
import { reduxForm } from 'redux-form';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { DialogTitle, DialogContent, DialogActions, Button, Grid, CircularProgress, Fab } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';

import InputField from '../redux/form/InputField.jsx';

const styles = () => ({
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        left: 230
    }
});

const validate = values => {
    const errors = {};
    
    if (!values.lieu) {
        errors.lieu = 'Champ obligatoire';
    }

    return errors;
};

class DialogForm extends React.Component {
    render() {
        const { firebase, classes, handleSubmit } = this.props;
        const buttonClassname = classNames({
            [classes.buttonSuccess]: firebase.success
        });

        return (
            <form onSubmit={handleSubmit}>
                <DialogTitle>
                    Confirmation de la réservation
                </DialogTitle>
                <DialogContent>
                    <Grid container direction='column'>
                        <Grid item style={{ paddingBottom: '10px' }}>
                            <InputField
                                name='lieu'
                                label='Lieu'
                            />
                        </Grid>
                        <Grid item style={{ paddingBottom: '20px' }}>
                            <InputField
                                name='detail'
                                label='Detail'
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions style={{ paddingLeft: '10px', paddingBottom: '15px', paddingRight: '15px' }}>
                    <Button
                        onClick={this.props.closeDialog}
                        color='primary'
                        size='large'
                    >
                        {firebase.success ? 'Fermer' : 'Annuler'}
                    </Button>
                    <Fab
                        color='primary'
                        disabled={firebase.loading || firebase.success}
                        className={buttonClassname}
                        type='submit'
                    >
                        {firebase.success ? <CheckIcon /> : <SaveIcon />}
                    </Fab>
                    {firebase.loading && <CircularProgress size={68} className={classes.fabProgress} />}
                </DialogActions>
            </form>
        );
    }
}

export default reduxForm({
    form: 'dialogForm',
    validate
})(withStyles(styles)(DialogForm));