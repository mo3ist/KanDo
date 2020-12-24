
// Ation types
export const LOGGED_IN = "LOGGED_IN"
export const SIGNED_UP = "SIGNED_UP"
export const LOGGED_OUT = "LOGGED_OUT"
// Action Creator 
export const localLogIn = (token) => {
    return ({
        type: LOGGED_IN,
        payload: {
            token: token
        }
    })
}

export const logOutAction = () => {
    return ({
        type: LOGGED_OUT,
        payload: {

        }
    })
}

// Reducer
const initialState = {
    logged_in: false,
    token: ""
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case LOGGED_IN:
            return {
                ...state, 
                logged_in: true,
                token: action.payload.token
            }

        case SIGNED_UP:
            return {
                ...state, 
                logged_in: true,
                token: action.payload.token}
        
        case LOGGED_OUT:
            return {
                ...state,
                logged_in: false,
                token: ""
            }

        default:
            return state
    }
}
export default user

