import React from 'react'
import AppHeader from './components/dashboard/AppHeader'
import AppFooter from './components/dashboard/AppFooter'
import 'antd/dist/reset.css';
import { Space } from "antd";
import SideMenu from './components/dashboard/SideMenu';

function DashLayout({children}) {
  return (
    <div>
<AppHeader/>
    <Space className="SideMenuAndPageContent">
      <SideMenu/>
      <div className="dashboard-content">
        {React.Children.count(children) > 0 ? children : null}
      </div>
    </Space>
    <AppFooter/>
    </div>
  )
}

export default DashLayout