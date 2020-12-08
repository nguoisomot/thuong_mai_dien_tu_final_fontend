import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi"

import AuthService from "../../services/auth.service";
import './login.css'
export default class Login extends React.Component {
  state = {
    showStatusErrorLogin: false
  }
  render() {
    // const {history} = this.props;
    return (
      <Formik className="formik"
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
              console.log(response)
              if (response.status == 200) {
                this.setState({ showStatusErrorLogin: true })
                localStorage.setItem("shop", JSON.stringify(response.data.shop));      
                window.location.reload()       
                this.props.history.push('/manager')
                
              }          
              console.log(response.data)
            })
            .catch(err => {
              this.setState({ showStatusErrorLogin: true })
              console.log('username or password không chính xác')
            })
         
        }}
        render={({ errors, status, touched }) => (
          <div className="container_login">
            <div className="login">
              <div className="login-left">
                <img style={{ display: 'inline-block', marginBottom: '30px' }} src="https://scontent.xx.fbcdn.net/v/t1.15752-0/p280x280/125526848_3645395895521795_6036006708492688418_n.png?_nc_cat=105&ccb=2&_nc_sid=ae9488&_nc_ohc=kPh7vlSZDpkAX_Ym7V-&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=462452305133dfbc98a09adad87d3653&oe=5FDC0BAD" />
                <h3 style={{ marginBottom: '40px' }}>Tikun Seller Center</h3>
                <p style={{ fontSize: '13px', fontWeight: 'lighter', marginBottom: '20px' }}>Tải Ứng dụng Seller Center</p>
                <img src="https://sellercenter.tiki.vn/new/static/qr-code.f12c43d1.svg" />
                <div className="app_mobile" style={{ marginTop: '40px' }}>
                  <img style={{ width: '137px', height: '40px', marginRight: '10px' }} src="https://sellercenter.tiki.vn/new/static/ios-app.cae03bf3.svg" />
                  <img style={{ width: '137px', height: '40px' }} src="https://sellercenter.tiki.vn/new/static/android-app.50732e65.svg" />
                </div>
              </div>
              <div className="login-right">
              <div className="login-right_inner">
                <div className="title_email_access">
                  <p><HiOutlineMail style={{ fontSize: '18px',marginRight:'5px' }} />
                    <span>Truy cập bằng email@tikun.vn</span>
                  </p>
                </div>
                <Form>
                  <div className="form-group">
                    <label htmlFor="email" >Email</label>
                    <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field name="password" type="text" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                  </div>
                  {this.state.showStatusErrorLogin ? <div style={{ color: 'red', marginBottom: '10px' }}>Email hoặc mật khẩu không chính xác</div> : null}
                  <div className="form-group btn-control">
                    <a style={{cursor:'pointer'}} className="forgot_password">Quên mật khẩu</a>
                    <button type="submit" className="btn btn_login">Đăng nhập</button>                  
                  </div>
                </Form>
                <div className="link_register_shop">
                <span>Chưa có tài khoản?
                </span>
                <Link  to="/register">Đăng ký nhà bán mới</Link>
                </div>
                </div>
              </div>
            </div>

          </div>
        )}
      />
    )
  }
}
