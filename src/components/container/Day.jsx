import React, { Fragment } from 'react';
import { isSameDay, isSameMonth, isAfter, isWithinRange, isSunday, areRangesOverlapping, parse } from 'date-fns';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

const styles = () => ({
    button: {
        display: 'flex',
        flex: '1 0 auto',
        minWidth: '60px',
        borderRadius: 0,
        padding: 0
    },
    buttonContent: {
        display: 'flex',
        flex: '1 0 auto',
        height: '60px'
    }
});

class Day extends React.Component {
    state = {
        isOpen: true,
        trip: undefined,
        openSnack: false
    }

    checkValidityDates = (date, startDate, trips) => {
        var isOverlapping = false;

        var newStartDate = startDate ? startDate : date;
        var newEndDate = date;
        
        // swap if start after end
        if (isAfter(startDate, date)) [newStartDate, newEndDate] = [newEndDate, newStartDate];

        if (trips) {
            trips.forEach(element => {
                var _startDate = element.doc.startDate;
                var _endDate = element.doc.endDate;
                if (areRangesOverlapping(_startDate, _endDate, newStartDate, newEndDate)) {
                    isOverlapping = true;
                }
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
            trips.forEach(element => {
                var _startDate = element.doc.startDate;
                var _endDate = element.doc.endDate;
                if (isWithinRange(date, _startDate, _endDate)) {
                    family = element.doc.famille;
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

    handleClose = () => {
        this.setState({ openSnack: false });
    };

    render() {
        const { date, fullDate, currentMonth, startDate, endDate, trips } = this.props;

        return (
            <Fragment>
                <Button
                    className={this.props.classes.button}
                    style={{ borderLeft: isSunday(fullDate) ? '' : '1px solid rgba(0, 0, 0, 0.12)' }}
                >
                    <Grid
                        className={this.props.classes.buttonContent}
                        onClick={() => this.checkValidityDates(fullDate, startDate, trips)}
                    >
                        <Grid container direction='column' style={{ display: 'flex', flex: '1 0 auto' }}>
                            <Grid item style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '48px' }}>
                                <Typography style={{ 'color' : this.colorDay(fullDate, currentMonth), paddingTop: '12px' }}>
                                    {date}
                                </Typography>
                            </Grid>
                        
                            <Grid item style={{ display: 'flex', flex: '1 0 auto', background: this.colorOccupation(fullDate, startDate, endDate, trips), margin: '4px' }} />
                        </Grid>
                    </Grid>
                </Button>
                <Snackbar
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    autoHideDuration={1500}
                    open={this.state.openSnack}
                    onClose={this.handleClose}
                    message={<span id="message-id">Conflit de dates</span>}
                />
            </Fragment>
        );
    }
}

export default withStyles(styles)(Day);