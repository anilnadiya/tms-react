
// import { Autocomplete, TextField } from "@mui/material";
// import { useMemo, useState } from "react";

// const DropdownWithSearch = ({ options, label, selectedValue, onSelect, error, ...rest }) => {
//   const [inputValue, setInputValue] = useState("");

//   const handleChange = (event, newValue) => {
//     onSelect(newValue);
//   };

//   const handleInputChange = (event, newValue) => {
//     setInputValue(newValue || "");
//   };

//   const filteredOptions = useMemo(() => {
//     return inputValue
//       ? options.filter((option) =>
//           option?.label?.toLowerCase()?.includes(inputValue?.toLowerCase())
//         )
//       : options;
//   }, [inputValue, options]);

//   return (
//     <Autocomplete
//       {...rest}
//       error={Boolean(error)} // Sets error state
//       options={filteredOptions}
//       value={selectedValue || null}
//       onChange={handleChange}
//       inputValue={inputValue}
//       onInputChange={handleInputChange}
//       getOptionLabel={(option) => option?.label || ""}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label={label}
//           helperText={error || ""}
//           FormHelperTextProps={{ error: Boolean(error) }} // Displays helper text with error style
//         />
//       )}
//     />
//   );
// };
// export default DropdownWithSearch;



import { Autocomplete, TextField, FormControl, FormLabel } from "@mui/material";
import { useMemo, useState } from "react";

const DropdownWithSearch = ({ options, label, selectedValue, onSelect, error, ...rest }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event, newValue) => {
    onSelect(newValue);
  };

  const handleInputChange = (event, newValue) => {
    setInputValue(newValue || "");
  };

  const filteredOptions = useMemo(() => {
    return inputValue
      ? options.filter((option) =>
          option?.label?.toLowerCase()?.includes(inputValue?.toLowerCase())
        )
      : options;
  }, [inputValue, options]);

  return (
    <FormControl fullWidth error={Boolean(error)} {...rest}>
      <FormLabel component="legend" style={{ color: error ? "red" : "inherit" }}>
        {error ? error : label}
        {/* {label} */}
      </FormLabel>
      <Autocomplete
        options={filteredOptions}
        size="small"
        value={selectedValue || null}
        onChange={handleChange}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        getOptionLabel={(option) => option?.label || ""}
        renderInput={(params) => (
          <TextField
            variant="outlined"
            {...params}
            error={Boolean(error)}
            // helperText={error || ""}
            InputLabelProps={{ shrink: true }} // Ensures label stays on top
          />
        )}
      />
    </FormControl>
  );
};

export default DropdownWithSearch;
