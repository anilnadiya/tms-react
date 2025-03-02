// import React, { useEffect, useState } from "react";
// import { Formik, Form } from "formik";
// import { Button, Grid, Box, Typography, IconButton } from "@mui/material";
// import DropdownComponent from "../../Components/DropdownComponent";
// import TextFieldComponent from "../../Components/TextFieldComponent";
// import { Close } from "@mui/icons-material";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getProfileNumber,
//   getResourcePosition,
//   getResourceStatusOptions,
//   getTreeMenueOptions,
// } from "../../redux/Thunk/internalResourceThunk/internalResourceThunk";
// import * as Yup from "yup";
// import { SaveUserProfileInternal } from "../../redux/Thunk/internalResourceThunk/internalResourceThunk";

// const AddUpdateResource = () => {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.root.authUser);
//   const {
//     profile_number,
//     resourceStatusList,
//     resourcePosition,
//     menuePermission,
//   } = useSelector((state) => state.root.InternalResource);

//   const [profilePreview, setProfilePreview] = useState(null);

//   const validationSchema = Yup.object().shape({
//     resourceStatus: Yup.string().required("Resource status is required"),
//     firstName: Yup.string().required("First name is required"),
//     lastName: Yup.string().required("Last name is required"),
//     gender: Yup.string()
//       .oneOf(["Male", "Female", "Other"], "Invalid gender selection")
//       .required("Gender is required"),
//     position: Yup.string().required("Position is required"),
//     absentFrom: Yup.date().nullable(),
//     absentTo: Yup.date()
//       .nullable()
//       .min(
//         Yup.ref("absentFrom"),
//         "Absent to date cannot be before absent from date"
//       ),
//     username: Yup.string()
//       .min(4, "Username must be at least 4 characters")
//       .required("Username is required"),
//     password: Yup.string()
//       .min(6, "Password must be at least 6 characters")
//       .required("Password is required"),
//     email: Yup.string()
//       .email("Invalid email format")
//       .required("Email is required"),
//     mobile: Yup.number()
//       .typeError("Mobile number must be a number")
//       .integer("Mobile number must be an integer"),
//     skype: Yup.string().nullable(),
//     tabsPermission: Yup.string().nullable(),
//     menuPermission: Yup.string().nullable(),
//     profilePicture: Yup.mixed().nullable(),
//   });

//   useEffect(() => {
//     const request = {
//       id: user?.iUserId,
//     };
//     dispatch(getProfileNumber(request));
//     dispatch(getResourceStatusOptions());
//     dispatch(getResourcePosition(request));
//     dispatch(getTreeMenueOptions());
//   }, []);

//   const tabsPermissionOption = () => {
//     if (user?.tab_sortedorder) {
//       return JSON.parse(user.tab_sortedorder)?.map((option) => ({
//         value: option?.tabName,
//         label: option?.tabName,
//       }));
//     }
//     return [];
//   };

//   return (
//     <Formik
//       initialValues={{
//         profileNumber: `00${profile_number}`,
//         resourceStatus: "",
//         firstName: "",
//         lastName: "",
//         gender: "",
//         dateOfBirth: "",
//         position: "",
//         absentFrom: "",
//         absentTo: "",
//         username: "",
//         password: "",
//         email: "",
//         mobile: "",
//         skype: "",
//         tabsPermission: "",
//         menuPermission: "",
//         profilePicture: null,
//       }}
//       validationSchema={validationSchema}
//       // validateOnBlur
//       // validateOnChange
//       onSubmit={(values) => {
//         console.log(values);
//         dispatch(SaveUserProfileInternal(values))
//       }}
//     >
//       {({
//         setFieldValue,
//         values,
//         handleChange,
//         handleBlur,
//         errors,
//         touched,
//       }) => (
//         <Form>
//           <Grid container spacing={3}>
//             {/* Basic Information */}
//             <Grid item xs={12} md={6}>
//               <Typography variant="h4" color="grey">
//                 Basic Information
//               </Typography>

