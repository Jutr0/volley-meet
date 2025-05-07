import FormInput from "../../common/form/FormInput";
import {useFormik} from "formik";
import Card from "../../common/Card";
import {buildActions, get} from "../../../utils/actionsBuilder";
import FormAutocomplete from "../../common/form/FormAutocomplete";
import {useNavigate} from "react-router-dom";

const toApi = (resource) => ({
    name: resource.name,
    description: resource.description,
    captain_id: resource.captain?.id
})

const Team = () => {

    const actions = {
        ...buildActions('team'),
        searchUsers: (query) => get('/users/search', {query})
    }
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            captain: null
        },
        onSubmit: values => {
            actions.save(toApi(values)).then(res => navigate(`/teams/${res.id}`))
        }
    })


    return <Card title="Team" onSave={formik.handleSubmit}>
        <FormInput name="name" label="Name" formik={formik}/>
        <FormInput name="description" label="Description" formik={formik} multiline/>
        <FormAutocomplete name="captain" label="Captain" formik={formik} search={actions.searchUsers}
                          labelField='email'/>
    </Card>
}

export default Team;