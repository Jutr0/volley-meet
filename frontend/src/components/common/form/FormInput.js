import {TextField} from "@mui/material";

const FormInput = ({name, label, formik, type, multiline = false, rows = 4}) => {

    return <TextField
        id={name}
        name={name}
        label={label}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={Boolean(formik.touched[name] && formik.errors[name])}
        helperText={formik.touched[name] && formik.errors[name]}
        sx={{mb: 2}}
        fullWidth
        multiline={multiline}
        rows={rows}
        type={type}
    />
};

export default FormInput;