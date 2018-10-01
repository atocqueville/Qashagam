import React, { Fragment } from 'react';
import { DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import DialogForm from './DialogForm.jsx';

class DialogConfirmation extends React.Component {

    render() {
        
        return (
            <Fragment>
                <DialogTitle>
                    Confirmation de la réservation
                </DialogTitle>
                <DialogContent>
                    <DialogForm />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.closeDialog} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={this.handleClose} color="primary">
                        Sauvegarder
                    </Button>
                </DialogActions>
            </Fragment>
        );
    }
}

export default DialogConfirmation;