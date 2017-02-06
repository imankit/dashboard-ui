/**
 * Created by Darkstar on 11/29/2016.
 */
import React from 'react';
import {connect} from 'react-redux';

class APIAnalytics extends React.Component {

    constructor(props){
        super(props)
        this.state = {

        }
    }
    componentDidMount(){
        
        let APIdata = this.props.analyticsApi.usage.map((x)=>{
            return [new Date(x.timeStamp).toDateString(), x.dayApiCount]
        })
        setTimeout(()=>{
          google.charts.load('current', {'packages':['corechart']});
          google.charts.setOnLoadCallback(drawChart);

          function drawChart() {
              let data = google.visualization.arrayToDataTable([
                ['Date', 'API Count'],
                ['0',0],
                ...APIdata
              ])

              let options = {
                title: 'API Analytics',
                hAxis: {title: 'Date',  titleTextStyle: {color: '#333'}},
                vAxis: {minValue: 0,title: 'API Count',  titleTextStyle: {color: '#333'}},
                backgroundColor:"#eff1f5",
                animation:{
                  duration:2000,
                  startup:true
                },
                crosshair: { trigger: 'both' },
                explorer: {}
              }
              let chartDiv = document.getElementById('chart_div_api')
              if(chartDiv){
                let chart = new google.visualization.AreaChart(document.getElementById('chart_div_api'))
                chart.draw(data, options)
              }
          }
          window.addEventListener('resize', function(event){
            drawChart()
          })
        },100)
    }
    render() {
        return (
            <div id="chart_div_api"></div>
        );
    }

}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(APIAnalytics);
