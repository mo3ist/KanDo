import axios from "axios"

import {API_CALLED, API_CALL_SUCCEEDED, API_CALL_FAILED} from "../store/api"

export const apiMiddleware = store => next => action => {
    if (action.type === API_CALLED){
        const {url, method, data, onSuccess} = action.payload
        // Chose to handle auth here because it'll be repetitive elsewhere
        let token = store.getState().user.token
        if (token){token = "Token " + token}
        axios({
            method: method,
            url: url,
            headers: {
                "Authorization": token
            },
            data: data,
        })
        .then(res => {

            store.dispatch({type: API_CALL_SUCCEEDED})
            console.log(res.data)
            store.dispatch({type: onSuccess, payload: res.data})
        })
        .catch(error => {
            console.log(error)
            store.dispatch({type: API_CALL_FAILED})
        })
        next(action)
    }
    else {
        return next(action) 
    }

}