import React, { Fragment } from 'react';
import dateFns from 'date-fns';

import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

class TripHighlight extends React.Component {
    render() {
        const { trip } = this.props;
        
        return (
            <Fragment>
                <DialogTitle> Détail du voyage </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Grid container direction="column">
                            <Grid item>
                                <Typography variant="body2" style={{ display: 'inline-block', paddingRight: '6px' }}> Famille: </Typography>
                                <Typography variant="display2" style={{ display: 'inline-block' }}> {trip.famille} </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" style={{ display: 'inline-block', paddingRight: '6px' }}> Lieu: </Typography>
                                <Typography variant="display2" style={{ display: 'inline-block' }}> {trip.lieu} </Typography>
                            </Grid>
                            
                            <Grid item>
                                <Typography variant="body2" style={{ display: 'inline-block', paddingRight: '6px' }}> Début: </Typography>
                                <Typography variant="display2" style={{ display: 'inline-block' }}> {dateFns.format(trip.startDate, 'MM/DD/YYYY')} </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" style={{ display: 'inline-block', paddingRight: '6px' }}> Fin: </Typography>
                                <Typography variant="display2" style={{ display: 'inline-block' }}> {dateFns.format(trip.endDate, 'MM/DD/YYYY')} </Typography>
                            </Grid>

                            <Grid item>
                                <Typography variant="body2" style={{ display: 'inline-block', paddingRight: '6px' }}> Détail: </Typography>
                                <Typography variant="display2" style={{ display: 'inline-block' }}> {trip.detail} </Typography>
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary" autoFocus> Fermer </Button>
                </DialogActions>
            </Fragment>
        );
    }
}

export default TripHighlight;