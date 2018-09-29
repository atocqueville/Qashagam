import React from 'react';
import Grid from '@material-ui/core/Grid';
import MainPage from './container/MainPage.jsx';

import './app.css';

class App extends React.Component {
    render() {

        return (
            <Grid style={{ display: 'flex', flex: '1 0 auto' }}>
                <MainPage />
            </Grid>
        );
    }
}

export default App;