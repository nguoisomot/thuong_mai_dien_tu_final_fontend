import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import { array } from 'yup';
import AuthService from "../../../services/auth.service";
import './column.css'

var dayPublic = new Date()
export default class LineDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // boolean show chart
      showChart: false,
      // data thống kê danh thu các tháng trong năm
      months: [],
      giaMonth: [],
      // data thống kê danh thu các ngày trong tháng
      days: [],
      giaDay: [],


      dataMonthAuth: [],
      dataMonth: {
        labels: ["One", "tow", "three", "four"],
        datasets: [
          {
            label: 'Sản phẩm bán chạy trong năm 2020',
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
      dataDayAuth: [],
      dataDay: {
        labels: ["One", "tow", "three", "four"],
        datasets: [
          {
            label: 'sản phẩm bán chạy trong tháng ' + (dayPublic.getMonth() + 1) + ' 2020',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,02,192,0.4)',
            borderColor: 'rgba(75,12,192,1)',
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
      }
    }
  }
  showChart = () => {
    // theo tháng
    this.setState({ showChart: true })
    var monthArray = [];
    var dataArray = [];
    var dataMonth = {};



    this.state.dataMonthAuth.map((value, index) => {
      monthArray.push(value._id.ten_san_pham);
      dataArray.push(value.so_luong)
    })
    console.log(monthArray)
    console.log(dataArray)

    monthArray.map((value, index) => {
      return monthArray[index] =  value
    })
    dataMonth = { ...this.state.dataMonth };

    dataMonth.labels = monthArray;
    console.log(dataMonth.datasets[0].data)
    dataMonth.datasets[0].data = dataArray;
    this.setState({ dataMonth: dataMonth })

    // theo ngày 

    var dayArray = [];
    var dataGiaDay = [];
    var dataDay = [];



    this.state.dataDayAuth.map((value, index) => {
      dayArray.push(value._id.ten_san_pham);
      dataGiaDay.push(value.so_luong)
    })


    dayArray.map((value, index) => {
      return dayArray[index] = value
    })
    dataDay = { ...this.state.dataDay };

    dataDay.labels = dayArray;
    dataDay.datasets[0].data = dataGiaDay;
    this.setState({ dataDay: dataDay })
  }
  componentDidMount() {
    let date = new Date();
    let arrayLabels = [];
    let arrayData = [];
    var dataFinal = null;
    AuthService.sanPhamBanChayCacThangTrongNam((date.getYear() - 100 + 2000), JSON.parse(localStorage.getItem('shop'))._id).then(data => this.setState({ dataMonthAuth: data.data.data }))
    AuthService.sanPhamBanChayCacNgayTrongThang("2020-11", JSON.parse(localStorage.getItem('shop'))._id).then(data => this.setState({ dataDayAuth: data.data.data }))




  }
  render() {
    return (
      <>
        <button onClick={this.showChart}>Show chart</button>
        {this.state.showChart ? <div>
          <h3>Biểu đồ</h3>
          <div style={{ width: '100%', display: 'flex' }}>



            <div style={{ width: "45%", marginRight: '5%' }} >
              <Bar ref="chart" data={this.state.dataMonth}
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
            </div>
            <div style={{ width: "45%" }} >
              <Bar ref="chart" data={this.state.dataDay}
                options={{
                  scales: {
                    yAxes: [{
                      ticks: {
                        beginAtZero: true,
                      
                      }
                    }]
                  }
                }}
              />
            </div>
          </div>
          {/* <Bar ref="chart" data={this.state.data} style={{padding:'20px 0'}}/> */}
        </div> : <div></div>}
      </>
    );
  }
}