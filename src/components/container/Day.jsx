import React, { Fragment } from 'react';
import { isSameDay, isSameMonth, isAfter, isWithinRange, isSunday, areRangesOverlapping, parse } from 'date-fns';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Snackbar from '@material-ui/core/Snackbar';

import TripHighlight from '../atoms/TripHighlight.jsx';

const styles = () => ({
    button: {
        display: 'flex',
        flex: '1 0 auto',
        minWidth: '20px',
        borderRadius: 0,
        padding: 0
    },
    buttonContent: {
        display: 'flex',
        flex: '1 0 auto'
    }
});

class Day extends React.Component {
    state = {
        isOpen: true,
        openSnack: false,
        openModal: false,
        tripHighlight: undefined
    }

    checkValidityDates = (date, startDate, trips) => {
        var isOverlapping = false;

        var newStartDate = startDate ? startDate : date;
        var newEndDate = date;
        
        // swap if start after end
        if (isAfter(startDate, date)) [newStartDate, newEndDate] = [newEndDate, newStartDate];

        if (trips) {
            trips.forEach(trip => {
                isOverlapping = (areRangesOverlapping(trip.startDate, trip.endDate, newStartDate, newEndDate) || (isWithinRange(newStartDate, trip.startDate, trip.endDate)));
            });
        }

        if (isOverlapping) {
            this.setState({ openSnack: true });
        } else {
            this.props.updateDates(parse(date));
        }
    }

    colorDay = (fullDate, currentMonth) => {
        var color = 'black';

        if (isSameDay(fullDate, new Date())) color = 'red';
        if (!isSameMonth(fullDate, currentMonth)) color = 'grey';

        return color;
    }

    colorOccupation = (date, startDate, endDate, trips) => {
        var color = '';
        var family;
        
        if (trips) {
            trips.forEach(trip => {
                if (isWithinRange(date, trip.startDate, trip.endDate)) {
                    family = trip.famille;
                }
            });
        }

        if (family) {
            color = family === 'rigal' ? 'red' : 'blue';
        } else {
            if (endDate === undefined) endDate = startDate;
            if (isWithinRange(date, startDate, endDate)) color = 'green';
        }

        return color;
    }

    handleCloseSnack = () => {
        this.setState({ openSnack: false });
    };

    handleCloseModal = () => {
        this.setState({ openModal: false });
    };

    handleClick = () => {
        const { fullDate, startDate, trips, associatedTrip} = this.props;

        if (associatedTrip) {
            this.setState({
                openModal: true,
                tripHighlight: associatedTrip
            });
        } else {
            this.checkValidityDates(fullDate, startDate, trips);
        }
        
    }

    render() {
        const { date, fullDate, currentMonth, startDate, endDate, trips } = this.props;
        const { openSnack, openModal, tripHighlight } = this.state;

        return (
            <Fragment>
                <Button
                    className={this.props.classes.button}
                    style={{ borderLeft: isSunday(fullDate) ? '' : '1px solid rgba(0, 0, 0, 0.12)' }}
                >
                    <Grid
                        className={this.props.classes.buttonContent}
                        onClick={this.handleClick}
                    >
                        <Grid container direction='column' style={{ display: 'flex', flex: '1 0 auto' }}>
                            <Grid item style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '48px' }}>
                                <Typography style={{ 'color' : this.colorDay(fullDate, currentMonth), paddingTop: '12px' }}>
                                    {date}
                                </Typography>
                            </Grid>
                        
                            <Grid id='LFEIGHBFEI' item style={{ display: 'flex', flex: '1 0 auto', background: this.colorOccupation(fullDate, startDate, endDate, trips), height: '5px' }} />
                        </Grid>
                    </Grid>
                </Button>

                <Snackbar
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    autoHideDuration={1500}
                    open={openSnack}
                    onClose={this.handleCloseSnack}
                    message={<span id='message-id'>Conflit de dates</span>}
                />

                <Dialog
                    open={openModal}
                    onClose={this.handleCloseModal}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'
                    maxWidth='md'
                    scroll='body'
                >
                    <TripHighlight trip={tripHighlight} handleClose={this.handleCloseModal} />
                </Dialog>

            </Fragment>
        );
    }
}

export default withStyles(styles)(Day);