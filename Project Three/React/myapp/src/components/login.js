import React from 'react';
import {connect} from 'react-redux';
import {loginToAccount, checkConnection} from '../actions/login'
import {usernameOk} from '../actions/signup'

import '..//vacations.css'
import Logo from '../components/Images/loginlogo.jpg'

const _ = require('lodash')

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
            message:''
        }
    }

    onChange(value,field){
        this.setState({
            [field]:value,
            message:''
        })
    }

    login(){
        if(_.some(_.map(_.omit(this.state,'message'), x=> _.isEmpty(x.trim())))){
            return this.setState({
                message:'Some fields are missing'
            })
        }

        this.props.loginToAccount(_.omit(this.state,'message'))
    }

    render(){
        if(this.props.connection.connected === null){
            return null
        }

        if(this.props.loginStatus.status === true || (this.props.connection.connected === true && this.props.loginStatus.status !== false)){
            this.props.history.push('/home')
        }

        if(this.props.loginStatus.status === false && this.props.connection.connected !== true){
            this.props.history.push('/')
        }

        return(
            <div className="row mt-5">
                <div className="col-5 mx-auto align-content-center border border-secondary pb-4 pt-4">
                    <div className="row text-center">
                        <img src={Logo} className="logoImg mx-auto"/>
                        <h4 className="col-12 font-weight-bolder">Welcome to Vacations</h4>
                        <p className="mx-auto mb-4">Please sign in below or <span onClick = {() => this.props.history.push('/')} className="goToSignup">create an account</span></p>
                    </div>
                    <div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" id="username" placeholder="Username" onChange={({target}) => this.onChange(target.value,'username')}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Password" onChange={({target}) => this.onChange(target.value,'password')}/>
                        </div>
                    </div>
                    <p className="text-danger">{this.state.message}</p>
                    <button className="btn btn-block btn-success mb-4 text-truncate" onClick={() => this.login()}>Log in to your account</button>
                </div>
            </div>
        ) 
    }

    componentDidMount(){
        this.props.checkConnection()
        this.props.usernameOk({approved:null})
    }
}

const mapStateToProps = state => {
    return{
        loginStatus:state.login,
        connection:state.connection
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginToAccount:details => dispatch(loginToAccount(details)),
        checkConnection:() => dispatch(checkConnection()),
        usernameOk:status => dispatch(usernameOk(status))
    }
}
export default connect (mapStateToProps,mapDispatchToProps)(Login);