import { Box, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import ScoopReport from './ReportTabs/Scoop/ScoopReport';
import JobReport from './ReportTabs/Job/JobReport';
import InvoiceReport from './ReportTabs/InvoiceReport/InvoiceReport';
import LinguistReport from './ReportTabs/LinguistReport/LinguistReport';
import MarginReport from './ReportTabs/MarginReport';

const Reports = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const tabLabels = ["Scoops Report", "Jobs Report", "Margin Report" , "Invoice Report", "Linguist Report"];
    return (
        <Box sx={{ width: '100%' }}>
            <Box>
                {/* Right-aligned Dynamic Typography */}
                <Tabs value={activeTab} onChange={handleTabChange} aria-label="price units tabs">
                    {tabLabels.map((label, index) => (
                        <Tab key={index} label={label} />
                    ))}
                </Tabs>
            </Box>

            <Box sx={{ p: 2 }}>
                {activeTab === 0 &&  
                <Box className = "boxshadow"><ScoopReport/></Box>}
                {activeTab === 1 && 
                <Box className = "boxshadow"><JobReport/></Box>}
                {activeTab === 2 && 
                <Box className = "boxshadow"><MarginReport/></Box>}
                {activeTab === 3 && 
                <Box className = "boxshadow"><InvoiceReport/></Box>}
                {activeTab === 4 && 
                <Box className = "boxshadow"><LinguistReport/></Box>}
            </Box>
        </Box>
    );
};

export default Reports;