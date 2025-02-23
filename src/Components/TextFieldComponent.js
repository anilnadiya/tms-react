import React, { useState } from 'react';
import { TextField, InputLabel, Box, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const TextFieldComponent = ({ id, name, type, value, onChange, error, label, isNotMandatory, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box >
      <InputLabel shrink htmlFor={id} error={!!error}>
        {error ? (
          <span style={{ color: "red" }}>{error}</span>
        ) : (
          <>
            {label}
            <span style={{ color: "red" }}> {isNotMandatory ? "" : "*"}</span>
          </>
        )}
      </InputLabel>

      <TextField
        id={id}
        name={name}
        value={value}
        error={!!error}
        onChange={onChange}
        type={type === "password" ? (showPassword ? "text" : "password") : type || "text"}
        fullWidth
        {...props}
               InputProps={{
          endAdornment: type === "password" && (
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePassword} edge="end">
                {showPassword ? <VisibilityOff fontSize='small' /> : <Visibility fontSize='small'/>}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default TextFieldComponent;



// import React, { useState } from 'react';
// import { TextField, InputLabel, Select, MenuItem, InputAdornment } from '@mui/material';

// const TextFieldComponent = ({ 
//   id, 
//   name, 
//   type, 
//   value, 
//   onChange, 
//   error, 
//   label, 
//   isNotMandatory, 
//   withCountryCode, 
//   countryCodeOptions, 
//   ...props 
// }) => {
//   const [countryCode, setCountryCode] = useState('+1'); // Default country code

//   const handleCountryCodeChange = (event) => {
//     setCountryCode(event.target.value);
//     onChange({ target: { name, value: event.target.value + value.replace(countryCode, '') } });
//   };

//   const handlePhoneNumberChange = (event) => {
//     onChange({ target: { name, value: countryCode + event.target.value } });
//   };

//   return (
//     <div>
//       <InputLabel shrink htmlFor={id} error={!!error}>
//         {error ? (
//           <span style={{ color: "red" }}>{error}</span>
//         ) : (
//           <>
//             {label}
//             <span style={{ color: "red" }}> {isNotMandatory ? "" : "*"}</span>
//           </>
//         )}
//       </InputLabel>
//       {withCountryCode ? (
//         <TextField
//           id={id}
//           name={name}
//           value={value.replace(countryCode, '')}
//           onChange={handlePhoneNumberChange}
//           type={type || "text"}
//           error={!!error}
//           fullWidth
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <Select
//                   value={countryCode}
//                   onChange={handleCountryCodeChange}
//                   displayEmpty
//                   inputProps={{ 'aria-label': 'Without label' }}
//                 >
//                   {countryCodeOptions.map((option) => (
//                     <MenuItem key={option.value} value={option.value}>
//                       {option.label}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </InputAdornment>
//             ),
//           }}
//           {...props}
//         />
//       ) : (
//         <TextField
//           id={id}
//           name={name}
//           value={value}
//           onChange={onChange}
//           type={type || "text"}
//           error={!!error}
//           fullWidth
//           {...props}
//         />
//       )}
//     </div>
//   );
// };

// export default TextFieldComponent;