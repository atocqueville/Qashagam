import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import houat from '../../img/houat.jpg';
import dateFns from 'date-fns';
import { Typography, Grid } from '@material-ui/core';

import Calendar from './Calendar.jsx';
import * as CalendarAction from '../redux/actions/CalendarAction';

class MainPage extends React.Component {

    updateFirstDate = (date) => {
        this.props.calendarAction.updateFirstDate(date);
    }

    render() {

        return (
            <Grid container direction='row' style={{ backgroundImage: `url(${houat})`, backgroundSize: 'cover' }}>
                <Grid item xs={8}>
                    <Grid container direction='column'>
                        <Grid item style={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography variant='display3'>
                                QASHAGAM
                            </Typography>
                        </Grid>
                        <Grid item style={{ display: 'flex', justifyContent: 'center', paddingLeft: '250px', paddingRight: '250px', paddingTop: '150px' }}>
                            <Calendar
                                updateFirstDate={this.updateFirstDate}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4}>
                    <Grid style={{ display: 'flex', paddingTop: '150px' }}>
                        Premiere date selectionnée : {dateFns.format(this.props.calendarReducer.startDate)}
                    </Grid>
                    <Grid style={{ display: 'flex' }}>
                        Deuxieme date selectionnée : {dateFns.format(this.props.calendarReducer.endDate)}
                    </Grid>
                </Grid>
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