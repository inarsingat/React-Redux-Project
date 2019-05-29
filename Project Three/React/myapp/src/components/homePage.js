import React from 'react'
import {connect} from 'react-redux'
import {getAllData,addNewVacation,editVacation,buildChart} from '../actions/homepage';
import {logout} from '../actions/login'
import Modal from 'react-modal'
import Card from './vacation'
import Form from './form'
import Chart from './statistics'
import '..//vacations.css'
import moment from 'moment';

const _ = require('lodash')

class HomePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            description:'',
            destination:'',
            img_url:'',
            from_date:'',
            to_date:'',
            price:0,
            id:'',
            chartModalIsOpen: false
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({chartModalIsOpen: true});
    }

    closeModal() {
        this.setState({chartModalIsOpen: false});
    }  
    
    openForm(){
        return (this.props.data.name[0].is_admin === 1) ? "#form" : null
    }

    stats(){
        return (this.props.data.name[0].is_admin === 1) ? "charts" : "d-none" ;
    }
    
    onChange(value,field){
        this.setState({
            [field]:value
        })
    }
    
    emptyState(){
        this.setState({
            description:'',
            destination:'',
            img_url:'',
            from_date:'',
            to_date:'',
            price:0,
            id:''
        })
    }

    editFunction(id){
        window.scrollTo(0, 0)

        let i = this.props.data.vacations.findIndex(x => x.id === id)
        let from = moment(this.props.data.vacations[i].from_date).format("YYYY-MM-DD")
        let to = moment(this.props.data.vacations[i].to_date).format("YYYY-MM-DD")
        
        this.setState({
            description:this.props.data.vacations[i].description,
            destination:this.props.data.vacations[i].destination,
            price:this.props.data.vacations[i].price,
            from_date:from,
            to_date:to,
            id
        })
    }

    addNewVacation(){
        let fd = new FormData();
        fd.append("image", this.state.img_url);

        let vac = _.cloneDeep(_.omit(this.state,['id','price','img_url','chartModalIsOpen']))
        vac['price'] = parseInt(this.state.price)
        
        fd.append("vacation", JSON.stringify(vac))
    
        if(this.state.id === ''){
            this.emptyState()
            return this.props.addNewVacation(fd)
        }
        this.emptyState()
        return this.props.editVacation(this.state.id,fd)   
    }

    chart(){
        this.props.buildChart()
        this.openModal()
    }

    logoutFunction(){
        this.props.logout()
        this.props.history.push('/login')
    }

    render(){
        
        if(_.isEmpty(this.props.data) && this.props.loginStatus.status === null && this.props.connection.connected === null){
            this.props.history.push('/login')
        }

        if(this.props.loginStatus.status === false ){
            this.props.history.push('/login')
        }
        
        if(this.props.data.vacations === undefined){
            return null
        }

        let cols = [[], [], [], []];
        for (let i = 0; i < this.props.data.vacations.length; i++) {
            const element = this.props.data.vacations[i];
            cols[i%4].push(element);
        }        

        return(
            <div>
                <header className ="navbar userName">
                    <div className="navbar-brand">{'Welcome  ' + this.props.data.name[0].name}</div>
                    <div>
                        <button id="addBtn" className={this.stats()} data-toggle="collapse" data-target={"#form"}>Add vacation</button>
                        <button onClick={() => this.chart()} className={this.stats()}>See Statistics</button>
                        <button className="logout" onClick={() => this.logoutFunction()}>Logout</button>
                    </div>
                </header>
                <div className="row">
                    <Modal isOpen={this.state.chartModalIsOpen} onRequestClose={this.closeModal} className="col-8 mx-auto">
                      <div className="col-12 mx-auto"><Chart/></div>
                    </Modal>
                    <div id="form" className="collapse col-12">
                        <Form data={this.state} onChange={(value,field) => this.onChange(value,field)} addVacation={() => this.addNewVacation()} clearForm={() => this.emptyState()}/>
                    </div>
                    <div className="col-12">
                        <div className="row">
                            {cols.map((eachcolumn,index) => 
                            <div className="col-12 col-md-4 col-lg-3" key = {index}> {eachcolumn.map((vac,idx) => 
                                <Card key={idx} vac={vac} editForm = {() => this.openForm()} editFunction = {(id) => this.editFunction(id)}/> )}
                            </div>)}
                        </div>
                    </div>
                </div>
    
            </div>
        )
    }
    componentDidMount(){
        this.props.getAllData()
    }
}

const mapStateToProps = state => {
    return {
        data:state.newData,
        loginStatus:state.login,
        connection:state.connection
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout:() => dispatch(logout()),
        getAllData:() => dispatch(getAllData()),
        addNewVacation:vacation => dispatch(addNewVacation(vacation)),
        editVacation:(id,vacation) => dispatch(editVacation(id,vacation)),
        buildChart:() => dispatch(buildChart())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HomePage);