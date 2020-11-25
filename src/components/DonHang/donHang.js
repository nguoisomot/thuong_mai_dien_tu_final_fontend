import react, {Component} from 'react'
import './donHang.css'
import AuthService from "../../services/auth.service";

export default class DonHang extends Component{
  constructor(props){
    super(props)
    this.state={
      items:[],
      data:[]
    }
  }
  componentDidMount(){
    AuthService.getAllItemsOrder(JSON.parse(localStorage.getItem('shop'))._id).then(
      data => {this.setState({items:data.data.data})
      console.log(data.data.data)}
    )
  }
  render(){
    return(
      <div>
        <table class="table table-bordered" style={{ marginBottom: '0' }}>
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Tên Sản Phẩm</th>
              <th scope="col">Giá</th>
              <th scope="col">Số Lượng</th>
              <th scope="col">Người mua</th>
              <th scope="col">SĐT</th>
              <th scope="col">Địa Chỉ</th>
            </tr>
          </thead>
          <tbody>
          {this.state.items.map((item,index)=>{
            
       
            return (<tr key={item._id}>
              <th scope="row">{index + 1}</th>
              <td>{item.ten_san_pham}</td>
              <td>{item.gia}</td>
              <td>{item.so_luong}</td>
              <td>{item.id_user.ho_va_ten}</td>
              <td>{item.id_user.sdt}</td>
              <td>{item.id_user.dia_chi}</td>
              {/* <td>{this.state.data[index] ? this.state.data[index].ho_va_ten : null}</td> */}
            </tr>)
          })}
           
          </tbody>
          </table>
      </div>
    )
  }
}