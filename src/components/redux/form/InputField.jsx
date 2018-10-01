import React from 'react';
import { Field } from 'redux-form';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

class TextField extends React.Component {

    renderTextField = ({
        label,
        value,
        children,
        ...custom
    }) => {
        return(
            <FormControl>
                <InputLabel>{label}</InputLabel>
                <Input
                    value={value}
                    children={children}
                    {...custom}
                />
            </FormControl>
        );
    }

    render() {

        return(
            <Field
                name={this.props.name}
                label={this.props.label}
                component={this.renderTextField}
            />
        );
    }
}

export default TextField;