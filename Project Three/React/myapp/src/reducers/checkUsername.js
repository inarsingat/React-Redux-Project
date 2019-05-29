const username = (state = {approved:null}, action) => {
    switch(action.type){
        case 'USERNAME_OK':
        return action.payload
    
        default:
        return state;
    }
}

export default username;