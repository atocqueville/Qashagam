import React from 'react';
import dateFns from 'date-fns';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import { Typography, Paper, Grid, Button } from '@material-ui/core';

const styles = () => ({
    icon: {
        marginLeft: '6px',
    }
});

class DateBox extends React.Component {
    static defaultProps = {
        startDate: undefined,
        endDate: undefined
    }

    render() {
        const { classes } = this.props;

        return (
            <Paper square style={{ display: 'flex', flex: '1 0 auto', maxWidth: '620px' }}>
                <Grid container direction='column'>

                    <Grid item style={{ display: 'flex', flex: '1 0 auto' }}>
                        <Grid container direction='row' style={{ justifyContent: 'space-evenly', padding: '24px' }}>
                            <Grid item style={{ width: '125px' }}>
                                <Typography>
                                    Debut : {this.props.startDate && dateFns.format(this.props.startDate, 'MM/DD/YYYY')}
                                </Typography>
                            </Grid>
                            <Grid item style={{ width: '125px' }}>
                                <Typography>
                                    Fin : {this.props.endDate && dateFns.format(this.props.endDate, 'MM/DD/YYYY')}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item style={{ display: 'flex', justifyContent: 'space-between', padding: '0px 12px 12px 12px' }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={this.props.deleteAction}
                            disabled={!this.props.startDate}
                        >
                            Annuler
                            <DeleteIcon className={classes.icon}/>
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.props.continueAction}
                            disabled={!this.props.endDate}
                        >
                            Continuer
                            <CreateIcon className={classes.icon}/>
                        </Button>
                    </Grid>

                </Grid>
            </Paper>
        );
    }
}

export default withStyles(styles)(DateBox);