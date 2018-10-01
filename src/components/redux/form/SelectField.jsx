import React from 'react';
import { Field } from 'redux-form';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { MenuItem } from '@material-ui/core';

class SelectField extends React.Component {

    renderSelectField = ({
        label,
        input,
        value,
        items,
        ...custom,
    }) => {
        console.log(value)
        return(
            <FormControl>
                <InputLabel>{label}</InputLabel>
                <Select
                    value={value}
                    onChange={(event, value) => {
                        console.log(value)
                        input.onChange(value)}
                    }
                    {...custom}
                >
                    {items.map(item => 
                        <MenuItem value={item} key={item}>{item}</MenuItem>
                    )}
                </Select>
            </FormControl>
        );
    }

    render() {

        return(
            <Field
                name={this.props.name}
                label={this.props.label}
                component={this.renderSelectField}
                items={this.props.items}
            />
        );
    }
}

export default SelectField;