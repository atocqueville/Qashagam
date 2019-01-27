import React from 'react';
import { Field } from 'redux-form';
import TextField from '@material-ui/core/TextField';

class InputField extends React.Component {
    static defaultProps ={
        label: 'default',
        variant: 'standard',
        type: 'text'
    };

    renderTextField = field => {
        const {
            input: { onChange, onBlur, value },
            meta
        } = field;
        
        return(
            <TextField
                label={this.props.label}
                variant={this.props.variant}
                type={this.props.type}
                value={value}
                error={meta.touched && meta.invalid}
                helperText={meta.touched && meta.error}
                onBlur={onBlur}
                onChange={(event) => {
                    onChange(event);
                }}
            />
        );
    }

    render() {

        return(
            <Field
                name={this.props.name}
                component={this.renderTextField}
            />
        );
    }
}

export default InputField;