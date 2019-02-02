import React, { Fragment } from 'react';
import dateFns from 'date-fns';

import { IconButton, Grid, Typography, Paper, Divider } from '@material-ui/core';
import NavigateBefore from '@material-ui/icons/NavigateBeforeRounded';
import NavigateNext from '@material-ui/icons/NavigateNextRounded';

import Day from './Day.jsx';

class Calendar extends React.Component {
    state = {
        currentMonth: new Date()
    };

    renderHeader() {
        return (
            <Grid container direction='row' style={{ display: 'flex', flex: '1 0 auto', justifyContent: 'space-between' }}>
                <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={this.prevMonth}>
                        <NavigateBefore />
                    </IconButton>
                </Grid>
                <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography>
                        {dateFns.format(this.state.currentMonth, 'MMMM YYYY')}
                    </Typography>
                </Grid>
                <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={this.nextMonth}>
                        <NavigateNext />
                    </IconButton>
                </Grid>
            </Grid>
        );
    }

    renderDays() {
        const days = [];
        let startDate = dateFns.startOfWeek(this.state.currentMonth);

        for (let i = 0; i < 7; i++) {
            days.push(
                <Grid item key={i} style={{ display: 'flex', flex: '1 0 auto', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography>
                        {dateFns.format(dateFns.addDays(startDate, i), 'ddd')}
                    </Typography>
                </Grid>
            );
        }

        return <Grid container direction='row'>{days}</Grid>;
    }

    renderCells() {
        const { currentMonth } = this.state;
        const { trips } = this.props;

        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);

        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = '';
        let associatedTrip = undefined;

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = dateFns.format(day, 'D');
                const cloneDay = day;

                if (trips) {
                    trips.forEach(trip => {
                        if (dateFns.isWithinRange(cloneDay, trip.startDate, trip.endDate)) {
                            associatedTrip = trip;
                        }
                    });
                }

                days.push(
                    <Day
                        date={formattedDate}
                        fullDate={cloneDay}
                        currentMonth={currentMonth}
                        startDate={this.props.startDate}
                        endDate={this.props.endDate}
                        trips={this.props.trips}
                        updateDates={this.props.updateDates}
                        associatedTrip={associatedTrip}
                        key={day}
                    />
                );

                day = dateFns.addDays(day, 1);
                associatedTrip = undefined;
            }

            rows.push(
                <Fragment key={day}>
                    <Grid item style={{ display: 'flex', flex: '1 0 auto' }}>
                        {days}
                    </Grid>
                    <Divider />
                </Fragment>
            );
            days = [];
        }

        return <Grid container direction='column' style={{ display: 'flex', flex: '1 0 auto' }}>{rows}</Grid>;
    }

    nextMonth = () => {
        this.setState({
            currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        });
    };
    
    prevMonth = () => {
        this.setState({
            currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
        });
    };

    render() {
        return(
            <Grid container direction='column' style={{ display: 'flex', flex: '0 1 auto', maxWidth: '620px' }}>
                <Paper square>
                    <Grid item style={{ display: 'flex' }}>
                        {this.renderHeader()}
                    </Grid>
                    <Grid item style={{ display: 'flex' }}>
                        {this.renderDays()}
                    </Grid>
                    <Divider />
                    <Grid item style={{ display: 'flex' }}>
                        {this.renderCells()}
                    </Grid>
                </Paper>
            </Grid>
        );
    }
}

export default Calendar;