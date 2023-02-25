
import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import UserRow from '../components/UserRow';
import { fetchUser } from '../store/actions/user/actionCreator';

export default function Dashboard(){
    const dispatch = useDispatch()
    const users = useSelector(state => {
        return state.user.users
    })

    useEffect(() => {
        dispatch(fetchUser())
    }, [])

    const row = users.map((user, idx) => {
        return <UserRow key={user.id} queue={idx+1} user={user}/>
    })

    return(
        <>
        <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-2">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Users</h1>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Adress</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {row}
                </tbody>
            </Table>
        </div>
        </>
    )
}