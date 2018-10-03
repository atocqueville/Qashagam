import React from 'react';
import { reduxForm } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import SelectField from '../redux/form/SelectField.jsx';
import TextField from '../redux/form/InputField.jsx';

class DialogForm extends React.Component {

    render() {
        
        return (
            <Grid container direction='column'>
                <Grid item style={{ paddingBottom: '10px' }}>
                    <SelectField
                        name='famille'
                        label='Famille'
                        items={[{id: 'tocqueville', value: 'de Tocqueville'}, {id: 'rigal', value: 'Rigal'}]}
                    />
                </Grid>
                <Grid item style={{ paddingBottom: '10px' }}>
                    <TextField
                        name='lieu'
                        label='Lieu'
                    />
                </Grid>
                <Grid item>
                    <TextField
                        name='detail'
                        label='Detail'
                    />
                </Grid>
            </Grid>
        );
    }
}

export default reduxForm({
    form: 'dialogForm'
})(DialogForm);