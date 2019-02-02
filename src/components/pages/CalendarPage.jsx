import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Typography, Grid, Dialog, Slide } from '@material-ui/core';

import * as CalendarAction from '../redux/calendar/actions';
import * as FirebaseAction from '../redux/firebase/actions';

import ColoredSquare from '../atoms/ColoredSquare.jsx';

import Calendar from '../container/Calendar.jsx';
import DateBox from '../container/DateBox.jsx';
import DialogForm from '../container/DialogForm.jsx';

function Transition(props) {
    return <Slide direction='up' {...props} />;
}

class CalendarPage extends React.Component {
    
    updateDates = (date) => {
        this.props.calendarAction.updateReservationDates(date);
    }

    deleteDates = () => {
        this.props.calendarAction.deleteReservationDates();
    }

    submitTrip = (form) => {
        let trip = {
            startDate: this.props.calendarReducer.startDate,
            endDate: this.props.calendarReducer.endDate,
            famille: this.props.firebase.famille,
            location: form.lieu,
            detail: form.detail
        };

        this.props.firebaseAction.addTrip(trip);
    }

    openDialog = () => {
        this.props.calendarAction.openDialogForm();
    }

    closeDialog = () => {
        this.props.calendarAction.deleteReservationDates();
        // this.props.dbAction.getAllTrips();
    }

    render() {
        const { calendarReducer, firebase } = this.props;
        
        return (
            <Grid container direction='column' style={{ display: 'flex', flex: '1 0 auto', paddingTop: '56px' }}>
                <Grid item style={{  display: 'flex', justifyContent: 'center', padding: '18px' }}>
                    <Grid container direction='row' style={{ justifyContent: 'space-around', maxWidth: '620px', width: '100%' }}>
                        <Grid item>
                            <Typography variant='h4'>
                                Calendrier
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Grid container direction='column'>
                                <Grid item>
                                    <ColoredSquare color='blue' />
                                    <Typography style={{ display: 'inline-block', paddingLeft: '6px' }}> Tocqueville </Typography>
                                </Grid>
                                <Grid item>
                                    <ColoredSquare color='red' />
                                    <Typography style={{ display: 'inline-block', paddingLeft: '6px' }}> Rigal </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                    <Calendar
                        updateDates={this.updateDates}
                        startDate={calendarReducer.startDate}
                        endDate={calendarReducer.endDate}
                        trips={firebase.trips}
                    />
                </Grid>
                        
                <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                    <DateBox
                        deleteAction={this.deleteDates}
                        continueAction={this.openDialog}
                        startDate={calendarReducer.startDate}
                        endDate={calendarReducer.endDate}
                    />
                </Grid>
    
                <Dialog
                    open={this.props.calendarReducer.dialogFormOpen}
                    TransitionComponent={Transition}
                    onClose={this.closeDialog}
                >
                    <DialogForm
                        closeDialog={this.closeDialog}
                        onSubmit={this.submitTrip}
                        firebase={firebase}
                    />
                </Dialog>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    calendarReducer: state.calendar,
    firebase: state.firebase
});

const mapDispatchToProps = (dispatch) => ({
    calendarAction: bindActionCreators(CalendarAction, dispatch),
    firebaseAction: bindActionCreators(FirebaseAction, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CalendarPage);