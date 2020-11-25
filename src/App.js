
import react, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
import './App.css'
import Register from "./components/register/register";
import Login from './components/login/login';
import Container from './components/container/container';
import AddItems from './components/addItems/addItems';
import Manager from './components/manager/manager';
import Edit from './components/edit/edit';
import DonHang from './components/DonHang/donHang';
import Modal from './components/modal/modal';
class App extends Component {
  constructor(props) {
    super(props);
    // this.logOut = this.logOut.bind(this);
    this.state = {
      id: JSON.parse(localStorage.getItem('shop'))
    };

  }

  render() {
    return (
      this.state.id ?
        <Router>
          <div>

            {/* <div className="container mt-3"> */}

            <Switch>
              <Container>
                {/* <Route exact path={["/", "/home"]} component={Home} />
              */}
                <Switch>  <Route path="/register" component={Register} />
                  <Route path="/edit/:idItem" component={Edit} />
                  <Route path="/addItems" component={AddItems} />  
                  <Route path="/donHang" component={DonHang} />
                  <Route path="/modal" component={Modal} />
                  <Route path="/manager" component={Manager} />
                  <Route path="/" component={Manager} />
                
                  </Switch>
              </Container>
            </Switch>

          </div>
        </Router>
        :
        <Router>
       
          <Switch>

            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            {/*set defaul not page 404 */}
            <Container>  
            <Switch>
                <Route  path="/addItems" component={AddItems} />
                <Route path="/donHang" component={DonHang} />

                <Route path="/manager" component={Manager} />
                <Route path="/edit/:idItem" component={Edit} />  
            </Switch>           
             
            </Container>   
               
          </Switch>
        </Router>
    );
  }
}
export default App;