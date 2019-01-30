import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

class TripsPage extends React.Component {
    render() {
        
        return (
            <Grid container direction='column' style={{ display: 'flex', flex: '1 0 auto', paddingTop: '64px' }}>
                <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant='h1'>
                        WIP
                    </Typography>
                </Grid>
            </Grid>
        );
    }
}

export default TripsPage;