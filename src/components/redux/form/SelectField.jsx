import React from 'react';
import { Field } from 'redux-form';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core';

const styles = () => ({
    input: {
        height: 50
    }
});

class SelectField extends React.Component {

    renderSelectField = field => {
        const {
            input: { onChange, onBlur, value },
            items,
            label,
            meta
        } = field;
        
        return(
            <FormControl
                variant="outlined"
                error={meta.touched && meta.invalid}
            >
                <InputLabel> {label} </InputLabel>
                <Select
                    variant={this.props.variant}
                    value={value}
                    onChange={(event) => {
                        onChange(event);
                    }}
                    onBlur={onBlur}
                    input={
                        <OutlinedInput
                            labelWidth={this.props.labelWidth}
                            classes={{ root: this.props.classes.input }}
                        />
                    }
                >
                    {items.map(item => 
                        <MenuItem value={item.id} key={item.id}>{item.value}</MenuItem>
                    )}
                </Select>
                {meta.touched && meta.error && <FormHelperText error> {meta.error} </FormHelperText>}
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

export default withStyles(styles)(SelectField);