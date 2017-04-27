/**
 * Created by Darkstar on 11/29/2016.
 */
import React from 'react';
import { connect } from 'react-redux';

class APIAnalytics extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {

        let APIdata = this.props.analyticsApi.usage.map((x) => {
            return [new Date(x.timeStamp).toDateString(), x.dayApiCount]
        }).reverse().filter((x, i) => i < 7)

        this.buildGraphs(APIdata)

    }

    componentWillReceiveProps(props) {
        let APIdata = props.analyticsApi.usage.map((x) => {
            return [new Date(x.timeStamp).toDateString(), x.dayApiCount]
        }).reverse().filter((x, i) => i < 7)

        this.buildGraphs(APIdata)
    }

    buildGraphs(APIdata) {

        setTimeout(() => {
            google.charts.load('current', { 'packages': ['corechart'] });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                let data = google.visualization.arrayToDataTable([
                    ['Date', 'API Count'],
                    ['0', 0],
                    ...APIdata
                ])

                let options = {
                    title: 'API Analytics',
                    hAxis: { title: 'Date', titleTextStyle: { color: '#333' } },
                    vAxis: { minValue: 0, title: 'API Count', titleTextStyle: { color: '#333' } },
                    backgroundColor: "#fff",
                    animation: {
                        duration: 1000,
                        startup: true
                    },
                    crosshair: { trigger: 'both' },
                    explorer: {}
                }
                let chartDiv = document.getElementsByClassName('chart_div_api')
                if (chartDiv.length) {
                    let chart_bar = new google.visualization.BarChart(chartDiv[0])
                    let chart_area = new google.visualization.AreaChart(chartDiv[1])
                    chart_bar.draw(data, options)
                    chart_area.draw(data, options)
                }
            }
            window.addEventListener('resize', function (event) {
                drawChart()
            })
        }, 100)
    }
    
    render() {
        return (
            <div>
                <div className="chart_div_api"></div>
                <div className="chart_div_api"></div>
            </div>
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
