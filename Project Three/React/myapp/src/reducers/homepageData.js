const _ = require('lodash')

const newData = (state = [], action) => {
    const data = _.cloneDeep(state);
    switch(action.type){
        case 'NEW_DATA':
        return (
            action.payload
        )
        
        case 'ADD_FOLLOW':
        data.following.push({vacation_id:action.payload})
        return data
        
        case 'REMOVE_FOLLOW':
        const index = _.findIndex(data.following,function(v){return v.vacation_id === action.payload})
        data.following.splice(index,1)
        return data
        
        case 'DELETE':
        const idx = _.findIndex(data.vacations,function(v){return v.id === action.payload})
        data.vacations.splice(idx,1)
        return data

        default:
        return state;
    }
}

export default newData;