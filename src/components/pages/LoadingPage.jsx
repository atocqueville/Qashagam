import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = () => ({
    progress: {
        color: '#2196F3',
    },
});

class LoadingPage extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <Grid style={{ display: 'flex', height: '100vh' }}>
                <Grid style={{ display: 'flex', flex: '1 0 auto', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress className={classes.progress} />
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(LoadingPage);