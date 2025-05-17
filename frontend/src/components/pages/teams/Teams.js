import React, {useEffect, useState} from 'react';
import {Box, Button} from '@mui/material';
import Table from '../../common/Table';
import {buildActions} from "../../../utils/actionsBuilder";
import {useNavigate} from "react-router-dom";
import Card from "../../common/Card";

const columns = [
    {field: 'name', headerName: 'Team Name', width: 250},
    {field: 'description', headerName: 'Description', width: 300},
];

const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const actions = buildActions('team')
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        actions.getAll().then(res => {
            setTeams(res)
            setLoading(false)
        })
    }, []);

    const handleEdit = (team) => {
        navigate(`/superadmin/teams/${team.id}`)
    };

    const handleAddNew = () => {
        navigate("/superadmin/teams/new")
    };

    const handleDelete = (team) => {
        actions.delete(team).then(() => setTeams(teams.filter(t => t.id !== team.id)))
    };


    return (
        <Card title="Teams" buttons={
            <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleAddNew}
            >
                + Create
            </Button>}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2}}>

            </Box>

            <Table
                data={teams}
                columns={columns}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </Card>
    );
};

export default Teams;
