import React from 'react';
import { Field } from 'redux-form';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { MenuItem } from '@material-ui/core';

class SelectField extends React.Component {

    renderSelectField = field => {
        const {
            input: { onChange, value },
            items,
            label,
            meta
        } = field;
        
        return(
            <FormControl>
                <InputLabel>{label}</InputLabel>
                <Select
                    value={value}
                    onChange={(event) => {
                        onChange(event);
                    }}
                >
                    {items.map(item => 
                        <MenuItem value={item.id} key={item.id}>{item.value}</MenuItem>
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