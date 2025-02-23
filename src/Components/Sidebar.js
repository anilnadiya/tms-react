import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Close";
import MenuItems from "../menu-items/MenuItems";
import { useNavigate } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';


export default function MiniDrawer({ open }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { menus, favorites, addFavorite, removeFavorite, setFavorites } = MenuItems();
  const [expanded, setExpanded] = useState(null); // Tracks first-level collapsibles
  const [nestedExpanded, setNestedExpanded] = useState({}); // Tracks second-level collapsibles

  const drawerWidth = 240;
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);
  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: 0, // Set width to 0 when closed
  });

  const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));

  const handlePath = (path) => {
    navigate(path);
  };

  const handleToggleCollapse = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const handleToggleNestedCollapse = (parentIndex, subIndex) => {
    setNestedExpanded((prev) => ({
      ...prev,
      [parentIndex]: prev[parentIndex] === subIndex ? null : subIndex,
    }));
  };

  return (
    <Drawer
      sx={{
        height: "calc(100vh - 72px)",
        position: "fixed",
        marginTop: "72px",
        zIndex: theme.zIndex.drawer,
      }}
      variant="permanent"
      open={open}
    >
      <Divider />
      <List>
        {/* Favorites Section */}
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            onClick={() => handleToggleCollapse("favorites")}
            sx={[
              { minHeight: 48, px: 2.5 },
              open
                ? { justifyContent: "initial" }
                : { justifyContent: "center" },
            ]}
          >
            <ListItemIcon
              sx={[
                { minWidth: 0, justifyContent: "center" },
                open ? { mr: 3 } : { mr: "auto" },
              ]}
            >
              <StarIcon />
            </ListItemIcon>
            <ListItemText
              primary="Favorites"
              sx={[open ? { opacity: 1 } : { opacity: 0 }]}
            />
            {expanded === "favorites" ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
        </ListItem>
        <Collapse in={expanded === "favorites"} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {favorites?.map((fav, index) => (
              <ListItemButton
                key={index}
                sx={{ pl: open ? 4 : 2 }}
                onClick={() => handlePath(fav.path)}
              >
                <ListItemText primary={fav.label} />
                <RemoveIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFavorite(fav);
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Collapse>

        {/* Menu Section */}
        {menus?.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() =>
                  item.collapsible
                    ? handleToggleCollapse(index)
                    : handlePath(item.path)
                }
                sx={[
                  { minHeight: 48, px: 2.5 },
                  open
                    ? { justifyContent: "initial" }
                    : { justifyContent: "center" },
                ]}
              >
                <ListItemIcon
                  sx={[
                    { minWidth: 0, justifyContent: "center" },
                    open ? { mr: 3 } : { mr: "auto" },
                  ]}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={[open ? { opacity: 1 } : { opacity: 0 }]}
                />
                {item.addToFavorites && (
                  <AddIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      addFavorite(item);
                    }}
                  />
                )}
                {item.collapsible &&
                  (expanded === index ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  ))}
              </ListItemButton>
            </ListItem>
            {item.collapsible && (
              <Collapse in={expanded === index} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subMenu.map((subItem, subIndex) => (
                    <React.Fragment key={subIndex}>
                      <ListItemButton
                        sx={{ pl: open ? 4 : 2 }}
                        onClick={() =>
                          subItem.collapsible
                            ? handleToggleNestedCollapse(index, subIndex)
                            : handlePath(subItem.path)
                        }
                      >
                        <ListItemText primary={subItem.label} />
                        {subItem.addToFavorites && (
                          <AddIcon
                            onClick={(e) => {
                              e.stopPropagation();
                              addFavorite(subItem);
                            }}
                          />
                        )}
                        {subItem.collapsible &&
                          (nestedExpanded[index] === subIndex ? (
                            <ExpandLessIcon />
                          ) : (
                            <ExpandMoreIcon />
                          ))}
                      </ListItemButton>
                      {subItem.collapsible && (
                        <Collapse
                          in={nestedExpanded[index] === subIndex}
                          timeout="auto"
                          unmountOnExit
                        >
                          <List component="div" disablePadding>
                            {subItem.subMenu.map((nestedItem, nestedIndex) => (
                              <ListItemButton
                                key={nestedIndex}
                                sx={{ pl: open ? 6 : 4 }}
                                onClick={() => handlePath(nestedItem.path)}
                              >
                                <ListItemText primary={nestedItem.label} />
                                {nestedItem.addToFavorites && (
                                  <AddIcon
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      addFavorite(nestedItem);
                                    }}
                                  />
                                )}
                              </ListItemButton>
                            ))}
                          </List>
                        </Collapse>
                      )}
                    </React.Fragment>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}
