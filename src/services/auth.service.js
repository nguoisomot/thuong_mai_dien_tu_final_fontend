import axios from "axios";
import authHeader from './auth-header';

const API_URL = "http://localhost:3001/";

class AuthService {

  login(email, password) {
    return axios.post(API_URL + "loginShop", {
      email,
      password
    })
  }

  register(ten_shop, ho_va_ten, email, sdt, password) {
    return axios.post(API_URL + "registerShop", {
      ten_shop,ho_va_ten, email, sdt, password
    });
  };

  // add item into shop
  themSanPham(formData) {
    return axios.post(API_URL + "themSanPham", formData, {
      
    });
  }
  // update item of shop
  capNhatSanPham(formData) {
    return axios.post(API_URL + "capNhatSanPham", formData, {
    });
  }

  uploadImage(data){
    return axios.post(API_URL + "uploadImage",  {
      data
    }); 
  }
  uploadMultipleImage(data){
    return axios.post(API_URL + "uploadMultipleImage", data,  {
      
    }); 
  }

  // get all items
  sanPhamShop(idShop){
    return axios.post(API_URL + "sanPhamShop", {idShop });
  }
  // delte item
  deleteItem(id_san_pham) {
    return axios.post(API_URL + "deleteItem", {
      id_san_pham
    });
  }
  getAllItemsOrder(id_shop) {
    return axios.post(API_URL + "getAllItemsOrder", {
      id_shop
    });
  }
  getInfoUser(id_user) {
    return axios.post(API_URL + "getInfoUser", {
      id_user
    });
  }
  
  thongKeTheoNgay(date1,date2,id_shop) {
    return axios.post(API_URL + "thongKeTheoNgay", {
      date1, date2, id_shop
    });
  }
  thongKeTheoThang(month,id_shop) {
    return axios.post(API_URL + "thongKeTheoThang", {
      month, id_shop
    });
  }
  thongKeTheoNam(year,id_shop) {
    return axios.post(API_URL + "thongKeTheoNam", {
      year,id_shop
    });
  }
  thongKeTheoQuaCacThang(year,id_shop) {
    return axios.post(API_URL + "thongKeTheoQuaCacThang", {
      year,id_shop
    });
  }
  thongKeTheoCacNgayTrongThang(year,id_shop) {
    return axios.post(API_URL + "thongKeTheoCacNgayTrongThang", {
      year,id_shop
    });
  }

  sanPhamBanChayHomNay(date1, date2, id_shop) {
    return axios.post(API_URL + "sanPhamBanChayHomNay", {
      date1, date2, id_shop
    });
  }
  sanPhamBanChayThangNay(month, id_shop) {
    return axios.post(API_URL + "sanPhamBanChayThangNay", {
      month ,id_shop
    });
  }
  sanPhamBanChayTuDauNamDenNay(year, id_shop) {
    return axios.post(API_URL + "sanPhamBanChayTuDauNamDenNay", {
      year ,id_shop
    });
  }
  sanPhamBanChayCacThangTrongNam(year, id_shop) {
    return axios.post(API_URL + "sanPhamBanChayCacThangTrongNam", {
      year ,id_shop
    });
  }
  sanPhamBanChayCacNgayTrongThang(month, id_shop) {
    return axios.post(API_URL + "sanPhamBanChayCacNgayTrongThang", {
      month ,id_shop
    });
  }
}

export default new AuthService();
