import { CREATE_PRODUCT, FETCH_PRODUCT, FETCH_PRODUCT_BY_ID } from "../actions/product/actionType";

const initState = {
    products: [],
    product: {}
}

function productReducer(state = initState, action){
    switch (action.type) {
        case FETCH_PRODUCT:
            return {
                ...state,
                products: action.payload
            }

        case CREATE_PRODUCT:
            return {
                ...state,
                products: state.products.concat(action.payload)
            }
        case FETCH_PRODUCT_BY_ID:
            return {
                ...state,
                product: action.payload
            }
    
        default:
            return state
    }
}

export default productReducer