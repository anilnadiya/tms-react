// DashboardWidget.js
import React from 'react';
import { Box, Typography } from "@mui/material";

const OverviewWidgets = ({ title, imgSrc, count }) => {
  return (
    <div className="col-sm-3 rightBox-group widgetBox">
      <div className="box">
        <div className="white_box panel panel-default">
          <div className="panel-heading gradient-due-jobs">
            <img src={imgSrc} alt={title} height="50" />
          </div>
          <div className="panel-heading wrapper b-b b-light">
            <span className="holidayTabActive widgetbtn">{title}</span>
          </div>
          <ul className="scrollbar list-group list-group-lg m-b-none" id="scrollStyle" style={{ height: "250px" }}>
            <li className="list-group-item">
              <a href="javascript:void(0)" className="ng-binding">Sample Job</a>
              <span className="pull-right label bg-primary inline m-t-sm ng-binding">{count}</span>
            </li>
            {/* More items can be added here dynamically */}
          </ul>
          <div className="panel-footer" style={{ background: "#e6e9ef" }}>
            <span className="pull-right badge bg-info ng-binding">{count}</span>
            <span>&nbsp;</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewWidgets;
