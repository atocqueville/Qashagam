import React, { Fragment } from 'react';
import dateFns from 'date-fns';
import { withStyles } from '@material-ui/core/styles';
import { IconButton, Grid, Typography, Paper, Divider, Button, ButtonBase } from '@material-ui/core';
import NavigateBefore from '@material-ui/icons/NavigateBeforeRounded';
import NavigateNext from '@material-ui/icons/NavigateNextRounded';
import Day from './Day.jsx';

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

class Calendar extends React.Component {
    state = {
        currentMonth: new Date()
    };

    renderHeader() {
        const dateFormat = 'MMMM YYYY';

        return (
            <Grid container direction='row' style={{ display: 'flex', flex: '1 0 auto', justifyContent: 'space-between' }}>
                <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton onClick={this.prevMonth}>
                        <NavigateBefore />
                    </IconButton>
                </Grid>
                <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography>
                        {dateFns.format(this.state.currentMonth, dateFormat)}
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
        const dateFormat = 'dddd';
        const days = [];
        let startDate = dateFns.startOfWeek(this.state.currentMonth);
        for (let i = 0; i < 7; i++) {
            days.push(
                <Grid item key={i} style={{ display: 'flex', flex: '1 0 auto', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography>
                        {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
                    </Typography>
                </Grid>
            );
        }
        return <Grid container direction='row'>{days}</Grid>;
    }

    renderCells() {
        const { currentMonth } = this.state;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);

        const dateFormat = 'D';
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = '';
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = dateFns.format(day, dateFormat);
                const cloneDay = day;
                days.push(
                    <Button
                        className={this.props.classes.button}
                        style={{ borderLeft: dateFns.isSunday(cloneDay) ? '' : '1px solid rgba(0, 0, 0, 0.12)' }}
                        key={day}
                    >
                        <Grid
                            className={this.props.classes.buttonContent}
                            onClick={() => this.props.updateDates(dateFns.parse(cloneDay))}
                        >
                            <Day
                                date={formattedDate}
                                fullDate={cloneDay}
                                currentMonth={currentMonth}
                                startDate={this.props.startDate}
                                endDate={this.props.endDate}
                            />
                        </Grid>
                    </Button>
                );
                day = dateFns.addDays(day, 1);
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
                    <Grid item style={{ display: 'flex', minHeight: '70px' }}>
                        {this.renderHeader()}
                    </Grid>
                    <Grid item style={{ display: 'flex', minHeight: '40px' }}>
                        {this.renderDays()}
                    </Grid>
                    <Divider />
                    <Grid item>
                        {this.renderCells()}
                    </Grid>
                </Paper>
            </Grid>
        );
    }
}

export default withStyles(styles)(Calendar);