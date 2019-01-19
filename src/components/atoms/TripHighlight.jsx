import React from 'react';
import dateFns from 'date-fns';

import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import tripWP from '../../../img/tripWP.png';

const styles = () => ({
    card: {
        '&:last-child': {
            paddingBottom: 0
        }
    },
    media: {
        height: '30vh',
        width: '80vw'
    }
});

class TripHighlight extends React.Component {
    render() {
        const { trip, classes } = this.props;

        return (
            <Card>
                <CardMedia title="photo" image={tripWP} className={classes.media} />

                <CardContent className={classes.card}>
                    <Typography gutterBottom variant="display3">
                        Détail du voyage
                    </Typography>
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
                    <CardActions>
                        <Button onClick={this.props.handleClose} color="primary" autoFocus> Fermer </Button>
                    </CardActions>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(TripHighlight);