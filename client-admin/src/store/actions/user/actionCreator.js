import url from '../../../url/url'
import axios from 'axios'
import Swal from 'sweetalert2'
import { FETCH_USER } from './actionType'

export function fetchUser() {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'get',
                url: `${url.api}/customers`,
                headers: {access_token: localStorage.access_token}
            })

            dispatch({
                type: FETCH_USER,
                payload: data
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message,
              })
        }
    }
}

export function updateStatusBan(id) {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'patch',
                url: `${url.api}/customers/${id}`,
                headers: {access_token: localStorage.access_token}
            })

            dispatch(fetchUser())

            Swal.fire({
                icon: 'success',
                title: data.message,
                showConfirmButton: false,
                timer: 1500
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message,
              })
        }
    }
}

export function deleteUser(id){
    return async (dispatch) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              })
      
              if (result.isConfirmed) {
                const { data } = await axios({
                    method: 'delete',
                    url: `${url.api}/customers/${id}`,
                    headers: { access_token: localStorage.access_token }
                })

                await dispatch(fetchUser())
                
                Swal.fire('Deleted!', data.message, 'success')
              }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message,
              })
        }
    }
}