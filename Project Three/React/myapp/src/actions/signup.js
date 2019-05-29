import axios from 'axios'

export const checkUsername = (name) => {
    return dispatch => axios.post('http://localhost:4005/vacations-project/validate-username',name).then(() => {
        dispatch(usernameOk({approved:true}))
    }).catch((err) => {
        dispatch(usernameOk({approved:false}))
    })
}

export const usernameOk = (status) => {
    return {
        type:'USERNAME_OK',
        payload:status
    }
}

export const newMember = (details) => {
    return dispatch => axios.post('http://localhost:4005/vacations-project/signup',details).then(() => {
        dispatch(userAdded({added:true}))
    }).catch((err) => {
        dispatch(userAdded({added:false}))
    })
}

export const userAdded = (status) => {
    return {
        type:'NEW_USER',
        payload:status
    }
}