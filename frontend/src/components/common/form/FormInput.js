import {TextField} from "@mui/material";

const FormInput = ({name, label, formik}) => {

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
    />
};

export default FormInput;