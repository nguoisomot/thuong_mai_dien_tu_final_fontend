import axios from "axios";
import authHeader from './auth-header';

const API_URL = "http://localhost:3001/";

class AuthService {

  login(email, password) {
    return axios.post(API_URL + "login", {
      email,
      password
    })
  }

  register(ten_shop, ho_va_ten, email, sdt, password) {
    return axios.post(API_URL + "register", {
      ten_shop,ho_va_ten, email, sdt, password
    });
  };

  // add item into shop
  addItem(formData) {
    return axios.post(API_URL + "add", formData, {
      
    });
  }
  // update item of shop
  updateItem(formData) {
    return axios.post(API_URL + "updateItem", formData, {
    });
  }

  // get all items
   getAll(id_shop){
     return axios.post(API_URL + "getAllData", {id_shop });
  }
  // delte item
  deleteItem(id_san_pham) {
    return axios.post(API_URL + "deleteItem", {
      id_san_pham
    });
  }
}

export default new AuthService();