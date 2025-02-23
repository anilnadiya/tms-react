export default function themeOverrides(theme) {
  return {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          height: "calc(100vh - 72px)", // Adjust the drawer height
          marginTop: "72px", // Add margin-top for the drawer
          background: theme.colors.primary,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: theme.colors.white,
          "& .MuiOutlinedInput-root": {
            color: theme.colors.textDark,
            borderRadius: theme.colors.themeRadius,
            padding: "0px",
            padding: "12px 16px",

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.colors.secondary, // Default border color
              borderWidth: "1px",
            },

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.colors.secondary, // Border color on hover
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.colors.primary, // Border color on focus
              borderWidth: "2px", // You can adjust the width on focus if needed
            },
          },

          "& input::placeholder": {
            color: theme.colors.textDark,
            opacity: 0.6,
            textTransform: "capitalize",
          },
        },
      },
    },

    MuiFormControl: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            color: theme.colors.$textPrimary,
            "& .MuiSelect-select": {
              padding: "12px 16px",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.colors.primary,
            },
            "&.Mui-focused": {
              "& .MuiOutlinedInput-notchedOutline": {
                border: "1px solid red",
                borderWidth: "1px",
                borderColor: theme.colors.primary,
              },
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: theme.colors.textPrimary,
          fontSize: "16px",
          marginBottom: "8px",
          "&.MuiInputLabel-shrink": {
            transform: "none",
            textTransform: "capitalize",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          "&.topbarSearch": {
            borderRadius: theme.colors.themeRadius,
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: theme.colors.lightGray,
            padding: "12px 16px",
            color: theme.colors.textSecondary,
            marginLeft: "32px",
            backgroundColor: theme.colors.white,
          },
          "& .MuiInputBase-input": {
            padding: "0",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "12px 24px",
          fontWeight: 600,
          borderRadius: theme.colors.themeRadius,
          boxShadow: theme.colors.themeBoxShadow,
          textTransform: "capitalize",
          lineHeight: "1.2",
          "&:hover": {
            boxShadow: theme.colors.themeBoxShadow,
          },
          "&.MuiButton-outlined": {
            borderColor: "#EFF2F5",
            color: theme.colors.textSecondary,
          },
          "&.MuiButton-outlinedError": {
            borderColor: "#9D1444",
            color: "#9D1444",
          },
        },
      },
    },
    MUIDataTableHeadCell: {
      styleOverrides: {
        root: {
          color: theme.colors.textDark,
          fontSize: "14px",
          fontWeight: "600",
          borderWidth: "0px 0px 1px 0px",
          padding: "8px 5px",
        },
      },
    },
    MUIDataTableToolbar: {
      styleOverrides: {
        root: {
          marginBottom: "20px",
          padding: "0 !important",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: theme.colors.textDark,
          fontSize: "14px",
          fontWeight: "400",
          maxWidth: " 150px",
          borderWidth: "1px solid black",
          VerticalAlign: "middle",
          padding: "8px 5px",
        },
      },
    },

    MuiTableRow: {
      styleOverrides: {
        root: {
          "&.MuiTableRow-hover": {
            "&:hover": {
              backgroundColor:  theme.colors.secondary,
              cursor : "pointer"
            },
          },
        },
      },
    },

    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
        rounded: {
          borderRadius: theme.colors.themeRadius,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          marginBottom: "24px",
          "&:last-child": {
            marginBottom: "0px",
          },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          "& > .MuiTypography-root": {
            letterSpacing: "0.24px",
            textTransform: "uppercase",
            color: theme.colors.textSecondary,
            fontWeight: "600",
            fontSize: "12px",
            padding: "8px 0px",
          },
          "& .MuiListItem-root": {
            padding: "0px",
            borderRadius: "6px",
            transition: "background-color 0.3s ease, color 0.3s ease",
            "&:hover": {
              backgroundColor: theme.colors.textPrimary,
              // Apply text color directly to child elements during hover
              "& .MuiListItemText-root, & .MuiListItemIcon-root": {
                color: theme.colors.primary, // Ensure text and icons also change color
              },
            },
          },
          "& .MuiListItemButton-root": {
            padding: "12px",
            borderRadius: "6px",
            transition: "background-color 0.3s ease, color 0.3s ease",
          },
          "& .MuiListItemIcon-root": {
            minWidth: "auto",
            marginRight: "4px",
            color: theme.colors.black,
            transition: "color 0.3s ease",
          },
          "& .MuiListItemText-root": {
            margin: "0px",
            marginLeft: "10px",
            color: theme.colors.black,
            fontSize: "14px",
            transition: "color 0.3s ease",
          },
        },
      },
    },
    
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          marginBottom: "16px",
          marginLeft: "0px",
          "& .MuiCheckbox-root": {
            padding: "0px",
            marginRight: "8px",
          },
          "& .MuiTypography-root": {
            fontSize: "12px",
            color: theme.colors.textSecondary,
          },
        },
      },
    },
  };
}
