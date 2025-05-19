import React from 'react';
import Modal from '../../common/modals/Modal';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import FormInput from "../../common/form/FormInput";
import FormSelect from "../../common/form/FormSelect";
import FormCheckbox from "../../common/form/FormCheckbox";
import {ROLES} from "../../../utils/constants";
import * as _ from 'lodash';

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    name: Yup.string()
        .required('Required'),
    surname: Yup.string()
        .required('Required'),
    role: Yup.string()
        .required('Required'),
    change_password: Yup.boolean(),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .when(['id', 'change_password'], {
            is: (id, change_password) => id === undefined || change_password === true,
            then: schema =>
                schema.required('Required'),
            otherwise: schema =>
                schema.notRequired(),
        }),
    password_confirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .when(['id', 'change_password'], {
            is: (id, change_password) => id === undefined || change_password === true,
            then: schema =>
                schema.required('Required'),
            otherwise: schema =>
                schema.notRequired(),
        }),
});

const UserModal = ({onClose, user, onSave}) => {
    const isNewUser = !user?.id;

    const formik = useFormik({
        initialValues: {
            role: 'user', ...user
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            if (!isNewUser && !values.change_password) {
                delete values.password;
            }

            onSave(values);
            onClose();
        }
    });

    return (
        <Modal
            open
            onClose={onClose}
            title={isNewUser ? 'Add New User' : 'Edit User'}
            onSubmit={formik.handleSubmit}
            submitDisabled={formik.isSubmitting || !formik.isValid}
        >
            <form onSubmit={formik.handleSubmit}>
                <FormInput name="name" label="Name" formik={formik}/>
                <FormInput name="surname" label="Surname" formik={formik}/>
                <FormInput name="nickname" label="Nickname" formik={formik}/>
                <FormInput name="email" label="Email" type="email" formik={formik}/>
                <FormSelect
                    name="role"
                    label="Role"
                    options={
                        Object.values(ROLES).map(role => ({value: role, label: _.upperFirst(role)}))
                    }
                    formik={formik}
                />
                {!isNewUser && <FormCheckbox name="change_password" label="Change password" formik={formik}/>}
                {(isNewUser || formik.values.change_password) && <>
                    <FormInput name="password" label="Password" type="password" formik={formik}/>
                    <FormInput name="password_confirmation" label="Password confirmation" type="password"
                               formik={formik}/>
                </>}
            </form>
        </Modal>
    );
};

export default UserModal;
