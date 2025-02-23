import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import MasterPrice from './MasterPrice';
import ChildPrice from './ChildPrice';
import RoundingPrice from './RoundingPrice';

const PriceUnits = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const tabLabels = ["Master Price", "Child Price", "Rounding Price"];

    return (
        <Box sx={{ width: '100%' }}>
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 2,
                }}
            >

                {/* Left-aligned Tabs */}
                <Typography variant="h5" sx={{ ml: 2 }}>
                    {tabLabels[activeTab]}
                </Typography>

                {/* Right-aligned Dynamic Typography */}
                <Tabs value={activeTab} onChange={handleTabChange} aria-label="price units tabs">
                    {tabLabels.map((label, index) => (
                        <Tab key={index} label={label} />
                    ))}
                </Tabs>
            </Box>

            <Box sx={{ p: 2 }}>
                {activeTab === 0 &&  
                <Box className = "boxshadow"><MasterPrice /></Box>}
                {activeTab === 1 && 
                <Box className = "boxshadow"><ChildPrice /></Box>}
                {activeTab === 2 && 
                <Box className = "boxshadow"><RoundingPrice /></Box>}
            </Box>
        </Box>
    );
};

export default PriceUnits;
