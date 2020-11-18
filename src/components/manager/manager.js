import react, { Component } from 'react'
import AuthService from "../../services/auth.service";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPen, FaTrash } from "react-icons/fa";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
export default class Manager extends Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this)

    this.state = {
      id: JSON.parse(localStorage.getItem('shop'))._id,
      data: [],
      datas: [1, 2, 3, 4, 5],
      modal: false,
      id_san_pham:'',
      index:5
    }
    this.buttonLabel = this.props;
    this.className = this.props;
  }
  toggle = () => {
    let modal = !this.state.modal;
    this.setState({ modal: modal });
    console.log("Active")
  }
  toggleDelete = (id_san_pham, index) => {
    let modal = !this.state.modal;
    this.setState({ modal: modal });
    this.setState({ id_san_pham: id_san_pham })
    this.setState({ index: index })
    console.log("Active")
  }
  delete = (id_san_pham,index) => {
    AuthService.deleteItem(id_san_pham)
    .then(console.log('Delete done!'))
    .catch(console.log('Delete error!'));
    let modal = !this.state.modal;
    this.setState({ modal: modal });
    let data = this.state.data;
    data.splice(index,1);
    this.setState({data:data})
    console.log("index: "+index)
  }
  getData() {
    AuthService.getAll(JSON.parse(localStorage.getItem('shop'))._id).then(res => {
      this.setState({ data: res.data.data });
      console.log(typeof this.state.data)
      console.log(this.state.data.length)
    }).catch(localStorage.setItem("error", JSON.stringify(JSON.parse(localStorage.getItem('shop'))._id)))

  }
  async componentDidMount() {
    await AuthService.getAll(JSON.parse(localStorage.getItem('shop'))._id).then(res => {
      this.setState({ data: res.data.data });
      console.log(typeof this.state.data)
      console.log(this.state.data.length)
    })
  }
 
  render() {
    return (
      <div>

        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Tên Sản Phẩm</th>
              <th scope="col">Giá</th>
              <th scope="col">Ngành Hàng</th>
              <th scope="col">Hinh Ảnh</th>
              <th scope="col">Chỉnh sửa</th>
            </tr>
          </thead>

          <tbody >
           
            {this.state.data.map((item, index) => {
              return <tr key={item._id}>
                <th scope="row">{index + 1}</th>
                <td>{item.ten_san_pham}</td>
                <td>{item.gia}</td>
                <td>{item.nganh_hang}</td>

                <td>
                  {item.hinh_anh ? item.hinh_anh.map((i, id) => {
                    console.log(i[0]);
                    return (item.hinh_anh[id] ? <img style={{ width: "50px", height: "50px", padding: "5px" }} src={"http://127.0.0.1:5500/app/public/" + item.hinh_anh[id]} />:<img/>)
                  }) : <img />}
                </td>
                <td>
                  <Link to={"/edit/"+item._id}><FaPen style={{ fontSize: '28px', color: 'blue', padding: '5px' }} /></Link>
                  <Button style={{ background: "white", border: 'none' }} onClick={() => this.toggleDelete(item._id, index)}>
                    <FaTrash style={{ fontSize: '28px', color: 'red', padding: '5px' }} ></FaTrash>
                  </Button>
                  <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.className}>
                    <ModalHeader toggle={this.toggle}>Xóa sản phẩm</ModalHeader>
                    <ModalBody>
                      Bạn muốn xóa sản phẩm này
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" onClick={() => this.delete(this.state.id_san_pham, this.state.index)}>Xóa</Button>{' '}
                      <Button color="secondary" onClick={this.toggle}>Hủy</Button>
                    </ModalFooter>
                  </Modal>

                </td>
              </tr>
            })}
          </tbody>
        </table>

      </div>
    )
  }
}