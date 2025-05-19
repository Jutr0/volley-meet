import Card from "../common/Card";
import Table from "../common/Table";
import _ from "lodash";
import {buildActions, save} from "../../utils/actionsBuilder";
import {useEffect, useState} from "react";
import {Button} from "../ui/button";

const columns = [
    {field: 'team', headerName: 'Team', render: team => team.name},
    {field: 'status', headerName: 'Status', render: status => _.startCase(status)},
]
const Invitations = () => {

    const [invitations, setInvitations] = useState([]);
    const [loading, setLoading] = useState(true);

    const actions = {
        ...buildActions('invitation'),
        accept: (invitation) => save(`invitations/${invitation.id}/accept`, 'PUT'),
        decline: (invitation) => save(`invitations/${invitation.id}/decline`, 'PUT'),
    }

    useEffect(() => {
        setLoading(true)
        actions.getAll().then((res) => {
            setInvitations(res)
            setLoading(false)
        });
    }, []);

    const handleAccept = invitation => actions.accept(invitation).then(() => {
        setInvitations(invitations.map(i =>
            i.id === invitation.id ? {...i, status: 'accepted'} : i
        ))
    })

    const handleDecline = invitation => actions.decline(invitation).then(() => {
        setInvitations(invitations.map(i =>
            i.id === invitation.id ? {...i, status: 'declined'} : i
        ))
    })
    const renderActions = (row) => row.status === 'pending' && <>
        <Button variant="success" onClick={() => handleAccept(row)}>
            Accept
        </Button>
        <Button variant="destructive" onClick={() => handleDecline(row)}>
            Decline
        </Button>
    </>

    return <Card title="Invitations">
        <Table columns={columns} data={invitations} renderActions={renderActions} loading={loading}/>
    </Card>
}

export default Invitations;