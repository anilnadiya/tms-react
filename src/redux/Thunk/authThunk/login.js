import { createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../authApi";
import { logout, setloginUserData } from "../../Slice/authSlice/loginSlice";
import { showSnackbar } from "../../Slice/snackbar/snackbarSlice";
import { setLoading } from "../../Slice/loading/loadingSlice";

export const LoginUser = createAsyncThunk(
    "create-email",
    async ({ values, navigate }, { dispatch }) => {
        try {
            dispatch(setLoading(true));
            const response = await authApi.post(`authenticate`, values);
            if (response?.status === 200) {
                const user = response?.data?.session_data;
                const isAuthenticated = true;
                localStorage.setItem("isAuthnticated", true);
                localStorage.setItem("token", response?.data?.session_data?.vPassword);
                dispatch(setloginUserData({ user, isAuthenticated }));
                navigate("/");
                dispatch(setLoading(false));
                dispatch(
                  showSnackbar({
                    message: response?.data?.msg,
                    type: "success",
                  })
                );
              }
              else{
                dispatch(setLoading(false));
                dispatch(
                  showSnackbar({
                    message: response?.data?.msg,
                    type: "error",
                  })
                )
              }
        } catch (error) {
            dispatch(setLoading(false));
            dispatch(
                showSnackbar({ message: error.response?.data?.msg, type: "error" })
            )
            console.log("error: ", error);
        }
    }
);


// export const logoutUser = createAsyncThunk(
//     "user/logout",
//     async (request, { dispatch }) => {
//       try {
//         const response = await authApi.post("/logout", request);
//         if (response?.status === 200) {
//           localStorage.setItem("isAuthnticated", false);
//           localStorage.removeItem("role");
//           dispatch(logout());
//         //   dispatch(
//         //     showSnackbar({
//         //       message: response?.data?.status_message
//         //         ? response?.data?.status_message
//         //         : "Logout successfully",
//         //       type: "success",
//         //     })
//         //   );
//           return true;
//         }
//       } catch (error) {
//         dispatch(
//           showSnackbar({ message: error.response.data.message, type: "error" })
//         );
//         console.log("error: ", error);
//       }
//     }
//   );