//               <TextFieldComponent
//                 id="profileNumber"
//                 name="profileNumber"
//                 label="Profile Number"
//                 value={values.profileNumber}
//                 disabled
//                 fullWidth
//               />

//               <DropdownComponent
//                 id="resourceStatus"
//                 name="resourceStatus"
//                 label="Resource Status"
//                 options={resourceStatusList || []}
//                 value={values?.resourceStatus}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 fullWidth
//                 error={errors?.resourceStatus}
//               />
//               <TextFieldComponent
//                 id="firstName"
//                 name="firstName"
//                 label="First Name"
//                 value={values.firstName}
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 fullWidth
//                 error={touched.firstName && errors?.firstName}
//               />
//               <TextFieldComponent
//                 id="lastName"
//                 name="lastName"
//                 label="Last Name"
//                 value={values.lastName}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 fullWidth
//                 error={touched.lastName && errors?.lastName}
//               />
//               <DropdownComponent
//                 id="gender"
//                 name="gender"
//                 label="Gender"
//                 options={["Male", "Female", "Other"]}
//                 value={values.gender}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 fullWidth
//                 error={touched.gender && errors?.gender}
//               />
//               <TextFieldComponent
//                 id="dateOfBirth"
//                 name="dateOfBirth"
//                 label="Date of Birth"
//                 type="date"
//                 value={values.dateOfBirth}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 fullWidth
//               />

//               <DropdownComponent
//                 id="position"
//                 name="position"
//                 label="Position"
//                 options={resourcePosition}
//                 value={values?.position}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 fullWidth
//                 error={touched.position && errors?.position}
//               />

