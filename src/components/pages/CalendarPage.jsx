import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { formValueSelector } from 'redux-form';
import { Typography, Grid, Dialog, Slide } from '@material-ui/core';
import dateFns from 'date-fns';

import * as CalendarAction from '../redux/actions/CalendarAction';
import * as CouchDBAction from '../redux/actions/CouchDBAction';

import Calendar from '../container/Calendar.jsx';
import DateBox from '../container/DateBox.jsx';
import DialogConfirmation from '../container/DialogConfirmation.jsx';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        
        props.dbAction.getAllTrips();
    }

    state = {
        dialogOpen: true
    }
    
    updateDates = (date) => {
        this.props.calendarAction.updateReservationDates(date);
    }

    deleteDates = () => {
        this.props.calendarAction.deleteReservationDates();
    }

    submitTrip = () => {
        var trip = this.props.newTrip;

        // generate ID
        var id = `${trip.famille}_${dateFns.format(new Date())}`;

        trip.startDate = this.props.calendarReducer.startDate;
        trip.endDate = this.props.calendarReducer.endDate;
        trip._id = id;

        this.props.dbAction.addNewTrip(trip);
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
        this.props.calendarAction.deleteReservationDates();
        this.props.dbAction.getAllTrips();
    }

    render() {
        const { calendarReducer, dbReducer } = this.props;
        
        return (
            <Grid container direction='column' style={{ justifyContent: 'center' }}>
                <Grid item style={{  display: 'flex', justifyContent: 'center' }}>
                    <Typography variant='display3'>
                        Qashagam
                    </Typography>
                </Grid>

                <Grid item style={{ display: 'flex', justifyContent: 'center', paddingTop: '40px' }}>
                    <Calendar
                        updateDates={this.updateDates}
                        startDate={calendarReducer.startDate}
                        endDate={calendarReducer.endDate}
                        trips={this.props.trips}
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
                    open={this.state.dialogOpen}
                    TransitionComponent={Transition}
                    onClose={this.closeDialog}
                >
                    <DialogConfirmation
                        closeDialog={this.closeDialog}
                        submitTrip={this.submitTrip}
                        dbReducer={dbReducer}
                    />
                </Dialog>
            </Grid>
        );
    }
}

const selector = formValueSelector('dialogForm');

const mapStateToProps = (state) => ({
    calendarReducer: state.calendarReducer,
    trips: state.couchDBReducer.trips,
    newTrip: selector(state, 'famille', 'lieu', 'detail'),
    dbReducer: state.couchDBReducer
});

const mapDispatchToProps = (dispatch) => ({
    calendarAction: bindActionCreators(CalendarAction, dispatch),
    dbAction: bindActionCreators(CouchDBAction, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainPage);