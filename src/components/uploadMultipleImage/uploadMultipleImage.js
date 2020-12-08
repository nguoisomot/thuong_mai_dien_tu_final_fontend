import React, { Component } from 'react'
import AuthService from "../../services/auth.service";

export default class UpImage extends Component {
  constructor(props) {
    super(props);
    this.onChangeFile = this.onChangeFile.bind(this)
    this.state = {
      images: '',
      fileInputState: '',

    }
  }
  onChangeFile(e) {
    this.setState({ images: e.target.files });
    console.log(this.state.images)
  }
  handleSubmitFile = (e) => {
    e.preventDefault();
  
    var formData = new FormData();
    for (const key of Object.keys(this.state.images)) {
      console.log(this.state.images[key])
      formData.append('hinh_anh', this.state.images[key])
    }
    AuthService.uploadMultipleImage(formData).then(
      console.log("success")
    )


  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmitFile}>
          <label htmlFor="hinh_anh">Hình ảnh</label>
          <input name="hinh_anh" type="file" accept=".jpg,.png,.jfif" className='form-control' required multiple onChange={this.onChangeFile} />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}