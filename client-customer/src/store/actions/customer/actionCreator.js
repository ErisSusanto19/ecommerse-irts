import url from '../../../url/url'
import Swal from 'sweetalert2'
import axios from 'axios'

export function loginCustomer(formLogin){
    return async (dispatch) => {
        try {
            console.log(formLogin, '<<<<<< from action');
            const { data } = await axios({
                method: "post",
                url: `${url.api}/customers/login`,
                data: formLogin
              })

              console.log(data, '<<<< data form action');

              localStorage.setItem("access_token", data.access_token)
              localStorage.setItem("username", data.username)

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

export function registerCustomer(formRegister){
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: "post",
                url: `${url.api}/customers/register`,
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