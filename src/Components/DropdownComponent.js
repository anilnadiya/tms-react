// import React from "react";
// import {
//   FormControl,
//   FormLabel,
//   MenuItem,
//   Select,
// } from "@mui/material";

// const DropdownComponent = ({
//   label,
//   name,
//   value,
//   onChange,
//   options,
//   valueKey = "value",
//   labelKey = "label",
//   displayEmpty = true,
//   disabledOptionText = "Select an option",
//   error = false,
//   helperText = "",
// }) => {
//   return (
//     <FormControl fullWidth error={error}>
//       {error ? (
//         <FormLabel style={{ marginBottom: "8px" }}>{error}</FormLabel>
//       ) : (
//         <FormLabel style={{ marginBottom: "8px" }}>{label}</FormLabel>
//       )}

//       <Select
//         name={name}
//         value={value}
//         onChange={onChange}
//         displayEmpty={displayEmpty}
//       >
//         {displayEmpty && (
//           <MenuItem value="" disabled>
//             {disabledOptionText}
//           </MenuItem>
//         )}

//         {Array.isArray(options) &&
//           options.map((option, index) => {
//             if (typeof option === "object" && option !== null) {
//               return (
//                 <MenuItem key={index} value={option[valueKey]}>
//                   {option[labelKey]}
//                 </MenuItem>
//               );
//             }
//             return (
//               <MenuItem key={index} value={option}>
//                 {option}
//               </MenuItem>
//             );
//           })}
//       </Select>
//     </FormControl>
//   );
// };

// export default DropdownComponent;

import { Autocomplete, TextField, FormControl, FormLabel } from "@mui/material";
import { useMemo, useState } from "react";

const DropdownComponent = ({
  options,
  label,
  name,
  value,
  onChange,
  valueKey = "value",
  labelKey = "label",
  displayEmpty = true,
  disabledOptionText = "Select an option",
  error = false,
  isNotMandatory = false,
  disabled=false,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState("");

  const normalizedOptions = useMemo(() => {
    return options?.map((option) =>
      typeof option === "object"
        ? option
        : { [valueKey]: option, [labelKey]: option }
    );
  }, [options, valueKey, labelKey]);

  const handleChange = (event, newValue) => {
    onChange({ target: { name, value: newValue ? newValue[valueKey] : "" } });
  };

  const handleInputChange = (event, newValue) => {
    setInputValue(newValue || "");
  };

  const filteredOptions = useMemo(() => {
    return inputValue
      ? normalizedOptions?.filter((option) =>
          option[labelKey]?.toLowerCase()?.includes(inputValue?.toLowerCase())
        )
      : normalizedOptions;
  }, [inputValue, normalizedOptions]);

  return (
    <FormControl fullWidth error={Boolean(error)} {...rest}>
      <FormLabel
        style={{ marginBottom: "8px", color: error ? "red" : "inherit" }}
      >
        {error ? (
          <span style={{ color: "red" }}>{error}</span>
        ) : (
          <>
            {label}
            <span style={{ color: "red" }}> {isNotMandatory ? "" : "*"}</span>
          </>
        )}{" "}
      </FormLabel>
      <Autocomplete
        disabled={disabled}
        options={filteredOptions}
        size="small"
        value={
          normalizedOptions?.find((opt) => opt[valueKey] === value) || null
        }
        onChange={handleChange}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        getOptionLabel={(option) => option[labelKey] || ""}
        isOptionEqualToValue={(option, value) =>
          option[valueKey] === value[valueKey]
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            error={Boolean(error)}
            InputLabelProps={{ shrink: true }}
          />
        )}
      />
    </FormControl>
  );
};

export default DropdownComponent;
