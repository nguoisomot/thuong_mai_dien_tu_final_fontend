import react, {Component} from 'react'
import AuthService from "../../services/auth.service";
import Title from '../title/title'
import Column from './Column/column'
export default class ThongKe extends Component{
  constructor(props){
    super(props)
    this.state={
      doanh_thu_hom_nay:'',
      doanh_thu_nam_nay:'',
      doanh_thu_thang_nay:'',
      id_shop: JSON.parse(localStorage.getItem('shop'))._id,
    }
  }
  componentDidMount(){
    // doanh thu theo ngay
    var date_ngay = new Date()
    var hom_nay_1 = (date_ngay.getYear() - 100 + 2000) + "-" + (date_ngay.getMonth()+1) + "-" + (date_ngay.getDate());
    
    var hom_nay_2 = (date_ngay.getYear() - 100 + 2000) + "-" + (date_ngay.getMonth()+1) + "-" + (date_ngay.getDate()+1)
    console.log(hom_nay_1)
    AuthService.thongKeTheoNgay(hom_nay_1,hom_nay_2, JSON.parse(localStorage.getItem('shop'))._id).then(data =>{
      try {     
        this.setState({ doanh_thu_hom_nay: data.data.data[0].count })   
      } catch (error) {
          this.setState({ doanh_thu_hom_nay: 0})
      }
    });
     // doanh theo thang
    var date_thang= new Date()
    AuthService.thongKeTheoThang((date_thang.getYear() - 100 + 2000)+"-"+(date_thang.getMonth()+1), JSON.parse(localStorage.getItem('shop'))._id).then(data=>{
      try {
        this.setState({doanh_thu_thang_nay:data.data.data[0].count})
      } catch (error) {
        this.setState({ doanh_thu_thang_nay: 0 })
      }
    })
    // theo nam
    var date_nam= new Date()
    AuthService.thongKeTheoNam((date_nam.getYear() - 100 + 2000), JSON.parse(localStorage.getItem('shop'))._id).then(data=>{
      try {
        this.setState({doanh_thu_nam_nay:data.data.data[0].count})
      } catch (error) {
        this.setState({ doanh_thu_nam_nay: 0 })
      }
    })
   
  }
  render(){
    return(
      <div>
        <Title title="Thống Kế"/>
        <div>
        <div>
            <h5>Doanh thu hôm nay:</h5>
            <p>{this.state.doanh_thu_hom_nay}đ</p>
        </div>
        <div>
            <h5>Doanh thu tháng nay:</h5>
            <p>{this.state.doanh_thu_thang_nay}đ</p>
        </div>
        <div>
            <h5>Doanh thu từ đầu năm đến nay:</h5>
            <p>{this.state.doanh_thu_nam_nay}đ</p>
        </div>
        <div>
            <Column/>
        </div>
        </div>
      </div>
    )
  }
}