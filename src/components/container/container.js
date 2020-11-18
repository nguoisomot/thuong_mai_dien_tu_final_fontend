import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import DvrIcon from '@material-ui/icons/Dvr';
import ReceiptIcon from "@material-ui/icons/Receipt";
import NotificationsIcon from "@material-ui/icons/Notifications";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import SettingsIcon from "@material-ui/icons/Settings";
import Sidebar from "../sidebar/sidebar";
import "./container.css";

import { useHistory } from 'react-router-dom'


function Container(props) {
  let history = useHistory();

  function onClickQuanLy(e, item) {
    //window.alert(JSON.stringify(item, null, 2));
    //console.log('additems')
    history.push("/manager");
  
  }
  function onClickAddItem(e, item) {
   history.push("/addItems");
  
  }
  function onClick(e, item) {
    if (item.name === 'them_san_pham'){
      console.log("Router")
      history.push("/addItems");
    }
    else if (item.name === 'quan_ly_san_pham'){
      console.log("Router")
      history.push("/manager");
    }
    else{
      history.push("/addItems");
      // console.log("item: " + JSON.stringify(item))
      console.log("item: " + JSON.stringify(item.name))
    }
  
  
  }
  const items = [
    { name: "trang_chu", label: "Trang Chủ", Icon: HomeIcon },
    {
      name: "don_hang",
      label: "Đơn Hàng",
      Icon: ReceiptIcon,
      items: [
        // add icon /////////////////////////////////
       // { name: "cho_xac_nhan", label: "Chờ xác nhận", Icon: HomeIcon, onClick },
        { name: "cho_xac_nhan", label: "Chờ xác nhận" },
        { name: "da_xac_nhan", label: "Đã xác nhận" }
      ]
    },
    "divider",
    {
      name: "san_pham",
      label: "Sản Phẩm",
      Icon: DvrIcon,
      items: [     
        { name: "them_san_pham", label: "Thêm Sản Phẩm", onClick },
        { name: "quan_ly_san_pham", label: "Quản Lý", onClick },
        "divider",
        {
          name: "notifications",
          label: "Notifications",
          Icon: NotificationsIcon,
          items: [
            { name: "email", label: "Email" },
            {
              name: "desktop",
              label: "Desktop",
              Icon: DesktopWindowsIcon,
              items: [
                { name: "schedule", label: "Schedule" },
                { name: "frequency", label: "Frequency" }
              ]
            },
            { name: "sms", label: "SMS" }
          ]
        }
      ]
    },
    "divider",
    {
      name: 'Thêm sản phẩm mới',
      label: 'Thêm sản phẩm mới',
      
    }
  ];
  return (
    <div className="over-body ">
      <Sidebar items={items} className="static"/>
      <div className="screen-work">{props.children}</div>
    </div>
  );
}

export default Container;
