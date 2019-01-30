import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { formValueSelector } from 'redux-form';
import { Typography, Grid, Dialog, Slide } from '@material-ui/core';
import dateFns from 'date-fns';

import * as CalendarAction from '../redux/calendar/actions';
// import * as CouchDBAction from '../redux/actions/CouchDBAction';

import ColoredSquare from '../atoms/ColoredSquare.jsx';

import Calendar from '../container/Calendar.jsx';
import DateBox from '../container/DateBox.jsx';
import DialogForm from '../container/DialogForm.jsx';

function Transition(props) {
    return <Slide direction='up' {...props} />;
}

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        
        // props.dbAction.getAllTrips();
        // props.dbAction.signUp();
    }

    state = {
        dialogOpen: false
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

        // this.props.dbAction.addNewTrip(trip);
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
        // this.props.dbAction.resetState();
        // this.props.dbAction.getAllTrips();
    }

    render() {
        const { calendarReducer } = this.props;
        
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
                        trips={undefined}
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
                    open={this.state.dialogOpen}
                    TransitionComponent={Transition}
                    onClose={this.closeDialog}
                >
                    <DialogForm
                        closeDialog={this.closeDialog}
                        onSubmit={this.submitTrip}
                        // dbReducer={dbReducer}
                    />
                </Dialog>
            </Grid>
        );
    }
}

const selector = formValueSelector('dialogForm');

const mapStateToProps = (state) => ({
    calendarReducer: state.calendar,
    // trips: state.couchDBReducer.trips,
    newTrip: selector(state, 'famille', 'lieu', 'detail'),
    // dbReducer: state.couchDBReducer
});

const mapDispatchToProps = (dispatch) => ({
    calendarAction: bindActionCreators(CalendarAction, dispatch),
    // dbAction: bindActionCreators(CouchDBAction, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainPage);