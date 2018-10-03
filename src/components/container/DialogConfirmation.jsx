import React, { Fragment } from 'react';
import classNames from 'classnames';
import { DialogTitle, DialogContent, DialogActions, Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';

import DialogForm from './DialogForm.jsx';

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
        zIndex: 2,
    }
});

class DialogConfirmation extends React.Component {
    state = {
        fakeSuccess: false,
        fakeLoading: false
    };

    componentWillUnmount() {
        clearTimeout(this.timer);
    }
    
    startProgress = () => {
        this.setState({ fakeLoading: true });

        this.timer = setTimeout(() => {
            this.setState({ fakeSuccess: true, fakeLoading: false });
        }, 1000);

        this.props.submitTrip();
    }

    render() {
        const { dbReducer, classes } = this.props;
        const { fakeSuccess, fakeLoading } = this.state;
        const buttonClassname = classNames({
            [classes.buttonSuccess]: dbReducer.success && fakeSuccess,
        });

        return (
            <Fragment>
                <DialogTitle>
                    Confirmation de la réservation
                </DialogTitle>
                <DialogContent>
                    <DialogForm />
                </DialogContent>
                <DialogActions style={{ paddingLeft: '10px', paddingBottom: '10px', paddingRight: '10px' }}>
                    <Button
                        onClick={this.props.closeDialog}
                        color="primary"
                        size="large"
                    >
                        {dbReducer.success && fakeSuccess ? 'Fermer' : 'Annuler'}
                    </Button>
                    <Button
                        onClick={this.startProgress}
                        color="primary"
                        variant="fab"
                        disabled={dbReducer.loading || fakeLoading}
                        className={buttonClassname}
                    >
                        {dbReducer.success && fakeSuccess ? <CheckIcon /> : <SaveIcon />}
                    </Button>
                    {dbReducer.loading || fakeLoading && <CircularProgress size={68} className={classes.fabProgress} />}
                </DialogActions>
            </Fragment>
        );
    }
}

export default withStyles(styles)(DialogConfirmation);