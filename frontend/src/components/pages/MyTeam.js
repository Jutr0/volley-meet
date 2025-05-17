import Card from "../common/Card";
import {get} from "../../utils/actionsBuilder";
import React, {useContext, useEffect, useState} from "react";
import Table from "../common/Table";
import {formatUserName} from "../../utils/formatters/user";
import Typography from "@mui/material/Typography";
import {Box, Divider, Paper} from "@mui/material";
import InfoItem from "../common/InfoItem";
import ConfirmationModal from "../common/modals/ConfirmationModal";
import Button from "../common/Button";
import InvitationModal from "../modals/myTeam/InvitationModal";
import {AuthContext} from "../../contexts/AuthContext";

const membersColumns = [
    {
        field: 'id', headerName: 'User', render: (_, user) => formatUserName(user)
    },
]

const MyTeam = () => {
    const actions = {getTeam: () => get('/my_team')}
    const {currentUser} = useContext(AuthContext);
    const [team, setTeam] = useState();
    const [loading, setLoading] = useState(true);
    const [memberToDelete, setMemberToDelete] = useState();
    const [inviteModal, setInviteModal] = useState();
    const handleDeleteMember = (member) => {
        setMemberToDelete(member)
    }
    const deleteMember = (member) => {
        const newMembers = team.members.filter(m => m.id !== member.id);
        setTeam({...team, members: newMembers})
    }

    const inviteMember = () => {
        setInviteModal(true);
    }

    useEffect(() => {
        setLoading(true);
        actions.getTeam()
            .then(setTeam)
            .finally(() => setLoading(false));
    }, []);

    return <><Card title={team ? `My Team - ${team.name}` : 'My Team'} loading={loading}
                   buttons={<><Button onClick={inviteMember}> Invite member</Button></>}>
        {team && (
            <Box>
                <Paper elevation={0} sx={{p: 2, mb: 3, bgcolor: 'background.paper', borderRadius: 1}}>
                    <InfoItem label="Captain" value={formatUserName(team.captain)}/>
                    <InfoItem label="Description" value={team.description || 'No description provided'}/>
                </Paper>

                <Typography variant="h6" sx={{mb: 2}}>
                    Team members
                </Typography>
                <Divider sx={{mb: 2}}/>

                <Table
                    data={team.members || []}
                    columns={membersColumns}
                    onDelete={currentUser.team.captain ? handleDeleteMember : null}
                />
            </Box>
        )}
    </Card>
        {memberToDelete && <ConfirmationModal open
                                              onConfirm={() => {
                                                  deleteMember(memberToDelete);
                                                  setMemberToDelete(null);
                                              }}
                                              item={formatUserName(memberToDelete)}
                                              onCancel={() => setMemberToDelete(null)}
                                              title={'Delete member - ' + formatUserName(memberToDelete)}
        />}
        {inviteModal &&
            <InvitationModal onClose={() => setInviteModal(false)} onInvite={() => setInviteModal(false)} team={team}/>}
    </>
}

export default MyTeam;