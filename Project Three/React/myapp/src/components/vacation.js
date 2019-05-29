import React from 'react'
import {connect} from 'react-redux'
import {favorite,removeFollow,remove} from '../actions/homepage'
import '..//vacations.css'
import heart from '../components/Images/heart1.png'
import removeIcon from '../components/Images/remove.png'

import moment from 'moment';

const Card = (props) => {

    const renderFollowingArray = () => {
        return props.data.following.map(x => {
            return x.vacation_id
        })
    }
    
    const togglePicker = () => {
        return (props.data.name[0].is_admin === 1) ? "collapse" : "none"
    }

    const addToFavs = (id) => {
        if(props.data.name[0].is_admin === 0){
            if(renderFollowingArray().indexOf(id) !== -1){
                return props.removeFollow(id)
            }
            
            return props.favorite(id)
        }
        props.editFunction(id)
    }

    const addRemove = (id) => {
        if(renderFollowingArray().indexOf(id) !== -1 && props.data.name[0].is_admin === 0){
            return 'Unlike'
        }

        if(props.data.name[0].is_admin === 1){
            return 'Edit'
        }

        return 'Like'
    }

    const addIcon = (id) => {
        return (renderFollowingArray().indexOf(id) !== -1 || props.data.name[0].is_admin === 1) ? "inline" : "none"
    }
    
    const iconPicker = () => {
        return (props.data.name[0].is_admin === 1)? removeIcon : heart
    }

    const activeOnAdmin = () => {
        return (props.data.name[0].is_admin === 1)? "pointer" : ""
    }

    const removeVac = (id) => {
        if(props.data.name[0].is_admin === 1){
            return props.remove(id)
        }
    }
    return(
        <div className="card shadow mainCard mb-3">
            <div className="card-body">
                <button onClick = {() => addToFavs(props.vac.id)} className="add" data-toggle={togglePicker()} data-target={props.editForm()}> {addRemove(props.vac.id)}</button>
                <img className = "card-image-top vacImg" src={`/upload/${props.vac.img_url}`} title={props.vac.destination}/>
                <span><img src={iconPicker()} className="like" style={{display:addIcon(props.vac.id), cursor:activeOnAdmin()}} onClick = {() => removeVac(props.vac.id)}/></span>
                <div className = "card-content">
                    <p className = "destination text-truncate mt-2" title={props.vac.destination}>{props.vac.destination}</p>
                    <p>
                        <button type="button" className="btn btn-info btn-block" data-toggle="collapse" data-target={`#${props.vac.id}`}>For More Details</button>
                        <div id={props.vac.id} class="collapse mb-4" style={{marginTop: '5px',fontFamily: '"Merienda", cursive',fontSize: '13px'}}>{props.vac.description}
                        </div>
                    </p>
                    <p className="dates">Available on:
                    <br/>
                    {moment(props.vac.from_date).format("DD/MM/YYYY") + ' - ' + moment(props.vac.to_date).format("DD/MM/YYYY")}
                    </p>
                    <p className="price">{'Price:  '+props.vac.price + '$'}</p>
                </div>
                <div className="card-footer text-muted">
                <p className="footer">{`Last Update:  ${moment(props.vac.update_date).format("DD/MM/YYYY")}`}</p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        data:state.newData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        favorite:id => dispatch(favorite(id)),
        removeFollow:id => dispatch(removeFollow(id)),
        remove:id => dispatch(remove(id))
    }
}

export default connect (mapStateToProps,mapDispatchToProps)(Card);