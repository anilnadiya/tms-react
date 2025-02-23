// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { styled } from '@mui/material/styles';
// import { Box, Button, Grid, Step, StepLabel, StepConnector, Stepper, Typography } from '@mui/material';
// import { stepConnectorClasses } from '@mui/material/StepConnector';

// const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
//   [`&.${stepConnectorClasses.alternativeLabel}`]: {
//     top: 22,
//   },
//   [`&.${stepConnectorClasses.active}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       backgroundColor: '#003399', // Use the blue color
//     },
//   },
//   [`&.${stepConnectorClasses.completed}`]: {
//     [`& .${stepConnectorClasses.line}`]: {
//       backgroundColor: '#003399', // Use the blue color
//     },
//   },
//   [`& .${stepConnectorClasses.line}`]: {
//     height: 3,
//     border: 0,
//     backgroundColor:
//       theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
//     borderRadius: 1,
//   },
// }));

// const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
//   zIndex: 1,
//   color: '#fff',
//   width: 50,
//   height: 50,
//   display: 'flex',
//   borderRadius: '50%',
//   justifyContent: 'center',
//   alignItems: 'center',
//   ...(ownerState.active && {
//     backgroundColor: '#003399', // Use the blue color
//   }),
//   ...(ownerState.completed && {
//     backgroundColor: '#003399', // Use the blue color
//   }),
// }));

// function ColorlibStepIcon(props) {
//   const { active, completed, className } = props;

//   const icons = {
//     1: 1,
//     2: 2,
//     3: 3,
//     4: 4,
//   };

//   return (
//     <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
//       {icons[String(props.icon)]}
//     </ColorlibStepIconRoot>
//   );
// }

// ColorlibStepIcon.propTypes = {
//   active: PropTypes.bool,
//   className: PropTypes.string,
//   completed: PropTypes.bool,
//   icon: PropTypes.node,
// };

// const steps = ['', '', '', ''];

// const StepperHandler = ({ getStepContent, buttonref }) => {
//   const [activeStep, setActiveStep] = useState(0);

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//   };

//   return (
//     <Box sx={{ pt: 6 }}>
//       <Stepper
//         alternativeLabel
//         activeStep={activeStep}
//         connector={<ColorlibConnector />}
//         sx={{ width: '469px', height: '34px', pb: 7, mx: 'auto' }}
//       >
//         {steps.map((label, index) => (
//           <Step key={label}>
//             <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//       <Grid>
//         {activeStep === steps.length ? (
//           <Grid item>
//             <Typography>All steps completed</Typography>
//             <Button onClick={handleReset}>Reset</Button>
//           </Grid>
//         ) : (
//           <Grid item>
//             {getStepContent(activeStep)}
//             <Button disabled={activeStep === 0} onClick={handleBack}>
//               Back
//             </Button>
//             <Button
//               sx={{ visibility: 'hidden' }}
//               variant="contained"
//               onClick={handleNext}
//               ref={buttonref}
//             >
//               {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//             </Button>
//           </Grid>
//         )}
//       </Grid>
//     </Box>
//   );
// };

// export default StepperHandler;


import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Box, Button, Grid, Step, StepLabel, StepConnector, Stepper, Typography } from '@mui/material';
import { stepConnectorClasses } from '@mui/material/StepConnector';
import { useNavigate } from 'react-router-dom';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
  },
  [`&.${stepConnectorClasses.active}, &.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: '#673AB7',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const StepperWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: '#fff',
  padding: '24px',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
});

const steps = ['Basic Information', 'Contacts', 'Prices', 'Payment Information', 'Login Details'];

const StepperHandler = ({ getStepContent,buttonref }) => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      navigate('/client'); // Navigate when Finish is clicked
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <StepperWrapper>
      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ mt: 4, width: '100%' }}>{getStepContent(activeStep)}</Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 4 }}>
        <Button disabled={activeStep === 0} onClick={handleBack} variant="contained">
          Back
        </Button>
        <Button
          // sx={{ visibility: 'hidden' }}
          variant="contained"
          onClick={handleNext}
          ref={buttonref}

        >
          {activeStep == steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>
    </StepperWrapper>
  );
};

StepperHandler.propTypes = {
  getStepContent: PropTypes.func.isRequired,
};

export default StepperHandler;