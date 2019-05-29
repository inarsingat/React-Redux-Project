import React from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {Bar} from 'react-chartjs-2'
const _ = require ('lodash')

const Chart = (props) => {
    if(props.chart.length === 0 ){
        return null
    }
    
    let names = props.data.vacations.map(v => {
        return v.destination
    })
    
    let count = []
    for(let i = 0; i< props.data.vacations.length; i ++){
        let id = props.data.vacations[i].id
        for(let j = 0 ; j < props.chart.length; j++){
            if(props.chart[j].vacation_id === id){
                count.push(props.chart[j].total)
            }
        }
        if(count[i] === undefined){
            count.push(0)
        }
    }
    
    let chartData = {
            labels:names,
            datasets : [
                {
                label:'Total amount of Followers',
                data: count,
                backgroundColor:[
                    'rgba(225, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(90, 208, 75, 0.6)',
                    'rgba(138, 86, 193, 0.6)',
                    'rgba(120, 62, 210, 0.6)',
                    'rgba(65, 130, 190, 0.6)'
                    ]
                }
            ],
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    xAxes: [{
                        barPercentage: 0.5,
                        barThickness: 6,
                        minBarLength: 2,
                        gridLines: {
                            offsetGridLines: true
                        }
                    }]
                }
            }
        }        
        return(
            <div className="mt-5 chart">
                <Bar
                    data={chartData}
                    width={100}
                    height={'400px'}
                    options={{ maintainAspectRatio: false }}
                />  
            </div>
        )
}

const mapStateToProps = state => {
    return{
        chart:state.chart,
        data:state.newData
    }
}

export default connect (mapStateToProps,null)(Chart)