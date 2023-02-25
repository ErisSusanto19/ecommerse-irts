import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { deleteUser, updateStatusBan } from '../store/actions/user/actionCreator';

export default function ProductRow({user, queue}){
    const dispatch = useDispatch()

    const editStatusBan = () => {
        dispatch(updateStatusBan(user.id))
    }

    const deleteClicked = () => {
        dispatch(deleteUser(user.id))
    }

    return (
        <>
        <tr>
            <td>{queue}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.address}</td>
            <td>
                {user.banned? (
                        <Button onClick={editStatusBan} variant="primary" className="mx-2">Unban</Button>
                    ) : (
                            
                        <Button onClick={editStatusBan}  variant="primary" className="mx-2">Ban</Button>
                    )
                }
                <Button onClick={deleteClicked} variant="danger" >Delete</Button>
            </td>
        </tr>
        </>
    )
}