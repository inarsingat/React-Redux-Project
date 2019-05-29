const newUser = (state = {added:false}, action) => {
    switch(action.type){
        case 'NEW_USER':
        return action.payload
    
        default:
        return state;
    }
}

export default newUser;