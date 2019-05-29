const connection = (state = {connected:null}, action) => {
    switch(action.type){
        case 'USER_CONNECTED':
        return action.payload

        default:
        return state;
    }
}

export default connection;