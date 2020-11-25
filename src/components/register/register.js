import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "bootstrap/dist/css/bootstrap.min.css";
import './register.css'
import AuthService from "../../services/auth.service";
export default class Register extends React.Component {
  render() {
    // const {history} = this.props;
    return (
      <Formik 
        initialValues={{
          ten_shop: '',
          ho_va_ten: '',
          sdt: '',
          email: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={Yup.object().shape({
          ten_shop: Yup.string()
            .required('Tên cửa hàng không được bỏ trống')
            .min(5, 'Tên cửa hàng phải dài hơn 5 ký tự'),
          ho_va_ten: Yup.string()
            .required('Họ tên không được bổ trống')
            .min(5, 'Họ tên phải dài hơn 5 ký tự'),
          email: Yup.string()
            .email('Email không đúng định dạng')
            .required('Email không được để trống'),
          sdt: Yup.string().length(9,'Số điện thoại phải có 10 ký tự')
            .matches(/^[0-9]*$/)
            .required('SĐT không được bỏ trống'),
          password: Yup.string()
            .min(6, 'Mật khẩu phải ít nhất 6 ký tự')
            .required('Mật khẩu không được bỏ trống'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
            .required('Xác nhận mật khẩu không được để  trống'),
          // select:  Yup.string()
          // .required('select now')
        })}
        onSubmit={fields => {
          AuthService.register(fields.ten_shop, fields.ho_va_ten, fields.email, fields.sdt, fields.password)
            .then(response =>{
              if (response.data.data) {
                localStorage.setItem("shop", JSON.stringify(response.data.data));
              }
              this.props.history.push('/addItems')
            }            
              )
            .catch(err => {
              alert('Lỗi: ' + err)
            })
          alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4));
          this.props.history.push('/home');
        }}
        render={({ errors, status, touched }) => (
          <div style={{backgroundColor:'#F0F2F5',height:'100vh',paddingTop:'30px'}}>
          <Form style={{width:'830px',margin:' auto',backgroundColor:'white',paddingBottom:'15px'}}>
          <div className="container-form_register">
          <div className="form_register-inner">
            <h1 style={{fontSize:'30px',fontWeight:'460',textAlign:'center',marginBottom:'15px'}}>
              <span>Đăng ký bán hàng cùng Tikun</span>
            </h1>
            <p style={{textAlign:'center',fontSize:'14px',marginBottom:'40px'}}>Cảm ơn đối tác đã tin tưởng và lựa chọn đồng hành cùng Tiki! 
            <br/>Vui lòng hoàn tất thông tin để tạo tài khoản đăng nhập Trung Tâm Bán Hàng - Tiki Seller Center.
            </p>

         
            <div className="form-group">
                    <label htmlFor="ho_va_ten">Họ và tên chủ cửa hàng:</label>
                    <div> <Field name="ho_va_ten" type="text" className={'form-control' + (errors.ho_va_ten && touched.ho_va_ten ? ' is-invalid' : '')} placeholder="Nguyễn Văn A"/>
              <ErrorMessage name="ho_va_ten" component="div" className="invalid-feedback" /></div>
             
            </div>
                  <div className="form-group">
                    <label htmlFor="ten_shop">Tên cửa hàng</label>
                    <div><Field name="ten_shop" type="text" className={'form-control' + (errors.ten_shop && touched.ten_shop ? ' is-invalid' : '')} placeholder="Cửa hàng cửa tôi" />
                      <ErrorMessage name="ten_shop" component="div" className="invalid-feedback" /></div>

                  </div>
            <div className="form-group">
                    <label htmlFor="email">Địa chỉ email của chủ cửa hàng
                    <br/>
                      <span style={{color:'red',fontWeight:'normal'}}>Email này không thể thay đổi</span>
                    </label>
                    <div><Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} placeholder="Sử dụng để đăng nhập SellerCenter"/>
              <ErrorMessage name="email" component="div" className="invalid-feedback" /></div>
              
            </div>
            <div className="form-group">
              <label htmlFor="sdt">Số điện thoại chủ cửa hàng</label>
                    <div> <Field name="sdt" type="number" className={'form-control' + (errors.sdt && touched.sdt ? ' is-invalid' : '')} placeholder="0123456789" />
              <ErrorMessage name="sdt" component="div" className="invalid-feedback" /></div>
             
            </div>
            <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <div>
                
              <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
              <ErrorMessage name="password" component="div" className="invalid-feedback" />
            </div>
            
            </div>
            <div className="form-group"><label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
            <div>
              <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
              <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" /></div>
              
            </div>

            <div className="form-group" style={{display:'flex',justifyContent:'center'}}>
              <button type="submit" className="btn btn-primary mr-2" style={{padding:'10px 15px',marginTop:'20px'}}>Đăng ký bán hàng</button>
            </div>
              </div>
                <p style={{textAlign:'center',fontWeight:'lighter'}}>Bằng cách gửi đơn đăng ký của bạn, bạn đồng ý với Thỏa thuận dịch vụ của chúng tôi
và xác nhận rằng thông tin bạn cung cấp đã hoàn chỉnh và chính xác.</p>
              </div>
          </Form>
          </div>
        )}
      />
    )
  }
}
