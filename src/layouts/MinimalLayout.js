import React from "react";
import { Outlet } from "react-router-dom";


function MinimalLayout() {
  
  return (
    <>
      <Outlet />
    </>
  );
}

export default MinimalLayout;
