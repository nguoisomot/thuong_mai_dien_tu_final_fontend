import react, {Component} from 'react';
import './title.css'
export default class Title extends Component{
  constructor(props){
    super(props)
    this.state={
      
    }
  }
  render(){
    return(
      <div className="banner_router">
        <div className="title">{this.props.title}</div>
      </div>
    )
  }
}
