import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "../../services/auth.service";


export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangeFile = this.onChangeFile.bind(this)
    this.onChangeNganhHang = this.onChangeNganhHang.bind(this)
    this.state = {
      images: '',
      nganh_hang: 'điện thoại - máy tính bảng',
      id_shop: JSON.parse(localStorage.getItem('shop'))._id,
      idItem: this.props.match.params.idItem
    }
    this.danhSachNganhHang = {
      'Điện thoại - máy tính bảng': 'Điện thoại - máy tính bảng',
      'Điện tử - điện lạnh': 'Điện tử - điện lạnh',
      'Phụ kiện - thiết bị số': 'Phụ kiện - thiết bị số',
      'Laptop - thiết bị IT': 'Laptop - thiết bị IT',
      'Máy ảnh - quay phim': 'Máy ảnh - quay phim'
    }
    // this.id_shop = typeof JSON.stringify(JSON.parse(localStorage.getItem('shop'))._id);
  }
  onChangeFile(e) {
    this.setState({ images: e.target.files });
    console.log(this.state.images)
  }
  onChangeNganhHang(e) {
    this.setState({ nganh_hang: e.target.value });
    console.log(this.state.nganh_hang)
  }
  render() {
    return (
      <Formik
        initialValues={{
          id_shop: '',
          ten_san_pham: '',
          nganh_hang: '',
          gia: '',
          so_luong: '',
          hinh_anh: ''
        }}
        validationSchema={Yup.object().shape({
          ten_san_pham: Yup.string()
            .required('Last Name is required'),
          // nganh_hang: Yup.string()
          //   .required('Email is required'),
          gia: Yup.number()
            .required('SĐT is required'),
          so_luong: Yup.number()
            .min(1, 'Input account grater 1')
            .required('Password is required'),
          // hinh_anh: Yup.required('Select Image')
          // select:  Yup.string()
          // .required('select now')
        })}
        onSubmit={fields => {
          var formData = new FormData();
          formData.append('_id', this.state.idItem);
          formData.append('id_shop', this.state.id_shop);
          formData.append('ten_san_pham', fields.ten_san_pham);
          formData.append('nganh_hang', this.state.nganh_hang);
          formData.append('gia', fields.gia);
          formData.append('so_luong', fields.so_luong);

          for (const key of Object.keys(this.state.images)) {
            console.log(this.state.images[key])
            formData.append('hinh_anh', this.state.images[key])
          }
          // formData.append('hinh_anh', fields.hinh_anh)
          AuthService.updateItem(formData)
            .then(alert(formData))
            .catch(err => {
              alert('Lỗi: ' + err)
            })

        }}
        render={({ errors, status, touched }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="ten_san_pham">Tên sản phẩm</label>
              <Field name="ten_san_pham" type="text" className={'form-control' + (errors.ten_san_pham && touched.ten_san_pham ? ' is-invalid' : '')} />
              <ErrorMessage name="ten_san_pham" component="div" className="invalid-feedback" />
            </div>
            <div className="form-group">
              <label htmlFor="nganh_hang">Ngành hàng</label>
              <select name="nganh_hang" className='form-control' onChange={this.onChangeNganhHang} value={this.state.nganh_hang}>
                {Object.keys(this.danhSachNganhHang).map(item =>
                  <option key={item} value={item}>
                    {this.danhSachNganhHang[item]}
                  </option>)}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="sdt">Giá</label>
              <Field name="gia" type="number" className={'form-control' + (errors.gia && touched.gia ? ' is-invalid' : '')} />
              <ErrorMessage name="gia" component="div" className="invalid-feedback" />
            </div>
            <div className="form-group">
              <label htmlFor="so_luong">Số Lượng</label>
              <Field name="so_luong" type="so_luong" className={'form-control' + (errors.so_luong && touched.so_luong ? ' is-invalid' : '')} />
              <ErrorMessage name="so_luong" component="div" className="invalid-feedback" />
            </div>
            <div className="form-group">
              <label htmlFor="hinh_anh">Hình ảnh</label>
              <input name="hinh_anh" type="file" accept=".jpg,.png" className='form-control' required multiple onChange={this.onChangeFile} />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary mr-2">Cập nhật</button>
              <button type="reset" className="btn btn-secondary">Làm mới</button>
            </div>
          </Form>
        )}
      />
    )
  }
}