// import React, { useState } from "react";
// import { TextField, Autocomplete, Box, MenuItem } from "@mui/material";
// import { useSelector } from "react-redux";

// const PhoneNumberInput = ({ step2Data, setStep2Data, errors, setErrors }) => {
//   const { country } = useSelector((state) => state.root.ClientModule);
//   const [selectedCountry, setSelectedCountry] = useState(null);

//   const handleCountryChange = (event, newValue) => {
//     setSelectedCountry(newValue);
//     setStep2Data((prevData) => ({
//       ...prevData,
//       country: newValue ? newValue.nicename : "",
//       vPhone: "", // Reset phone number when country changes
//     }));
//   };

//   const handlePhoneChange = (event) => {
//     const { value } = event.target;
//     setStep2Data((prevData) => ({
//       ...prevData,
//       vPhone: value,
//     }));
//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       vPhone: "",
//     }));
//   };

//   return (
//     <Box display="flex" alignItems="center" gap={1} sx={{ width: "100%" }}>
//       {/* Country Dropdown */}
//       <Autocomplete
//         options={country}
//         getOptionLabel={(option) => `${option.nicename} +${option.phonecode}`}
//         value={selectedCountry}
//         onChange={handleCountryChange}
//         renderOption={(props, option) => (
//           <MenuItem
//             component="li"
//             {...props}
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//               padding: "8px 16px",
//             }}
//           >
//             <Box
//               component="span"
//               sx={{
//                 width: 20,
//                 height: 15,
//                 backgroundSize: "cover",
//                 backgroundImage: `url(https://flagcdn.com/w40/${option.iso.toLowerCase()}.png)`,
//               }}
//             />
//             {option.nicename} +{option.phonecode}
//           </MenuItem>
//         )}
//         renderInput={(params) => (
//           <TextField {...params} label="Country" size="small" fullWidth />
//         )}
//         sx={{ width: 250 }}
//       />

//       {/* Phone Input */}
//       <TextField
//         type="text"
//         name="vPhone"
//         label="Phone"
//         value={step2Data.vPhone}
//         onChange={handlePhoneChange}
//         error={Boolean(errors.vPhone)}
//         helperText={errors.vPhone}
//         size="small"
//         fullWidth
//       />
//     </Box>
//   );
// };

// export default PhoneNumberInput;

// import React, { useState } from "react";
// import { TextField, Autocomplete, MenuItem, Grid, Box, InputAdornment, Button } from "@mui/material";
// import { useSelector } from "react-redux";

// const PhoneNumberInput = ({ onSubmit }) => {
//   const { country } = useSelector((state) => state.root.ClientModule);
//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [phone, setPhone] = useState("");

//   const handleCountryChange = (event, newValue) => {
//     setSelectedCountry(newValue);
//   };

//   const handlePhoneChange = (event) => {
//     setPhone(event.target.value);
//   };


//   return (
    
//       <Grid container spacing={1} alignItems="center">
//         {/* Country Dropdown - 25% Width */}
//         <Grid item xs={12} sm={3}>
//           <Autocomplete
//             options={country}
//             getOptionLabel={(option) => `${option.nicename} +${option.phonecode}`}
//             value={selectedCountry}
//             onChange={handleCountryChange}
//             renderOption={(props, option) => (
//               <MenuItem
//                 component="li"
//                 {...props}
//                 sx={{ display: "flex", alignItems: "center", gap: 1, padding: "8px 16px" }}
//               >
//                 <Box
//                   component="span"
//                   sx={{
//                     width: 20,
//                     height: 15,
//                     backgroundSize: "cover",
//                     backgroundImage: `url(https://flagcdn.com/w40/${option.iso.toLowerCase()}.png)`,
//                   }}
//                 />
//                 {option.nicename} +{option.phonecode}
//               </MenuItem>
//             )}
//             renderInput={(params) => <TextField {...params} label="Country" size="small" fullWidth />}
//           />
//         </Grid>

//         {/* Phone Input - 75% Width */}
//         <Grid item xs={12} sm={9}>
//           <TextField
//             label="Phone Number"
//             size="small"
//             fullWidth
//             type="tel"
//             value={phone}
//             onChange={handlePhoneChange}
//             InputProps={{
//               startAdornment: selectedCountry ? (
//                 <InputAdornment position="start">
//                   <Box
//                     component="span"
//                     sx={{
//                       width: 20,
//                       height: 15,
//                       backgroundSize: "cover",
//                       backgroundImage: `url(https://flagcdn.com/w40/${selectedCountry.iso.toLowerCase()}.png)`,
//                     }}
//                   />
//                   <Box sx={{ marginLeft: 1 }}>+{selectedCountry.phonecode}</Box>
//                 </InputAdornment>
//               ) : null,
//             }}
//           />
//         </Grid>
//       </Grid>
//   );
// };

// export default PhoneNumberInput;



import React, { useState, useEffect } from "react";
import { TextField, Autocomplete, MenuItem, Grid, Box, InputAdornment } from "@mui/material";
import { useSelector } from "react-redux";

const PhoneNumberInput = ({ vPhone, setVPhone, error }) => {
  const { country } = useSelector((state) => state.root.ClientModule);
  const [selectedCountry, setSelectedCountry] = useState(vPhone?.countryTitle || null);
  const [phone, setPhone] = useState(vPhone?.mobileNumber || "");

  useEffect(() => {
    setVPhone({
      countryTitle: selectedCountry?.nicename || "",
      countryFlagClass: selectedCountry ? `${selectedCountry.iso.toLowerCase()}` : "",
      mobileNumber: phone,
    });
  }, [selectedCountry, phone, setVPhone]);

  const handleCountryChange = (event, newValue) => {
    setSelectedCountry(newValue);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item xs={12} sm={3}>
        <Autocomplete
          options={country}
          getOptionLabel={(option) => `${option.nicename} +${option.phonecode}`}
          value={selectedCountry}
          onChange={handleCountryChange}
          renderOption={(props, option) => (
            <MenuItem
              component="li"
              {...props}
              sx={{ display: "flex", alignItems: "center", gap: 1, padding: "8px 16px" }}
            >
              <Box
                component="span"
                sx={{
                  width: 20,
                  height: 15,
                  backgroundSize: "cover",
                  backgroundImage: `url(https://flagcdn.com/w40/${option.iso.toLowerCase()}.png)`,
                }}
              />
              {option.nicename} +{option.phonecode}
            </MenuItem>
          )}
          renderInput={(params) => (
            <TextField {...params} label="Country" size="small" fullWidth />
          )}
        />
      </Grid>

      <Grid item xs={12} sm={9}>
        <TextField
          label="Phone Number"
          size="small"
          fullWidth
          type="tel"
          value={phone}
          onChange={handlePhoneChange}
          error={Boolean(error)}
          helperText={error}
          InputProps={{
            startAdornment: selectedCountry ? (
              <InputAdornment position="start">
                <Box
                  component="span"
                  sx={{
                    width: 20,
                    height: 15,
                    backgroundSize: "cover",
                    backgroundImage: `url(https://flagcdn.com/w40/${selectedCountry.iso.toLowerCase()}.png)`,
                  }}
                />
                <Box sx={{ marginLeft: 1 }}>+{selectedCountry.phonecode}</Box>
              </InputAdornment>
            ) : null,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default PhoneNumberInput;
