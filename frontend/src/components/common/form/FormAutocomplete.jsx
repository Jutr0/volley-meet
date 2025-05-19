import React, {useCallback, useEffect, useState} from 'react';
import {Autocomplete, TextField} from '@mui/material';
import _, {debounce} from 'lodash';

const FormAutocomplete = ({name, label, formik, search, labelField = 'name'}) => {
    const {
        values,
        errors,
        touched,
        setFieldValue,
        handleBlur
    } = formik;

    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    const debouncedSearch = useCallback(
        debounce(async (query) => {
            if (!search || query.length < 2) {
                setLoading(false);
                return;
            }
            setLoading(true);
            search(query).then(res => {
                setOptions(res.map(item => ({...item, label: item[labelField]})));
                setLoading(false);
            })
        }, 500),
        [search]
    );

    const handleInputChange = (event, newInputValue) => {
        setInputValue(newInputValue);
        if (newInputValue) {
            debouncedSearch(newInputValue);
        } else {
            setOptions([]);
        }
    };

    const handleChange = (event, newValue) => {
        setFieldValue(name, newValue ? newValue : '');
    };

    useEffect(() => {
        if (search && !options.length) {
            debouncedSearch('');
        }
    }, [search]);

    const fieldError = touched[name] && errors[name];

    return (
        <Autocomplete
            id={name}
            options={options}
            loading={loading}
            value={_.get(values, name)}
            onChange={handleChange}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            getOptionLabel={(option) => option.label || ''}
            isOptionEqualToValue={(option, value) => option.label === value.label}
            renderInput={(params) => (
                <TextField
                    {...params}
                    name={name}
                    label={label}
                    error={Boolean(fieldError)}
                    helperText={fieldError}
                    onBlur={handleBlur}
                    fullWidth
                />
            )}
            sx={{mb: 2}}
            noOptionsText="No options found"
            loadingText="Loading..."
        />
    );
};

export default FormAutocomplete;