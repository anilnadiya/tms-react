// import React from "react";
// import { Box, Grid, Button, Checkbox, Typography } from "@mui/material";
// import TextFieldComponent from "../TextFieldComponent";
// import Btn from "./Btn";
// import DropdownWithSearch from "../DropdownWithSearch";

// const GenericForm = ({
//   fields,
//   values,
//   onChange,
//   onBlur,
//   onSubmit,
//   errors,
//   isEdit,
// }) => {
//   return (
//     <form onSubmit={onSubmit}>
//       <Box sx={{ width: "100%" }}>
//         <Grid container spacing={2} alignItems="center">
//           {fields.map((field, index) => (
//             <Grid
//               key={index}
//               item
//               xs={field.gridSize || 6}
//               sm={field.gridSize || 6}
//             >
//               {field.type === "text" && (
//                 <TextFieldComponent
//                   type="text"
//                   id={field.name}
//                   name={field.name}
//                   label={field.label}
//                   value={values[field.name]}
//                   onChange={onChange}
//                   onBlur={onBlur}
//                   error={errors[field.name] || ""}
//                   fullWidth
//                 />
//               )}
//               {field.type === "number" && (
//                 <TextFieldComponent
//                   type="number"
//                   id={field.name}
//                   name={field.name}
//                   label={field.label}
//                   value={values[field.name]}
//                   onChange={onChange}
//                   onBlur={onBlur}
//                   error={errors[field.name] || ""}
//                   fullWidth
//                 />
//               )}
//               {field.type === "checkbox" && (
//                 <Box display="flex" alignItems="center">
//                   <Checkbox
//                     checked={values[field.name]}
//                     onChange={(e) =>
//                       onChange({
//                         target: { name: field.name, value: e.target.checked },
//                       })
//                     }
//                     color="primary"
//                   />
//                   <Typography variant="body1">{field.label}</Typography>
//                 </Box>
//               )}
//               {field.type === "dropdown" && (
//                 <DropdownWithSearch
//                   error={errors[field.name] || ""}
//                   options={field.options} // Pass the options array
//                   label={field.label}
//                   selectedValue={values[field.name]} // Ensure the current value is passed
//                   onSelect={(newValue) =>
//                     onChange({ target: { name: field.name, value: newValue } })
//                   } // Ensure onChange updates the field correctly
//                   fullWidth
//                 />
//               )}

//               {/* Add more field types here (e.g., select, radio, date picker) */}
//             </Grid>
//           ))}
//           <Grid item xs={12}>
//             <Btn type="submit" variant="contained" color="primary">
//               {isEdit ? "Update" : "Add"}
//             </Btn>
//           </Grid>
//         </Grid>
//       </Box>
//     </form>
//   );
// };

// export default GenericForm;



import React, { useRef } from "react";
import { Box, Grid, Button, Checkbox, Typography, Avatar } from "@mui/material";
import TextFieldComponent from "../TextFieldComponent";
import Btn from "./Btn";
import DropdownWithSearch from "../DropdownWithSearch";

const GenericForm = ({ fields, values, onChange, onBlur, onSubmit, errors, isEdit }) => {
  const fileInputRef = useRef(null);

  // Function to trigger file selection
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // Function to handle file selection and update state
  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file); // Create a preview URL
      onChange({ target: { name: fieldName, value: fileUrl } }); // Store preview URL in values
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={2} alignItems="center">
          {fields.map((field, index) => (
            <Grid key={index} item xs={field.gridSize || 6} sm={field.gridSize || 6}>
              {field.type === "text" && (
                <TextFieldComponent
                  type="text"
                  id={field.name}
                  name={field.name}
                  label={field.label}
                  value={values[field.name]}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={errors[field.name] || ""}
                  fullWidth
                />
              )}
              {field.type === "number" && (
                <TextFieldComponent
                  type="number"
                  id={field.name}
                  name={field.name}
                  label={field.label}
                  value={values[field.name]}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={errors[field.name] || ""}
                  fullWidth
                />
              )}
              {field.type === "checkbox" && (
                <Box display="flex" alignItems="center">
                  <Checkbox
                    checked={values[field.name]}
                    onChange={(e) =>
                      onChange({ target: { name: field.name, value: e.target.checked } })
                    }
                    color="primary"
                  />
                  <Typography variant="body1">{field.label}</Typography>
                </Box>
              )}
              {field.type === "dropdown" && (
                <DropdownWithSearch
                  error={errors[field.name] || ""}
                  options={field.options}
                  label={field.label}
                  selectedValue={values[field.name]}
                  onSelect={(newValue) =>
                    onChange({ target: { name: field.name, value: newValue } })
                  }
                  fullWidth
                />
              )}
              {field.type === "file" && (
                <Grid item>
                  <Avatar
                    alt="Flag Preview"
                    src={values[field.name] || ""}
                    sx={{
                      width: 100,
                      height: 90,
                      cursor: "pointer",
                      borderRadius: "0%",
                      margin: "5px",
                      border: "4px solid rgb(254 254 254)",
                    }}
                    onClick={handleAvatarClick}
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, field.name)}
                    name={field.name}
                  />
                </Grid>
              )}
            </Grid>
          ))}
          <Grid item xs={12}>
            <Btn type="submit" variant="contained" color="primary">
              {isEdit ? "Update" : "Add"}
            </Btn>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default GenericForm;
