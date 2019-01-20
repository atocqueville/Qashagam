import React from 'react';
import { reduxForm } from 'redux-form';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { DialogTitle, DialogContent, DialogActions, Button, Grid } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check';
import AttachFile from '@material-ui/icons/AttachFile';
import SaveIcon from '@material-ui/icons/Save';

import SelectField from '../redux/form/SelectField.jsx';
import TextField from '../redux/form/InputField.jsx';

const styles = () => ({
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    fabProgress: {
        color: green[500],
        position: 'fixed',
        bottom: 12,
        right: 8,
        zIndex: 2
    }
});

const validate = values => {
    const errors = {};

    if (!values.famille) {
        errors.famille = 'Champ obligatoire';
    }

    return errors;
};

class DialogForm extends React.Component {

    manageFile = (file) => {
        console.log(file);
    }

    render() {
        const { dbReducer, classes, handleSubmit } = this.props;
        const buttonClassname = classNames({
            [classes.buttonSuccess]: dbReducer.success
        });

        return (
            <form onSubmit={handleSubmit}>
                <DialogTitle>
                    Confirmation de la réservation
                </DialogTitle>
                <DialogContent>
                    <Grid container direction='column'>
                        <Grid item style={{ paddingBottom: '10px' }}>
                            <SelectField
                                name='famille'
                                label='Famille'
                                items={[{id: 'tocqueville', value: 'de Tocqueville'}, {id: 'rigal', value: 'Rigal'}]}
                            />
                        </Grid>
                        <Grid item style={{ paddingBottom: '10px' }}>
                            <TextField
                                name='lieu'
                                label='Lieu'
                            />
                        </Grid>
                        <Grid item style={{ paddingBottom: '20px' }}>
                            <TextField
                                name='detail'
                                label='Detail'
                            />
                        </Grid>
                        <Grid item>
                            <Button variant='contained' component='label' color='primary'>
                                photo
                                <AttachFile />
                                <input
                                    type='file'
                                    style={{ display: 'none' }}
                                    onChange={e => this.manageFile(e.target.files[0])}
                                />
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions style={{ paddingLeft: '10px', paddingBottom: '10px', paddingRight: '10px' }}>
                    <Button
                        onClick={this.props.closeDialog}
                        color="primary"
                        size="large"
                    >
                        {dbReducer.success ? 'Fermer' : 'Annuler'}
                    </Button>
                    <Button
                        color="primary"
                        variant="fab"
                        disabled={dbReducer.loading || dbReducer.success}
                        className={buttonClassname}
                        type='submit'
                    >
                        {dbReducer.success ? <CheckIcon /> : <SaveIcon />}
                    </Button>
                    {dbReducer.loading && <CircularProgress size={68} className={classes.fabProgress} />}
                </DialogActions>
            </form>
        );
    }
}

export default reduxForm({
    form: 'dialogForm',
    validate
})(withStyles(styles)(DialogForm));