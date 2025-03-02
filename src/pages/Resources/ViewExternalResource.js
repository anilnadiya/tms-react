import React, { useEffect } from "react";
import {
    Container, Box, Typography, Button, Avatar, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableRow,
} from "@mui/material";
import { Email, Edit, Folder, Delete, CheckCircle, Notifications, } from "@mui/icons-material";
import {
    FaAddressCard, FaBan, FaBuilding, FaIdCard, FaInfoCircle, FaList, FaLock, FaMale, FaStar, FaUniversity,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { activationRemider, getContactExternalResource, getPropertyExternalResource, getSingleExternalResource, } from "../../redux/Thunk/externalResourceThunk";
import { TabPanel } from "../../Components/TabPanel";
import { Grid } from "@mui/material";
import { formatDate } from "../../Components/formateDate";
import { numberFixedLen } from "../../Components/numberFixedLen";
import GenericTable from "../../Components/Ui_elements/GenericTable";

const navTabs = [
    {
        icon: <FaAddressCard />,
        label: "System",
    },
    {
        icon: <FaInfoCircle />,
        label: "Basic Information",
    },
    {
        icon: <FaIdCard />,
        label: "Contact Information",
    },
    {
        icon: <FaAddressCard />,
        label: "Address",
    },
    {
        icon: <FaMale />,
        label: "Contact Person",
    },
    {
        icon: <FaBuilding />,
        label: "Property List",
    },
    {
        icon: <FaList />,
        label: "Price List",
    },
    {
        icon: <FaLock />,
        label: "Business Information",
    },
    {
        icon: <FaUniversity />,
        label: "Bank Details",
    },
    {
        icon: <FaStar />,
        label: "Review",
    },
    {
        icon: <FaBan />,
        label: "Absent List",
    },
];

const ViewExternal = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const [tabValue, setTabValue] = React.useState(0);
    const { externalResource, contactExternalResource, propertyExternalResource } = useSelector((state) => state.root.ExternalResourceReducer);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleActivationRemider = (resource) => {
        dispatch(activationRemider(resource));
    };

    const handleEmail = () => {
        // EmailForm
    };

    useEffect(() => {
        const request = { user_id: params?.id };
        dispatch(getSingleExternalResource(request));
        dispatch(getContactExternalResource(request));
        dispatch(getPropertyExternalResource(request));
    }, [params?.id]);

    const mobileNumber = JSON.parse(externalResource?.iMobile)
    const addressDetails = JSON.parse(externalResource?.address1Detail)
    const addressCountry = addressDetails.find((item) => item.id === "address1_country")?.value || "";
    const addressState = addressDetails.find((item) => item.id === "address1_administrative_area_level_1")?.value || "";
    const addressZipcode = addressDetails.find((item) => item.id === "address1_postal_code")?.value || "";

    const columns = [
        { name: "rowNumber", label: "No.", options: { sort: true } },
        { name: "iContactId", label: "ID", options: { display: false } },
        { name: "vFirstName", label: "Contact Person" },
        { name: "vEmail", label: "Email" },
        { name: "vDepartment", label: "Department" },
    ];

    const columnsProperty = [
        { name: "rowNumber", label: "No.", options: { sort: true } },
        { name: "property_id", label: "property_id", options: { display: false } },
        { name: "property_name", label: "Property Name" },
        { name: "values_names", label: "Values" },
    ];

    const data = contactExternalResource?.map((item, index) => ({
        rowNumber: index + 1, // Explicitly add sequential numbers
        vFirstName: item.vFirstName,
        vEmail: item.vEmail,
        vDepartment: item.vDepartment,
        iContactId: item.iContactId,
    }));
    const property = propertyExternalResource?.map((item, index) => ({
        rowNumber: index + 1, // Explicitly add sequential numbers
        property_name: item.property_name,
        values_names: item.values_names,
        property_id: item.property_id,
    }));

    return (
        <Container sx={{ bgcolor: "#f4f0ff", p: 3, borderRadius: 2 }}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    bgcolor: "#e5e1fa",
                    p: 3,
                    borderRadius: 2,
                }}
            >
                <Avatar src={externalResource?.vProfilePic ? `${process.env.REACT_APP_FLAG_URL}${externalResource?.vProfilePic}` : externalResource?.vProfilePic}sx={{ width: 80, height: 80, mr: 2 }} />

                <Box>
                    <Typography variant="h5" fontWeight="bold">
                        {externalResource?.vUserName || "N/A"}
                    </Typography>
                    <Typography variant="subtitle1">
                        I am a{" "}
                        {externalResource?.freelancer === "translation"
                            ? " Translation Agency."
                            : externalResource?.freelancer || ""}
                    </Typography>
                </Box>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Email />}
                    onClick={handleEmail}
                >
                    Email
                </Button>
                <Button variant="contained" color="secondary" startIcon={<Edit />}>
                    Edit
                </Button>
                <Button variant="contained" color="info" startIcon={<Folder />}>
                    File Manager
                </Button>
                <Button variant="contained" color="error" startIcon={<Delete />}>
                    Delete
                </Button>
                <Button variant="contained" color="success" startIcon={<CheckCircle />}>
                    Set As Active
                </Button>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<Notifications />}
                    onClick={() => handleActivationRemider(externalResource)}
                >
                    Activation Reminder
                </Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        navigate(-1);
                    }}
                    sx={{ ml: 1 }}
                >
                    Back
                </Button>
            </Box>

            <Tabs
                value={tabValue}
                onChange={handleTabChange}
                sx={{ mt: 2, borderBottom: 1, borderColor: "divider" }}
                variant="scrollable"
                scrollButtons={false}
            >
                {navTabs?.map((navItem, ind) => (
                    <Tab
                        key={ind}
                        label={
                            <Box display="flex" alignItems="center" gap={1}>
                                {navItem?.icon}
                                <Typography textTransform="none">{navItem?.label}</Typography>
                            </Box>
                        }
                        sx={{
                            color: "#502dc4",
                            fontSize: "14px",
                            "&.Mui-selected": { color: "#555" }, // Active tab color
                        }}
                    />
                ))}
            </Tabs>

            <TabPanel value={tabValue} index={0}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={4}>
                        <TableContainer>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: "bold" }}>Username</TableCell>
                                        <TableCell>{externalResource.vUserName || "N/A"}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: "bold" }}>
                                            Resource Number
                                        </TableCell>
                                        <TableCell>
                                            {externalResource.iResourceNumber
                                                ? numberFixedLen(externalResource.iResourceNumber)
                                                : "N/A"}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: "bold" }}>
                                            Creation Date
                                        </TableCell>
                                        <TableCell>
                                            {externalResource.dtCreatedDate
                                                ? formatDate(externalResource.dtCreatedDate)
                                                : "N/A"}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: "bold" }}>Creator</TableCell>
                                        <TableCell>
                                            {externalResource.createdBy
                                                ? externalResource?.createdBy
                                                : "N/A"}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                                <TableCell>{externalResource.vUserName || "N/A"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>Gender</TableCell>
                                <TableCell>{externalResource.iGender === 1 ? "Male" : "Female"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>Time Zone</TableCell>
                                <TableCell>{externalResource.vTimeZone}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>Resource Status</TableCell>
                                <TableCell>{externalResource.eUserStatusName}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>Date of Birth</TableCell>
                                <TableCell>
                                    {externalResource.dtBirthDate
                                        ? `${new Date(
                                            externalResource.dtBirthDate,
                                        ).toLocaleDateString()} (Age: ${new Date().getFullYear() -
                                        new Date(externalResource.dtBirthDate).getFullYear()
                                        })`
                                        : "N/A"}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>Memo</TableCell>
                                <TableCell>{externalResource.tMemo}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>Email Address</TableCell>
                                <TableCell>{externalResource.vEmailAddress || "N/A"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>Secondary Email Address</TableCell>
                                <TableCell>{externalResource.vSecondaryEmailAddress || "N/A"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>Website</TableCell>
                                <TableCell>{externalResource.vWebsite || "N/A"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>Mobile</TableCell>
                                <TableCell>{mobileNumber?.mobileNumber || "N/A"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>Skype Name</TableCell>
                                <TableCell>{externalResource.vSkypeName || "N/A"}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>Address</TableCell>
                                <TableCell>{externalResource.vAddress1 || "N/A"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>City</TableCell>
                                <TableCell>{externalResource.vTimeZoneCity || "N/A"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>State</TableCell>
                                <TableCell>{addressState || "N/A"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>Country</TableCell>
                                <TableCell>{addressCountry || "N/A"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>Zip Code</TableCell>
                                <TableCell>{addressZipcode || "N/A"}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </TabPanel>
            <TabPanel value={tabValue} index={4}>
                <Grid item sm={6}>
                    <GenericTable
                        columns={columns}
                        data={data}
                        showDelete={true}
                        displayColumns={4}
                        displayRows={10}
                        showAction={false}
                    />
                </Grid>
            </TabPanel>
            <TabPanel value={tabValue} index={5}>
                <Grid item sm={6}>
                    <GenericTable
                        columns={columnsProperty}
                        data={property}
                        showDelete={true}
                        displayColumns={4}
                        displayRows={10}
                        showAction={false}
                    />
                </Grid>
            </TabPanel>
            <TabPanel value={tabValue} index={6}></TabPanel>
            <TabPanel value={tabValue} index={7}>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>Company Name</TableCell>
                                <TableCell>{externalResource?.companyName || "N/A"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>Vat Number</TableCell>
                                <TableCell>{externalResource?.vat || "N/A"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>Taxation Type</TableCell>
                                <TableCell>{externalResource?.tax || "N/A"}</TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
            </TabPanel>
            <TabPanel value={tabValue} index={8}>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>Account Holder</TableCell>
                                <TableCell>{externalResource?.companyName || "N/A"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>Currency</TableCell>
                                <TableCell>{externalResource?.vat || "N/A"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>IBAN</TableCell>
                                <TableCell>{externalResource?.tax || "N/A"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>SWIFT/BIC</TableCell>
                                <TableCell>{externalResource?.tax || "N/A"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "bold" }}>Routing Number</TableCell>
                                <TableCell>{externalResource?.tax || "N/A"}</TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
            </TabPanel>
            <TabPanel value={tabValue} index={9}></TabPanel>
            <TabPanel value={tabValue} index={10}></TabPanel>

            <Typography variant="body2" align="left" sx={{ mt: 4, color: "gray" }}>
                &copy; 2015 Copyright.
            </Typography>
        </Container>
    );
};

export default ViewExternal;
