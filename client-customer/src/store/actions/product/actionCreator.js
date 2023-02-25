import url from '../../../url/url'
import axios from 'axios'
import Swal from 'sweetalert2'
import { FETCH_PRODUCT, FETCH_PRODUCT_BY_ID } from './actionType'

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