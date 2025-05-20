import FormInput from "../../common/form/FormInput";
import {useFormik} from "formik";
import Card from "../../common/Card";
import {buildActions, get} from "../../../utils/actionsBuilder";
import FormAutocomplete from "../../common/form/FormAutocomplete";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import * as Yup from "yup";
import {DataTable} from "../../ui/data-table";
import {formatUserName} from "../../../utils/formatters/user";

const toApi = (resource) => ({
    ...resource,
    captain_id: resource.captain?.id
})
const toFormik = (resource) => ({
    ...resource,
    captain: {label: resource.captain?.email, ...resource.captain}
})

const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    captain: Yup.object().required('Required'),
});

const membersColumns = [
    {
        accessorKey: 'id', 
        header: 'User', 
        cell: ({ row }) => formatUserName(row.original)
    },
]

const Team = () => {
    const [initialValues, setInitialValues] = useState({});
    const {id} = useParams();
    const isNew = id === 'new';

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
        validationSchema,
        onSubmit: values => actions.save(toApi(values)).then(res => {
            setInitialValues(res);
            navigate(`/superadmin/teams/${res.id}`)
        })
    });

    useEffect(() => {
        if (!isNew) {
            actions.getOne(id)
                .then(team => {
                    formik.setValues(toFormik(team));
                    setInitialValues(team);
                })
        }
    }, [id]);

    const title = isNew ? "Create Team" : `Edit Team - ${initialValues.name}`;

    return <><Card title={title} onSave={formik.handleSubmit}>
        <FormInput name="name" label="Name" formik={formik}/>
        <FormInput name="description" label="Description" formik={formik} multiline/>
        <FormAutocomplete name="captain" label="Captain" formik={formik} search={actions.searchUsers}
                          labelField='email'/>
        <div>Members: </div>
        <DataTable
            data={formik.values.members || []}
            columns={membersColumns}
            isLoading={false}
        />
    </Card>
    </>
}

export default Team;