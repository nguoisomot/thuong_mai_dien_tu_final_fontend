import React, { Component } from 'react'
import AuthService from "../../services/auth.service";

export default class UpImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectFile: '',
      fileInputState: '',

    }
  }
  handleFileInputChange = (e) => {
    const file = e.target.files[0];
    console.log(e.target.files)
    this.setState({ selectFile:file});
    this.setState({ fileInputState: e.target.value});
  };
  handleSubmitFile = (e) => {
    e.preventDefault();
    if (!this.state.selectFile) 
    return;
    const reader = new FileReader();
    reader.readAsDataURL(this.state.selectFile);
    reader.onloadend = () => {
      this.uploadImage(reader.result);
      // log baseCode64
      console.log("=======")
      // console.log(reader.result)
    };
    reader.onerror = () => {
      console.error('AHHHHHHHH!!');
    };
  };
  uploadImage = async (base64EncodedImage) => {
    try {
      // console.log(base64EncodedImage)
      // await fetch('/api/upload', {
      //   method: 'POST',
      //   body: JSON.stringify({ data: base64EncodedImage }),
      //   headers: { 'Content-Type': 'application/json' },
      // });
      AuthService.uploadImage(base64EncodedImage)
      // console.log(JSON.stringify({ data: base64EncodedImage }))
      this.state.fileInputState('');
    } catch (err) {
      console.error(err);
    }
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmitFile}>
          <label htmlFor="hinh_anh">Chọn hình ảnh</label>
          <input name="hinh_anh" type="file" accept=".jpg,.png,.jfif" className='form-control' required multiple onChange={this.handleFileInputChange}
            value={this.state.fileInputState} />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}