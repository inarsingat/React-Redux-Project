import React from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {checkUsername, newMember, userAdded, usernameOk} from '../actions/signup'
import {loginStatus} from '../actions/login'
import '..//vacations.css'

const _ = require('lodash')

class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:'',
            last:'',
            username:'',
            password:'',
            message:''
        }
    }

    onChange(value, field){
        this.setState({
          [field]:value,
          message:''  
        })
    }

    addMember(){
        if(_.some(_.map(_.omit(this.state,'message'), x => _.isEmpty(x.trim())))){
            this.setState({
                message:'Some fields are missing'
            })
        }

        this.props.newMember(_.omit(this.state,'message'))
    }

    approved(){
        return (this.props.username.approved === true)?"text-success":"text-danger"
    }

    render(){
        if(this.props.newUser.added === true){
            this.props.history.push('/login')
            this.props.userAdded({added:false})
        }

        const placeholders = ["First name","Last Name", "Username", "Password"]
        const keys = _.keysIn(_.omit(this.state,['username','password','message']))
        const values = _.valuesIn(_.omit(this.state,['username','password','message']))

        let message = '';

        if(this.props.username.approved === false){
            message = "Sorry, already taken. Choose another"
        }
        if(this.props.username.approved === true){
            message = "Username approved, we're good to go :)"
        }

        return(
            <div className="container-fluid">
                <div className="mt-5 col-8 mx-auto mb-3 pt-4 pb-2 border border-secondary">
                    <p className="text-center mb-4">
                        <h4 className="font-weight-bolder">Welcome!</h4> 
                        <h5 className="font-weight-bold">Sign up to get a step closer to your next vacation...</h5></p>
                    <div className="form-row">
                        {keys.map((key, idx) => <div className="form-group col-6" key={idx}>
                            <label htmlFor={placeholders[idx]}>{placeholders[idx]}</label>
                            <input id = {placeholders[idx]} className="form-control" type="text" placeholder={placeholders[idx]} value={values[idx]} onChange = {(({target}) => this.onChange(target.value,key))} required pattern="\S+.*"/></div>)}
                    </div>
                    <div className="form-group">
                        <label htmlFor={placeholders[2]}>{placeholders[2]}</label>
                        <div className="row mx-auto">
                        <input id = {placeholders[2]} placeholder={placeholders[2]} className="form-control col-6 col-md-9" type="text" value={this.state.username} onChange = {(({target}) => this.onChange(target.value,'username'))} required pattern="\S+.*"/>
                        <button className="btn btn-info col-6 col-md-3 text-truncate" onClick={() => this.props.checkUsername({username:this.state.username})}>Check availability</button>
                        <p className={this.approved()}><br/>{message}</p>
                        </div>
                    </div>
                    <div className="form-group">    
                        <label htmlFor={placeholders[3]}>{placeholders[3]}</label>
                        <input id = {placeholders[3]} type="password" className="form-control" placeholder="Password" value={this.state.Password} onChange = {(({target}) => this.onChange(target.value,'password'))} required pattern="\S+.*"/>
                        <br/>
                        <p className="text-danger">* Please note  -  all fields are required</p>
                        <p className="text-danger">{this.state.message}</p>
                    </div>
                    <button className="btn btn-block btn-success" onClick={() => this.addMember()}>Submit</button>
                    <br/>
                    <p>Already a member?<span id="tologin" onClick={() => this.props.history.push('/login')}> Click here to Login</span></p>
                </div>
            </div>
        )
    }
    componentDidMount(){
        this.props.loginStatus({status:null})
    }
}
const mapStateToProps = state => {
    return {
        username:state.username,
        newUser:state.newUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        checkUsername:username => dispatch(checkUsername(username)),
        newMember:details => dispatch(newMember(details)),
        loginStatus:status => dispatch(loginStatus(status)),
        userAdded:status => dispatch(userAdded(status))
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Signup)