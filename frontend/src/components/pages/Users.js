import Table from "../common/Table";
import {buildActions, save} from "../../utils/actionsBuilder";
import {useEffect, useState} from "react";
import Button from "../common/Button";
import UserModal from "../modals/UserModal";
import Card from "../common/Card";
import {formatUserName} from "../../utils/formatters/user";

const columns = [
    {
        field: 'id', headerName: 'User', render: (_, user) => formatUserName(user)
    },
    {field: 'email', headerName: 'Email'},
    {field: 'role', headerName: 'Role'}
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

    const handleDelete = (id) => {
        actions.delete({id}).then(() => setUsers(users.filter(user => user.id !== id)))
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
              buttons={<Button size="small" variant="contained" onClick={() => setSelectedUser({})}>
                  + Create
              </Button>}>
            <Table
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