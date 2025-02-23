import { Box, Grid, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TextFieldComponent from "../../Components/TextFieldComponent";
import { LoginUser } from "../../redux/Thunk/authThunk/login";
import Loader from "../../Components/Ui_elements/Loader";
import Btn from "../../Components/Ui_elements/Btn";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const{loading} = useSelector((state) => state.root.loading);
  
  // Initial validation schema (before OTP is required)
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleForgetPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <>
    {loading && <div><Loader/></div>}
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100vh",
        backgroundColor: "#f4f6f8", // Light background color for simplicity
        padding: 3,
      }}
    >
      <Grid
        item
        xs={12}
        md={4}
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 3,
          padding: 4,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: 600, marginBottom: 3 }}
        >
          Login
        </Typography>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
              dispatch(LoginUser( { values, navigate }));
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextFieldComponent
                    label="Email"
                    name="email"
                    fullWidth
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.email && touched.email && errors.email}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextFieldComponent
                    label="Password"
                    name="password"
                    type="password"
                    fullWidth
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.password && touched.password && errors.password}
                  />
                </Grid>
              </Grid>

              <Box marginTop={2}>
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: "center",
                    cursor: "pointer",
                    color: "#1976d2",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                  onClick={handleForgetPassword}
                >
                  Forgot Password?
                </Typography>
              </Box>

              <Btn
                type="submit"
                sx={{
                  backgroundColor: "#1976d2",
                  color: "white",
                  marginTop: 3,
                  width: "100%",
                }}
              >
                Login
              </Btn>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
    </>
  );
}

export default Login;
