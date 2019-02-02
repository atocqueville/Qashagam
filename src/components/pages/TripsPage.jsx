import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Grid from '@material-ui/core/Grid';

import TripCard from '../container/TripCard.jsx';
import * as FirebaseAction from '../redux/firebase/actions';

class TripsPage extends React.Component {
    render() {
        const { trips } = this.props;

        return (
            <Grid style={{ display: 'flex', flex: '1 0 auto', paddingTop: '64px', justifyContent: 'center' }}>
                <Grid container direction='column' style={{ display: 'flex', flex: '1 0 auto', maxWidth: '620px' }}>
                    {trips && trips.map(trip =>
                        <TripCard trip={trip} key={trip.startDate} />
                    )}
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    trips: state.firebase.trips
});

const mapDispatchToProps = (dispatch) => ({
    firebaseAction: bindActionCreators(FirebaseAction, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TripsPage);