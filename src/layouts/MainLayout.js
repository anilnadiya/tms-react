import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";


function MainLayout() {
  const [openSidebar, setOpenSideBar] = useState(true)



  const handleToggleSidebar = () => {
    openSidebar ? setOpenSideBar(false) : setOpenSideBar(true)
  }

  return (
    <>
      <div>
        <Navbar handleToggleDrawer={handleToggleSidebar} open={openSidebar}  />
        <Sidebar open={openSidebar} openSidebar={openSidebar} handleToggleSidebar={handleToggleSidebar}/>

        {/* Main Content Area */}

        <div
          style={{
            marginTop : "72px",
            marginLeft : openSidebar ? '240px' : '16px',
            padding : "20px",
            flexGrow: 1,
          }}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default MainLayout;
