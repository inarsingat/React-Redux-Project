import axios from 'axios';

export const loginToAccount = details => {
    return dispatch => axios.post('http://localhost:4005/vacations-project/login',details).then(() => {
        dispatch(loginStatus({status:true}))
    }).catch((err) => {
        dispatch(loginStatus({status:false}))
    })
}

export const loginStatus = status => {
    return{
        type:'LOGIN_SUCCESS',
        payload:status
    }
}

export const checkConnection = () => {
    return dispatch => axios.get('http://localhost:4005/vacations-project/connection').then(() => {
        dispatch(connection({connected:true}))
    }).catch((err) => {
        dispatch(connection({connected:false}))
    })
}

export const connection = status => {
    return {
        type:'USER_CONNECTED',
        payload:status
    }
}

export const logout = () => {
    return dispatch => axios.post('http://localhost:4005/vacations-project/logout').then(() => {
        dispatch(loginStatus({status:false}))
    }).catch((err) => {
       console.log(err)
    })
}