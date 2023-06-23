import React from 'react'
import NavBar from "components/NavBar"
import Footer from 'components/Footer'

const AppLayout = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <NavBar/>
        <div className="dashboard-content">
        {React.Children.count(children) > 0 ? children : null}
      </div>
       <Footer  />
    </div>
  
  )
}

export default AppLayout