import {buildActions, save} from "../../utils/actionsBuilder";
import {useEffect, useState} from "react";
import {Button} from "../ui/button";
import UserModal from "../modals/users/UserModal";
import Card from "../common/Card";
import {formatUserName} from "../../utils/formatters/user";
import {DataTable} from "../ui/data-table.js";

const columns = [
    {
        accessorKey: 'id', 
        header: 'User', 
        cell: ({ row }) => formatUserName(row.original)
    },
    {accessorKey: 'email', header: 'Email'},
    {accessorKey: 'role', header: 'Role'}
]

const Users = () => {
    const actions = {
        ...buildActions('user'),
        create: (user) => save('/users/create', 'POST', {user}),
    };

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        setLoading(true)
        actions.getAll().then(res => {
            setUsers(res)
            setLoading(false)
        })
    }, []);

    const handleDelete = (user) => {
        actions.delete(user).then(() => setUsers(users.filter(u => u.id !== user.id)))
    }
    const handleSave = (user) => {
        if (user.id) {
            actions.save(user).then((res) => {
                setUsers(users.map(u => u.id === res.id ? res : u))
            })
        } else {
            actions.create(user).then(res => {
                setUsers([...users, res])
            })
        }
    }

    return (
        <Card title="Users"
              buttons={<Button size="sm" onClick={() => setSelectedUser({})}>
                  + Create
              </Button>}>
            <DataTable
                columns={columns}
                data={users}
                onEdit={setSelectedUser}
                onDelete={handleDelete}
                loading={loading}
            />
            {selectedUser && <UserModal
                onClose={() => setSelectedUser(null)}
                user={selectedUser}
                onSave={handleSave}
            />}
        </Card>
    );
}

export default Users;