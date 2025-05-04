import FormInput from "../common/form/FormInput";
import {useFormik} from "formik";
import Box from "@mui/material/Box";
import Button from "../common/Button";
import {useContext} from "react";
import {AuthContext} from "../../contexts/AuthContext";
import {useNavigate} from "react-router-dom";

const Register = () => {

    const {register} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = async (email, password, password_confirmation) => {
        try {
            await register({email, password, password_confirmation})
            navigate("/")
        } catch (e) {
            console.log(e)
        }
    }

    const formik = useFormik({
        initialValues: {email: '', password: ''},
        onSubmit: values => {
            handleRegister(values.email, values.password, values.password_confirmation)
        }
    })

    return <Box component="form" sx={{maxWidth: 400, mx: 'auto'}}>
        <FormInput name="email" label="Email" type="email" formik={formik}/>
        <FormInput name="password" label="Password" type="password" formik={formik}/>
        <FormInput name="password_confirmation" label="Password confirmation" type="password" formik={formik}/>
        <Button variant="contained" fullWidth type="submit" onClick={formik.submitForm}>Register</Button>
    </Box>

}

export default Register;