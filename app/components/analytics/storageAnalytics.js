/**
 * Created by Darkstar on 11/29/2016.
 */
import React from 'react';
import { connect } from 'react-redux';

class StorageAnalytics extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
        let StorageData = this.props.analyticsStorage.usage.map((x) => {
            return [new Date(x.timeStamp).toDateString(), x.size]
        }).reverse().filter((x, i) => i < 7)

        this.buildGraphs(StorageData)
    }

    componentWillReceiveProps(props) {
        let StorageData = this.props.analyticsStorage.usage.map((x) => {
            return [new Date(x.timeStamp).toDateString(), x.size]
        }).reverse().filter((x, i) => i < 7)

        this.buildGraphs(StorageData)
    }

    buildGraphs(StorageData) {
        
        setTimeout(() => {
            google.charts.load('current', { 'packages': ['corechart'] });
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                let data = google.visualization.arrayToDataTable([
                    ['Date', 'Storage Used'],
                    ['0', 0],
                    ...StorageData
                ])

                let options = {
                    title: 'Storage Analytics',
                    hAxis: { title: 'Date', titleTextStyle: { color: '#333' } },
                    vAxis: { minValue: 0, title: 'Storage Used (MB)', titleTextStyle: { color: '#333' } },
                    backgroundColor: "#fff",
                    animation: {
                        duration: 1000,
                        startup: true
                    },
                    crosshair: { trigger: 'both' },
                    explorer: {}
                }
                let chartDiv = document.getElementsByClassName('chart_div_storage')
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
                <div className="chart_div_storage"></div>
                <div className="chart_div_storage"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(StorageAnalytics);
