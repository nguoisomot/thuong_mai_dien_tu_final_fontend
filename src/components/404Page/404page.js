import react, {Component} from 'react'
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
export default class NotPage extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div style={{textAlign:'center'}}>
        <h3 style={{textAlign:'center'}}>Không tìm thấy trang</h3>
        <Link to="/">Quay về đăng nhập</Link>
      </div>
    )
  }
}