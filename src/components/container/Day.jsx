import React from 'react';
import { isSameDay, isSameMonth, isWithinRange } from 'date-fns';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

class Day extends React.Component {

    colorDay = (fullDate, currentMonth) => {
        var color = 'black';

        if (isSameDay(fullDate, new Date())) color = 'red';
        if (!isSameMonth(fullDate, currentMonth)) color = 'grey';

        return color;
    }

    colorOccupation = (date, startDate, endDate) => {
        var color = '';

        if (isWithinRange(date, startDate, endDate)) color = 'green';

        return color;
    }

    render() {
        const { date, fullDate, currentMonth, startDate, endDate } = this.props;
        
        return (
            <Grid container direction='column' style={{ display: 'flex', flex: '1 0 auto' }}>
                <Grid item style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '48px' }}>
                    <Typography style={{ 'color' : this.colorDay(fullDate, currentMonth), paddingTop: '12px' }}>
                        {date}
                    </Typography>
                </Grid>
            
                <Grid item style={{ display: 'flex', flex: '1 0 auto', background: this.colorOccupation(fullDate, startDate, endDate), margin: '4px' }} />
            </Grid>
        );
    }
}

export default Day;