import {combineReducers} from 'redux';
import username from './checkUsername';
import newUser from './addNewUser';
import login from './loginStatus';
import newData from './homepageData';
import chart from './chartData';
import connection from './connection';

export default combineReducers({
    username,
    newUser,
    login,
    newData,
    chart,
    connection
});