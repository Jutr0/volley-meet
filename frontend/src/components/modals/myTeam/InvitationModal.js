import Modal from "../../common/modals/Modal";
import {useFormik} from "formik";
import FormInput from "../../common/form/FormInput";
import Box from "@mui/material/Box";
import React from "react";
import * as Yup from "yup";
import {save} from "../../../utils/actionsBuilder";

const validationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Required')
});

const InvitationModal = ({onClose, onInvite, team}) => {

    const actions = {inviteUser: email => save('/invitations/invite', 'POST', {invitation: {email, team_id: team.id}})}

    const handleInvite = ({email}) => {
        actions.inviteUser(email).then(() => {
            onInvite(email);
        }).catch(exception => {
            if (exception.response.data?.code === "user_email_not_found") {
                formik.setErrors({email: 'User with this email does not exist'})
            } else if (exception.response.data?.code === "invitation_already_sent") {
                formik.setErrors({email: 'Invitation already sent to this user'})
            } else {
                throw exception;
            }
        });
    }

    const formik = useFormik({
        initialValues: {email: ''},
        onSubmit: handleInvite,
        validationSchema
    })

    return <Modal open onClose={onClose} onSubmit={formik.handleSubmit} submitText="invite"
                  title={`Invite member - ${team.name}`}>
        <Box component="form" sx={{mt: 2}}>
            <FormInput name="email" label="Email" type="email" formik={formik}/>
        </Box>
    </Modal>
}

export default InvitationModal;