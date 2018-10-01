import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Typography, Grid, Dialog, Slide } from '@material-ui/core';

import Calendar from '../container/Calendar.jsx';
import * as CalendarAction from '../redux/actions/CalendarAction';
import DateBox from '../container/DateBox.jsx';
import DialogConfirmation from '../container/DialogConfirmation.jsx';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class MainPage extends React.Component {
    state = {
        dialogOpen: false
    }
    
    updateDates = (date) => {
        this.props.calendarAction.updateReservationDates(date);
    }

    deleteDates = () => {
        this.props.calendarAction.deleteReservationDates();
    }

    openDialog = () => {
        this.setState({
            dialogOpen: true
        });
    }

    closeDialog = () => {
        this.setState({
            dialogOpen: false
        });
    }

    render() {
        const { calendarReducer } = this.props;

        return (
            <Grid container direction='column' style={{ justifyContent: 'center' }}>
                <Grid item style={{  display: 'flex', justifyContent: 'center' }}>
                    <Typography variant='display3'>
                        QASHAGAM
                    </Typography>
                </Grid>

                <Grid item style={{ display: 'flex', justifyContent: 'center', paddingTop: '70px' }}>
                    <Calendar
                        updateDates={this.updateDates}
                        startDate={calendarReducer.startDate}
                        endDate={calendarReducer.endDate}
                    />
                </Grid>
                        
                <Grid item style={{ display: 'flex', justifyContent: 'center', paddingTop: '50px' }}>
                    <DateBox
                        deleteAction={this.deleteDates}
                        continueAction={this.openDialog}
                        startDate={calendarReducer.startDate}
                        endDate={calendarReducer.endDate}
                    />
                </Grid>
    
                <Dialog
                    open={true}
                    TransitionComponent={Transition}
                    onClose={this.closeDialog}
                >
                    <DialogConfirmation    
                        closeDialog={this.closeDialog}
                    />
                </Dialog>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    calendarReducer: state.calendar
});

const mapDispatchToProps = (dispatch) => ({
    calendarAction: bindActionCreators(CalendarAction, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainPage);