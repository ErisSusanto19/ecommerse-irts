import { FETCH_USER } from "../actions/user/actionType";

const initState = {
    users: [],
}

function userReducer(state = initState, action){
    switch (action.type) {
        case FETCH_USER:
            return {
                ...state,
                users: action.payload
            }
    
        default:
            return state
    }
}

export default userReducer