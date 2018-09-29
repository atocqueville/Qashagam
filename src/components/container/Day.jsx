import React from 'react';
import { isSameDay, isSameMonth } from 'date-fns';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

class Day extends React.Component {

    colorDay = (fullDate, currentMonth) => {
        var color = 'black';

        if (isSameDay(fullDate, new Date())) color = 'red';
        if (!isSameMonth(fullDate, currentMonth)) color = 'grey';

        return color;
    }

    render() {
        const { date, fullDate, currentMonth } = this.props;
        
        return (
            <Grid style={{ display: 'flex', flex: '1 0 auto', alignItems: 'center', justifyContent: 'center' }}>
                <Typography style={{ 'color' : this.colorDay(fullDate, currentMonth) }}>
                    {date}
                </Typography>
            </Grid>
        );
    }
}

export default Day;