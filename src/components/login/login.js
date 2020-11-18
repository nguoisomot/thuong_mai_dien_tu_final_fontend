import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import AuthService from "../../services/auth.service";
export default class Login extends React.Component {
  state = {
    showStatusErrorLogin: false
  }
  render() {
    // const {history} = this.props;
    return (
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .required('Tên sản phẩm không được để trống')
            .min(5, 'Tên sản phẩm phải dài hơn 5 ký tự'),
          password: Yup.string()
            .required('Giá không được để trống')
        })}
        onSubmit={fields => {
          AuthService.login(fields.email, fields.password)
            .then(response => {
              if (response.data.data) {
                localStorage.setItem("shop", JSON.stringify(response.data.data));
              }
              //localStorage.setItem("email", JSON.stringify(fields.email));
              this.props.history.push('/manager')
              console.log(response.data)
            })
            .catch(err => {
              this.setState({ showStatusErrorLogin: true })
              console.log('username or password không chính xác')
            })
          // alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4));
          // this.props.history.push('/home');
        }}
        render={({ errors, status, touched }) => (
          <>
            <input style={{ width: "100px" }} type='number' min='0' onChange={(e) => { console.log(e.target.value) }} ></input>
            <Form>
              <div className="form-group">
                <label htmlFor="email">email</label>
                <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                <ErrorMessage name="email" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group">
                <label htmlFor="password">password</label>
                <Field name="password" type="text" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                <ErrorMessage name="password" component="div" className="invalid-feedback" />
              </div>
              {this.state.showStatusErrorLogin ? <div style={{ color: 'red', marginBottom: '10px' }}>Username or Password is wrong</div> : null}
              <div className="form-group">
                <button type="submit" className="btn btn-primary mr-2">Login</button>
                <button type="reset" className="btn btn-secondary">Reset</button>
              </div>
              <Link style={{color:"red"}} to="/register">Register Now</Link>
            </Form>
          </>
        )}
      />
    )
  }
}
