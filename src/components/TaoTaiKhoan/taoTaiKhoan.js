import react, { Componet } from 'react'

export default class TaoTaiKhoan extends Componet {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="tao_tai_khoan">
        <div className="tao_tai_khoan-inner">
          <div className="form_input">
            <form>
              <div className="tao_tai_khoan-form_item">
                <label className="input-label">Họ tên</label>
                <div className="full_name">
                  <input type="text" required placeholder="Nhập họ tên" />
                </div>
              </div>
              <div className="tao_tai_khoan-form_item">
                <label className="input-label">Số điện thoại</label>
                <div className="sdt">
                  <input type="number" required placeholder="Nhập SĐT" />
                </div>
              </div>
              <div className="tao_tai_khoan-form_item">
                <label className="input-label">Email</label>
                <div className="email">
                  <input type="number" required placeholder="sonvahai100@gmail.com" />
                </div>
              </div>
              <div className="birthday">
                <input type="date" required />
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}