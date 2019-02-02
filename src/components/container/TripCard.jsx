import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Typography, Paper, Grid } from '@material-ui/core';

const styles = (theme) => ({
    icon: {
        marginLeft: '6px',
    },
    grid: {
        [theme.breakpoints.up('sm')]: {
            padding: '10px 30px'
        },
        [theme.breakpoints.only('xs')]: {
        }
    }
});

class TripCard extends React.Component {
    static defaultProps = {
    }

    render() {
        const { trip, classes } = this.props;

        return (
            <Grid item className={classes.grid}>
                <Paper square elevation={6} style={{ height: 'calc(100vw * 0.17)', display: 'flex', flex: '1 0 auto',  maxHeight: '110px' }}>
                    <Grid container direction='row' style={{ display: 'flex', flex: '1 0 auto' }}>
                        <Grid item xs={3}>
                            <img src={trip.url} style={{ width: '100%', height: '100%' }} />
                        </Grid>
                        <Grid item xs={9} style={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant='h5' style={{ textTransform: 'capitalize', paddingLeft: '20px' }}> {trip.location} </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        );
    }
}

export default withStyles(styles)(TripCard);