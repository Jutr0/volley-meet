import React, {useEffect, useState} from 'react';
import {Box, Button, Typography} from '@mui/material';
import Table from '../../common/Table';
import {buildActions} from "../../../utils/actionsBuilder";
import {useNavigate} from "react-router-dom";

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
        navigate(`/teams/${team.id}`)
    };

    const handleAddNew = () => {
        navigate("/teams/new")
    };

    const handleDelete = (id) => {
        actions.delete({id})
    };


    return (
        <Box sx={{width: '100%', padding: 2}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2}}>
                <Typography variant="h4" component="h1">
                    Teams Management
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddNew}
                >
                    Add New Team
                </Button>
            </Box>

            <Table
                data={teams}
                columns={columns}
                loading={loading}
                getRowId={(row) => row.id}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </Box>
    );
};

export default Teams;
