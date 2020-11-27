import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { array } from 'yup';
import AuthService from "../../../services/auth.service";
import './column.css'
// const data = {
//   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//   datasets: [
//     {
//       label: 'My First dataset',
//       fill: false,
//       lineTension: 0.1,
//       backgroundColor: 'rgba(75,192,192,0.4)',
//       borderColor: 'rgba(75,192,192,1)',
//       borderCapStyle: 'butt',
//       borderDash: [],
//       borderDashOffset: 0.0,
//       borderJoinStyle: 'miter',
//       pointBorderColor: 'rgba(75,192,192,1)',
//       pointBackgroundColor: '#fff',
//       pointBorderWidth: 1,
//       pointHoverRadius: 5,
//       pointHoverBackgroundColor: 'rgba(75,192,192,1)',
//       pointHoverBorderColor: 'rgba(220,220,220,1)',
//       pointHoverBorderWidth: 2,
//       pointRadius: 1,
//       pointHitRadius: 10,
//       data: [65, 59, 80, 81, 56, 55, 40]
//     }
//   ]
// };

export default class LineDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      months: [],
      gias: [],
      dataAuth: [],
      data: {
        labels: ["One", "tow", "three", "four"],
        datasets: [
          {
            label: 'My First dataset',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            beginAtZero: true,
            barPercentage: 0.4,
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [100, 200, 300, 400]
          }
        ]
      },
    }
  }
  showChart = () => {
    var monthArray = [];
    var data1 = [];
    var dataArray = [];
    

    this.state.dataAuth.map((value, index) => {
      monthArray.push(value._id.month);
      dataArray.push(value.Total)
    })
    // this.state.dataAuth.map((value,index)=>{
    // datas.push(value._id.Total)
    // })
    console.log(monthArray)
    console.log(dataArray)

    // var dataArray = [];
    // monthArray = [...this.state.months];
    monthArray.map((value, index) => {
      return monthArray[index] = "Tháng " + value
    })
    data1 = { ...this.state.data };

    // dataArray = [...this.state.gias];
    data1.labels = monthArray;
    data1.datasets[0].data = dataArray;
    this.setState({ data: data1 })
  }
  componentDidMount() {
    let date = new Date();
    let arrayLabels = [];
    let arrayData = [];
    var dataFinal = null;
    AuthService.thongKeTheoQuaCacThang((date.getYear() - 100 + 2000), JSON.parse(localStorage.getItem('shop'))._id).then(data => this.setState({ dataAuth: data.data.data }))
    // AuthService.thongKeTheoQuaCacThang((date.getYear() - 100 + 2000), JSON.parse(localStorage.getItem('shop'))._id).then(data=>this.setState({gias:data.data.data[0].gia}))



  }
  render() {
    return (
      <div style={{ width: '600px' }}>
        <button onClick={this.showChart}>Show chart</button>
        <h2>Line Example</h2>
        <Bar ref="chart" data={this.state.data} 
          options={{
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }}
        />
        {/* <Bar ref="chart" data={this.state.data} style={{padding:'20px 0'}}/> */}
      </div>
    );
  }
}