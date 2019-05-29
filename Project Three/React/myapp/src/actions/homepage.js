import axios from 'axios'


export const removeFollow = id => {
    return dispatch => axios.patch('http://localhost:4005/vacations-project/unfollow?vac='+id).then(() => {
        dispatch(removefollowers(id))
    }).catch((err) => {
        console.log('Something Went Wrong')
    })
}

export const favorite = id => {
    return dispatch => axios.patch('http://localhost:4005/vacations-project/follow?vac='+id).then(() => {
        dispatch(addfollowers(id))
    }).catch((err) => {
        console.log('Something Went Wrong')
    })
}

export const remove = id => {
    return dispatch => axios.patch('http://localhost:4005/vacations-project/delete?id='+id).then(() => {
        dispatch(deleteVacation(id))
    }).catch((err) => {
        console.log('Something Went Wrong')
    })
}

export const addNewVacation = obj => {
    return dispatch => axios.put('http://localhost:4005/vacations-project/add-vacation',obj,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(() => {
        dispatch(getAllData())
    }).catch((err) => {
        console.log('Something Went Wrong')
    })
}

export const getAllData = () => {
    return dispatch => axios.get('http://localhost:4005/vacations-project/home').then(({data}) => {
        dispatch(newData(data))
    }).catch((err) => {
        console.log('Could Not Get')
    })
}

export const newData = data =>{
    return {
        type:'NEW_DATA',
        payload:data
    }
}

export const editVacation = (id,obj) => {
    return dispatch => axios.patch('http://localhost:4005/vacations-project/edit?id='+id,obj,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    }).then(() => {
        dispatch(getAllData())
    }).catch((err) => {
        console.log('Something Went Wrong')
    })
}

export const buildChart = () => {
    return dispatch => axios.get('http://localhost:4005/vacations-project/stats').then(({data}) => {
        dispatch(chartData(data))
    }).catch((err) => {
        console.log('Could Not Get')
    })
}

export const addfollowers = id => {
    return {
        type:'ADD_FOLLOW',
        payload:id
    }
}

export const removefollowers = id => {
    return {
        type:'REMOVE_FOLLOW',
        payload:id
    }
}

export const deleteVacation = id => {
    return {
        type:'DELETE',
        payload:id
    }
}


export const chartData = arr => {
    return {
        type:'CHART',
        payload:arr
    }
}