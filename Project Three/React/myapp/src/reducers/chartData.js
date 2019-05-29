const chart = (state = [], action) => {
    switch(action.type){
        case 'CHART':
        return action.payload
        
        default:
        return state;
    }
}

export default chart;