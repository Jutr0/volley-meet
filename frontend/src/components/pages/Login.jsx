import FormInput from "../common/form/FormInput";
import {useFormik} from "formik";
import Box from "@mui/material/Box";
import {Button} from "../ui/button";
import {useContext} from "react";
import {AuthContext} from "../../contexts/AuthContext";
import {useNavigate} from "react-router-dom";

const Login = () => {

    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (email, password) => {
        try {
            await login({email, password})
            navigate("/")
        } catch (e) {

            if (e.status === 401) {
                formik.setErrors({password: 'Invalid Email or Password', email: true})
            } else {
                throw e;
            }

        }
    }

    const formik = useFormik({
        initialValues: {email: '', password: ''},
        onSubmit: values => {
            handleLogin(values.email, values.password)
        }
    })

    return <Box component="form" sx={{maxWidth: 400, mx: 'auto'}}>
        <FormInput name="email" label="Email" type="email" formik={formik} vertical/>
        <FormInput name="password" label="Password" type="password" formik={formik} vertical/>
        <Button fullWidth size='lg' type="submit" onClick={formik.submitForm}>Login</Button>
    </Box>

}

export default Login;