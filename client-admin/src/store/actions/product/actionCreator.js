import url from '../../../url/url'
import axios from 'axios'
import Swal from 'sweetalert2'
import { CREATE_PRODUCT, FETCH_PRODUCT, FETCH_PRODUCT_BY_ID } from './actionType'

export function fetchProduct(name) {
    let fetchUrl = `${url.api}/products`

    if(name) {
        fetchUrl = fetchUrl + "&name=" + name
    }

    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'get',
                url: fetchUrl,
                headers: {access_token: localStorage.access_token}
            })

            dispatch({
                type: FETCH_PRODUCT,
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

export function fetchProductById(id) {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'get',
                url: `${url.api}/products/${id}`,
                headers: {access_token: localStorage.access_token}
            })

            dispatch({
                type: FETCH_PRODUCT_BY_ID,
                payload: data
            })
            // console.log(data, '<<<< from action');
            return data
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message,
              })
        }
    }
}

export function createProduct(payload) {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'post',
                url: `${url.api}/products`,
                headers: {access_token: localStorage.access_token},
                data: payload
            })

            await dispatch({
                type: CREATE_PRODUCT,
                payload: data
            })

            dispatch(fetchProduct())

            Swal.fire({
                icon: 'success',
                title: `New product added`,
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

export function updateProduct(payload, id) {
    return async (dispatch) => {
        try {
            const { data } = await axios({
                method: 'put',
                url: `${url.api}/products/${id}`,
                headers: {access_token: localStorage.access_token},
                data: payload
            })

            dispatch(fetchProduct())

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

export function deleteProduct(id){
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
                    url: `${url.api}/products/${id}`,
                    headers: { access_token: localStorage.access_token }
                })

                await dispatch(fetchProduct())
                
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