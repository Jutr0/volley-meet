import React, {useEffect, useState} from 'react';
import {buildActions} from "../../../utils/actionsBuilder";
import {useNavigate} from "react-router-dom";
import Card from "../../common/Card";
import {Button} from "../../ui/button";
import {DataTable} from "../../ui/data-table";

const columns = [
    {
        accessorKey: 'name',
        header: 'Team Name',
    },
    {
        accessorKey: 'description',
        header: 'Description',
    },
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
                size="sm"
                onClick={handleAddNew}
            >
                + Create
            </Button>}>
            <DataTable
                data={teams}
                columns={columns}
                isLoading={loading}
                onRowAction={(row, action) => {
                    if (action === 'edit') {
                        handleEdit(row.original);
                    } else if (action === 'delete') {
                        handleDelete(row.original);
                    }
                }}
            />
        </Card>
    );
};

export default Teams;
