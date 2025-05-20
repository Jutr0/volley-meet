import Card from "../common/Card";
import {DataTable} from "../ui/data-table";
import _ from "lodash";
import {buildActions, save} from "../../utils/actionsBuilder";
import {useEffect, useState} from "react";
import {Button} from "../ui/button";

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

    const columns = [
            {
                accessorKey: 'team',
                header: 'Team',
                cell: ({ row }) => row.original.team.name
            },
            {
                accessorKey: 'status',
                header: 'Status',
                cell: ({ row }) => _.startCase(row.original.status)
            },
            {
                id: 'actions',
                accessorKey: 'actions',
                header: 'Actions',
                cell: ({ row }) => {
                    const invitation = row.original;
                    return invitation.status === 'pending' && (
                        <div className="flex space-x-2">
                            <Button variant="success" onClick={() => handleAccept(invitation)}>
                                Accept
                            </Button>
                            <Button variant="destructive" onClick={() => handleDecline(invitation)}>
                                Decline
                            </Button>
                        </div>
                );
            }
        }
    ];

    return <Card title="Invitations">
        <DataTable
            columns={columns}
            data={invitations}
            isLoading={loading}
        />
    </Card>
}

export default Invitations;