//               <TextFieldComponent
//                 id="absentFrom"
//                 name="absentFrom"
//                 label="Absent From"
//                 type="date"
//                 value={values.absentFrom}
//                 onChange={handleChange}
//                 fullWidth
//                 error={touched.absentFrom && errors?.absentFrom}
//               />
//               <TextFieldComponent
//                 id="absentTo"
//                 name="absentTo"
//                 label="Absent To"
//                 type="date"
//                 value={values.absentTo}
//                 onChange={handleChange}
//                 fullWidth
//                 error={touched.absentTo && errors?.absentTo}
//                 sx={{
//                   mb: 4,
//                 }}
//               />
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(event) => {
//                   const file = event.currentTarget.files[0];
//                   setFieldValue("profilePicture", file);
//                   setProfilePreview(URL.createObjectURL(file));
//                 }}
//                 style={{ display: "none" }}
//                 id="upload-button"
//               />

//               <label htmlFor="upload-button">
//                 <Box
//                   sx={{
//                     width: 120,
//                     height: 120,
//                     borderRadius: "50%",
//                     border: "2px dashed #aaa",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     cursor: "pointer",
//                     "&:hover": { borderColor: "primary.main" },
//                   }}
//                 >
//                   {profilePreview ? (
//                     <img
//                       src={profilePreview}
//                       alt="Profile Preview"
//                       width="120"
//                       height="120"
//                       style={{ borderRadius: "50%", objectFit: "cover" }}
//                     />
//                   ) : (
//                     <Typography color="textSecondary">Upload Image</Typography>
//                   )}
//                 </Box>
//               </label>

//               {profilePreview && (
//                 <Box mt={2} textAlign="center">
//                   <IconButton
//                     onClick={() => setProfilePreview(null)}
//                     color="error"
//                     size="small"
//                     sx={{ position: "absolute", right: 10, top: 10 }}
//                   >
//                     <Close />
//                   </IconButton>
//                 </Box>
//               )}
//             </Grid>

//             {/* Contact Information */}
//             <Grid item xs={12} md={6}>
//               <Typography variant="h4" color="grey">
//                 Contact Information
//               </Typography>

//               <TextFieldComponent
//                 id="username"
//                 name="username"
//                 label="Username"
//                 value={values.username}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 fullWidth
//                 error={touched.username && errors?.username}
//               />
//               <TextFieldComponent
//                 id="password"
//                 name="password"
//                 label="Password"
//                 type="password"
//                 value={values.password}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 fullWidth
//                 error={touched.password && errors?.password}
//               />
//               <TextFieldComponent
//                 id="email"
//                 name="email"
//                 label="Email Address"
//                 type="email"
//                 value={values.email}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 fullWidth
//                 error={touched.email && errors?.email}
//               />
//               <TextFieldComponent
//                 id="mobile"
//                 name="mobile"
//                 label="Mobile"
//                 value={values.mobile}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 fullWidth
//               />
//               <TextFieldComponent
//                 id="skype"
//                 name="skype"
//                 label="Skype Name"
//                 value={values.skype}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 fullWidth
//               />

//               <DropdownComponent
//                 id="tabsPermission"
//                 name="tabsPermission"
//                 label="Tabs Permission"
//                 options={tabsPermissionOption()}
//                 value={values?.tabsPermission}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 fullWidth
//                 error={touched.tabsPermission && errors?.tabsPermission}
//               />
//               <DropdownComponent
//                 id="menuPermission"
//                 name="menuPermission"
//                 label="Menu Permission"
//                 options={menuePermission}
//                 value={values?.menuPermission}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 fullWidth
//                 error={touched.menuPermission && errors?.menuPermission}
//               />
//             </Grid>
//           </Grid>
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             style={{ marginTop: 20 }}
//           >
//             Submit
//           </Button>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default AddUpdateResource;

import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import {
  Button,
  Grid,
  Box,
  Typography,
  IconButton,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfileNumber,
  getResourcePosition,
  getResourceStatusOptions,
  getTreeMenueOptions,
} from "../../redux/Thunk/internalResourceThunk/internalResourceThunk";
import * as Yup from "yup";
import { SaveUserProfileInternal } from "../../redux/Thunk/internalResourceThunk/internalResourceThunk";
import TextFieldComponent from "../../Components/TextFieldComponent";
import DropdownComponent from "../../Components/DropdownComponent";

const AddUpdateResource = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.root.authUser);
  const {
    profile_number,
    resourceStatusList,
    resourcePosition,
    menuePermission,
  } = useSelector((state) => state.root.InternalResource);

  const [profilePreview, setProfilePreview] = useState(null);

  const validationSchema = Yup.object().shape({
    resourceStatus: Yup.string().required("Resource status is required"),
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    gender: Yup.string()
      .oneOf(["Male", "Female", "Other"], "Invalid gender selection")
      .required("Gender is required"),
    position: Yup.array().min(1, "At least one position is required"),
    absentFrom: Yup.date().nullable(),
    absentTo: Yup.date()
      .nullable()
      .min(
        Yup.ref("absentFrom"),
        "Absent to date cannot be before absent from date",
      ),
    username: Yup.string()
      .min(4, "Username must be at least 4 characters")
      .required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    mobile: Yup.number()
      .typeError("Mobile number must be a number")
      .integer("Mobile number must be an integer"),
    skype: Yup.string().nullable(),
    tabsPermission: Yup.array().min(
      1,
      "At least one tab permission is required",
    ),
    menuPermission: Yup.array().min(
      1,
      "At least one menu permission is required",
    ),
    profilePicture: Yup.mixed().nullable(),
  });

  useEffect(() => {
    const request = {
      id: user?.iUserId,
    };
    dispatch(getProfileNumber(request));
    dispatch(getResourceStatusOptions());
    dispatch(getResourcePosition(request));
    dispatch(getTreeMenueOptions());
  }, []);

  const tabsPermissionOption = () => {
    if (user?.tab_sortedorder) {
      return JSON.parse(user.tab_sortedorder)?.map((option) => ({
        value: option?.tabName,
        label: option?.tabName,
      }));
    }
    return [];
  };

  const handleMultiSelectChange = (event, setFieldValue, field) => {
    const { value } = event.target;
    setFieldValue(field, value);
  };

  const handleChipDelete = (value, field, values, setFieldValue) => {
    const newValues = values[field].filter((item) => item !== value);
    setFieldValue(field, newValues);
  };

  return (
    <Formik
      initialValues={{
        profileNumber: `00${profile_number}`,
        resourceStatus: "",
        firstName: "",
        lastName: "",
        gender: "",
        dateOfBirth: "",
        position: [],
        absentFrom: "",
        absentTo: "",
        username: "",
        password: "",
        email: "",
        mobile: "",
        skype: "",
        tabsPermission: [],
        menuPermission: [],
        profilePicture: null,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values, 111);
        // dispatch(SaveUserProfileInternal(values));
      }}
    >
      {({
        setFieldValue,
        values,
        handleChange,
        handleBlur,
        errors,
        touched,
      }) => (
        <Form>
          <Grid container spacing={3}>
            {/* Basic Information */}
            <Grid item xs={12} md={6}>
              <Typography variant="h4" color="grey">
                Basic Information
              </Typography>

              <TextFieldComponent
                id="profileNumber"
                name="profileNumber"
                label="Profile Number"
                value={values.profileNumber}
                disabled
                fullWidth
              />

              <DropdownComponent
                id="resourceStatus"
                name="resourceStatus"
                label="Resource Status"
                options={resourceStatusList || []}
                value={values?.resourceStatus}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                error={errors?.resourceStatus}
              />
              <TextFieldComponent
                id="firstName"
                name="firstName"
                label="First Name"
                value={values.firstName}
                onBlur={handleBlur}
                onChange={handleChange}
                fullWidth
                error={touched.firstName && errors?.firstName}
              />
              <TextFieldComponent
                id="lastName"
                name="lastName"
                label="Last Name"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                error={touched.lastName && errors?.lastName}
              />
              <DropdownComponent
                id="gender"
                name="gender"
                label="Gender"
                options={["Male", "Female", "Other"]}
                value={values.gender}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                error={touched.gender && errors?.gender}
              />
              <TextFieldComponent
                id="dateOfBirth"
                name="dateOfBirth"
                label="Date of Birth"
                type="date"
                value={values.dateOfBirth}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
              />

              {/* Position (Multiple Select) */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel>Position</FormLabel>
                  <Select
                    multiple
                    id="position"
                    name="position"
                    value={values.position || []}
                    onChange={(e) =>
                      handleMultiSelectChange(e, setFieldValue, "position")
                    }
                    renderValue={(selected) => (
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "5px",
                        }}
                      >
                        {selected.map((value) => {
                          const matched = resourcePosition.find(
                            (opt) => opt.value === value,
                          );
                          return (
                            <Chip
                              key={value}
                              label={matched ? matched.label : value}
                              onMouseDown={(e) => e.stopPropagation()}
                              onDelete={(e) => {
                                e.stopPropagation();
                                handleChipDelete(
                                  value,
                                  "position",
                                  values,
                                  setFieldValue,
                                );
                              }}
                            />
                          );
                        })}
                      </div>
                    )}
                  >
                    {resourcePosition.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <TextFieldComponent
                id="absentFrom"
                name="absentFrom"
                label="Absent From"
                type="date"
                value={values.absentFrom}
                onChange={handleChange}
                fullWidth
                error={touched.absentFrom && errors?.absentFrom}
              />
              <TextFieldComponent
                id="absentTo"
                name="absentTo"
                label="Absent To"
                type="date"
                value={values.absentTo}
                onChange={handleChange}
                fullWidth
                error={touched.absentTo && errors?.absentTo}
                sx={{
                  mb: 4,
                }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  setFieldValue("profilePicture", file);
                  setProfilePreview(URL.createObjectURL(file));
                }}
                style={{ display: "none" }}
                id="upload-button"
              />

              <label htmlFor="upload-button">
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    border: "2px dashed #aaa",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    "&:hover": { borderColor: "primary.main" },
                  }}
                >
                  {profilePreview ? (
                    <img
                      src={profilePreview}
                      alt="Profile Preview"
                      width="120"
                      height="120"
                      style={{ borderRadius: "50%", objectFit: "cover" }}
                    />
                  ) : (
                    <Typography color="textSecondary">Upload Image</Typography>
                  )}
                </Box>
              </label>

              {profilePreview && (
                <Box mt={2} textAlign="center">
                  <IconButton
                    onClick={() => setProfilePreview(null)}
                    color="error"
                    size="small"
                    sx={{ position: "absolute", right: 10, top: 10 }}
                  >
                    <Close />
                  </IconButton>
                </Box>
              )}
            </Grid>

            {/* Contact Information */}
            <Grid item xs={12} md={6}>
              <Typography variant="h4" color="grey">
                Contact Information
              </Typography>

              <TextFieldComponent
                id="username"
                name="username"
                label="Username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                error={touched.username && errors?.username}
              />
              <TextFieldComponent
                id="password"
                name="password"
                label="Password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                error={touched.password && errors?.password}
              />
              <TextFieldComponent
                id="email"
                name="email"
                label="Email Address"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
                error={touched.email && errors?.email}
              />
              <TextFieldComponent
                id="mobile"
                name="mobile"
                label="Mobile"
                value={values.mobile}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
              />
              <TextFieldComponent
                id="skype"
                name="skype"
                label="Skype Name"
                value={values.skype}
                onChange={handleChange}
                onBlur={handleBlur}
                fullWidth
              />

              {/* Tabs Permission (Multiple Select) */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel>Tabs Permission</FormLabel>
                  <Select
                    multiple
                    id="tabsPermission"
                    name="tabsPermission"
                    value={values.tabsPermission || []}
                    onChange={(e) =>
                      handleMultiSelectChange(
                        e,
                        setFieldValue,
                        "tabsPermission",
                      )
                    }
                    renderValue={(selected) => (
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "5px",
                        }}
                      >
                        {selected.map((value) => {
                          const matched = tabsPermissionOption().find(
                            (opt) => opt.value === value,
                          );
                          return (
                            <Chip
                              key={value}
                              label={matched ? matched.label : value}
                              onMouseDown={(e) => e.stopPropagation()}
                              onDelete={(e) => {
                                e.stopPropagation();
                                handleChipDelete(
                                  value,
                                  "tabsPermission",
                                  values,
                                  setFieldValue,
                                );
                              }}
                            />
                          );
                        })}
                      </div>
                    )}
                  >
                    {tabsPermissionOption().map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Menu Permission (Multiple Select) */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel>Menu Permission</FormLabel>
                  <Select
                    multiple
                    id="menuPermission"
                    name="menuPermission"
                    value={values.menuPermission || []}
                    onChange={(e) =>
                      handleMultiSelectChange(
                        e,
                        setFieldValue,
                        "menuPermission",
                      )
                    }
                    renderValue={(selected) => (
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "5px",
                        }}
                      >
                        {selected.map((value) => {
                          const matched = menuePermission.find(
                            (opt) => opt.value === value,
                          );
                          return (
                            <Chip
                              key={value}
                              label={matched ? matched.label : value}
                              onMouseDown={(e) => e.stopPropagation()}
                              onDelete={(e) => {
                                e.stopPropagation();
                                handleChipDelete(
                                  value,
                                  "menuPermission",
                                  values,
                                  setFieldValue,
                                );
                              }}
                            />
                          );
                        })}
                      </div>
                    )}
                  >
                    {menuePermission.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: 20 }}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddUpdateResource;
