import React from 'react';
import Button from '@mui/material/Button';

const Btn = ({ 
    children, 
    onClick, 
    variant = 'contained', 
    color = 'primary', 
    size = 'medium', 
    disabled = false, 
    startIcon, 
    endIcon, 
    fullWidth = false, 
    ...rest 
}) => {
    return (
        <Button
            variant={variant}
            color={color}
            size={size}
            onClick={onClick}
            disabled={disabled}
            startIcon={startIcon}
            endIcon={endIcon}
            fullWidth={fullWidth}
            {...rest}
        >
            {children}
        </Button>
    );
};

export default Btn;
