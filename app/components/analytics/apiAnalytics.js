/**
 * Created by Darkstar on 11/29/2016.
 */
import React from 'react';
import {connect} from 'react-redux';
import Chart from 'chart.js'

class APIAnalytics extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() {

        let APIdata = this.props.analyticsApi.usage.map((x) => {
            return [
                new Date(x.timeStamp).toDateString(),
                x.dayApiCount
            ]
        }).reverse().filter((x, i) => i < 7)

        this.buildGraphs(APIdata)

    }

    componentWillReceiveProps(props) {
        let APIdata = props.analyticsApi.usage.map((x) => {
            return [
                new Date(x.timeStamp).toDateString(),
                x.dayApiCount
            ]
        }).reverse().filter((x, i) => i < 7)

        this.buildGraphs(APIdata)
    }

    buildGraphs(APIdata) {
        var ctx = document.getElementById("apiChart").getContext("2d");
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [
                    "1st Apr",
                    "5th Apr",
                    "19th Apr",
                    "22nd Apr",
                    "29th Apr",
                    "2nd May"
                ],
                datasets: [
                    {
                        label: 'API count ',
                        data: [
                            12,
                            19,
                            3,
                            5,
                            2,
                            3
                        ],
                        backgroundColor: [
                            'rgba(255, 255, 255, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(33,150,243,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1,
                        lineTension: 0,
                        fill: false
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true
                            },
                            gridLines: {
                                display: false
                            }
                        }
                    ],
                    xAxes: [
                        {
                            gridLines: {
                                display: false
                            }
                        }
                    ]
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    render() {
        return (
            <div>
                <canvas id="apiChart" width="400" height="400"></canvas>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(APIAnalytics);
