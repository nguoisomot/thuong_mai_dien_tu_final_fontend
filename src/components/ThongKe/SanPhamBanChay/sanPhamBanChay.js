import react, {Component} from 'react'
import AuthService from "../../../services/auth.service";
import Title from '../../title/title'
import Column from './column'

export default class SanPhamBanChay extends Component{
  constructor(props){
    super(props)
      this.state={
        sp_ban_chay_hom_nay: '',
        ban_chay_nam_nay: '',
        sp_ban_chay_thang_nay: '',
        id_shop: JSON.parse(localStorage.getItem('shop'))._id,
      }
  }
  componentDidMount(){
    // doanh thu theo ngay
    var date_ngay = new Date()
    var hom_nay_1 = (date_ngay.getYear() - 100 + 2000) + "-" + (date_ngay.getMonth() + 1) + "-" + (date_ngay.getDate());

    var hom_nay_2 = (date_ngay.getYear() - 100 + 2000) + "-" + (date_ngay.getMonth() + 1) + "-" + (date_ngay.getDate() + 1)
    console.log(hom_nay_1);
    AuthService.sanPhamBanChayHomNay(hom_nay_1, hom_nay_2, JSON.parse(localStorage.getItem('shop'))._id).then(data => {
      try {
        this.setState({ sp_ban_chay_hom_nay: data.data.data[0]._id.ten_san_pham })
      } catch (error) {
        this.setState({ sp_ban_chay_hom_nay: 'Không có sản phẩm nào' })
      }
    });

    // ban chay thang nay
    var date_thang = new Date()
    AuthService.sanPhamBanChayThangNay((date_thang.getYear() - 100 + 2000) + "-" + (date_thang.getMonth() + 1), JSON.parse(localStorage.getItem('shop'))._id).then(data => {
      try {
        this.setState({ sp_ban_chay_thang_nay: data.data.data[0]._id.ten_san_pham });
        console.log(data)
      } catch (error) {
        this.setState({ sp_ban_chay_thang_nay: "Không có sản phẩm nào" })
        console.log("error")
      }
    })
    // ban chay nam nay
    var date_nam = new Date()
    AuthService.sanPhamBanChayTuDauNamDenNay((date_nam.getYear() - 100 + 2000), JSON.parse(localStorage.getItem('shop'))._id).then(data => {
      try {
        this.setState({ ban_chay_nam_nay: data.data.data[0]._id.ten_san_pham })
      } catch (error) {
        this.setState({ ban_chay_nam_nay: 0 })
      }
    })
  }
  render(){
    return(
      <div>
        <Title title="Thống Kế" />
        <div>
          <div>
            <h5>Sản phẩm bán chạy hôm nay:</h5>
            <p>{this.state.sp_ban_chay_hom_nay}</p>
          </div>
          <div>
            <h5>Sản phẩm bán chạy tháng nay:</h5>
            <p>{this.state.sp_ban_chay_thang_nay}</p>
          </div>
          <div>
            <h5>Sản phẩm bán chạy từ đầu năm đến nay:</h5>
            <p>{this.state.ban_chay_nam_nay}</p>
          </div>
          <div>
            <Column />
          </div>
        </div>
      </div>
    )
  }
}