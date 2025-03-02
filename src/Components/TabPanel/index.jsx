import { Card, CardContent } from "@mui/material";

// TabPanel Component
export const TabPanel = ({ other, children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Card sx={{ backgroundColor: "#fff", borderRadius: "4px", mt: 1 }}>
          <CardContent>{children}</CardContent>
        </Card>
      )}
    </div>
  );
};
