import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import kanhasoft from "../assets/logo/kanhasoft.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const settings = [
  { label: "Profile", onClick: () => null },
  { label: "Logout", onClick: null },
];

function Navbar({ open, handleToggleDrawer }) {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(
      (state) => state?.root?.user?.userProfile?.data?.user
    );
    const firstCharacter = user?.first_name
      ? user.first_name.charAt(0).toUpperCase()
      : "";
    
    const handleOpenUser = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseUser = () => {
      setAnchorElUser(null);
    };
  
    const handleProfile = () => {
      navigate("/profile");
    };

    const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("isAuthnticated");
      navigate("/login");
    };
  
    return (
      <AppBar position="fixed">
        <Container className="nav-container" maxWidth="xxl">
          <Toolbar disableGutters sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
            {/* Left Section: Logo and Drawer Button */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexGrow: 1, // Pushes content to the left
              }}
            >
              <img
                src={kanhasoft}
                alt="Anderson Kill"
                width={250}
                height={50}
                style={{ objectFit: "contain" }}
              />
              <IconButton
                onClick={handleToggleDrawer}
                sx={{ marginLeft: 2, color: "black" }}  // Adjust margin to space out the icon
              >
                {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </Box>
  
            {/* Right Section: Avatar / Settings Button */}
            <Box sx={{ flexGrow: 0 }}>
              <Box className="navbar-side-menu">
                <IconButton onClick={handleOpenUser} sx={{ p: 0 }}>
                  {user && user?.user_image ? (
                    <Avatar
                      alt={firstCharacter}
                      src={user?.user_image}
                      sx={{
                        width: 40,
                        height: 40,
                        objectFit: "contain",
                        border: "3px solid grey",
                        cursor: "pointer",
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    <Avatar alt={firstCharacter}>{firstCharacter}</Avatar>
                  )}
                </IconButton>
              </Box>
  
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUser}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.label}
                    onClick={() => {
                      handleCloseUser();
                      if (setting.label === "Logout") {
                        handleLogout();
                      } else if (setting.label === "Profile") {
                        handleProfile();
                      } else if (setting.onClick) {
                        setting.onClick();
                      }
                    }}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {setting.label}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
  
  export default Navbar;
  
