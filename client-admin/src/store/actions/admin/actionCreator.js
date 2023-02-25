import url from '../../../url/url'
import Swal from 'sweetalert2'
import axios from 'axios'

export function login(formLogin){
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: "post",
                url: `${url.api}/admins/login`,
                data: formLogin
              })

              localStorage.setItem("access_token", data.access_token)
              localStorage.setItem("email", data.email)

            Swal.fire({
                icon: 'success',
                title: `Welcome ${data.email}`,
                showConfirmButton: false,
                timer: 1500
              })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data,
              })
        }
    }
}

export function register(formRegister){
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: "post",
                url: `${url.api}/admins/register`,
                headers: {access_token: localStorage.access_token},
                data: formRegister
              })

            Swal.fire({
            icon: 'success',
            title: `${data.email} successfully registered`,
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