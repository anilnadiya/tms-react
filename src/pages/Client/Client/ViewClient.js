import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClientPaymentList, DeleteClient, GetClientLoginDetailList, ViewDirectContactList, ViewDirectDataList } from '../../../redux/Thunk/ClientModule/ClientThunk';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, Box, Card, CardContent, CardHeader, Grid, Typography, IconButton } from '@mui/material';
import Btn from '../../../Components/Ui_elements/Btn';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import dayjs from "dayjs";
import GenericTable from '../../../Components/Ui_elements/GenericTable';
import { SortAlphabetically } from '../../../Helper/SortAlphbetically';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PopupModal from '../../../Components/Ui_elements/PopupModal';

const ViewClient = () => {
    const { client_view_direct_data, client_payment_list, client_login_detail_list, client_view_direct_contact } = useSelector((state) => state.root.ClientModule);
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [openForDelete, setOpenForDelete] = useState(false);
    useEffect(() => {
        if (id) {
            dispatch(ViewDirectDataList(id));
            dispatch(ClientPaymentList(id));
            dispatch(GetClientLoginDetailList(id));
            dispatch(ViewDirectContactList(id));
        }
    }, [id, dispatch]);

    const columns = [
        { name: "vDescription", label: "Description" },
        { name: "vEmail", label: "User Name" },
        {
            name: "vWebsite",
            label: "Website",
            options: {
                customBodyRender: (value) => (
                    value ? (
                        <a href={value.startsWith("http") ? value : `https://${value}`} target="_blank" rel="noopener noreferrer" style={{ color: "blue", textDecoration: "underline" }}>
                            {value}
                        </a>
                    ) : "N/A"
                )
            }
        },
        {
            name: "vPassword",
            label: "Password",
            options: {
                customBodyRender: (value) => (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <span>{showPassword ? value : "••••••••"}</span>
                        <IconButton onClick={() => setShowPassword(!showPassword)} size="small">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </div>
                )
            }
        }
    ];

    const sortedData = SortAlphabetically(client_login_detail_list || [], "vEmail");
    const data = sortedData.map((item, index) => ({
        iClientId: item.iClientId,
        vDescription: item.vDescription,
        vWebsite: item.vWebsite,
        vEmail: item.vEmail,
        vPassword: item.vPassword
    }));

    const handleDelete = () => {
        setOpenForDelete(true);
    }
    return (
        <>
            <Grid container justifyContent="flex-end" mb={2}>
                <Btn startIcon={<KeyboardBackspaceIcon />} onClick={() => navigate("/client")}>Back</Btn>
            </Grid>

            {/* Profile Section - Full Width */}
            <Card sx={{ mb: 3, p: 3 }} className='boxshadow'>
                <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                        <Avatar src={client_view_direct_data?.vLogo} sx={{ width: 100, height: 100 }} />
                    </Grid>
                    <Grid item>
                        <Typography variant="h6">{client_view_direct_data?.vUserName}</Typography>
                        <Typography variant="body2" mb={1}>I am a client</Typography>
                        <Grid item sx={{ display: "flex", gap: 2 }}>
                            <Btn onClick={() => navigate(`/client/form/${id}`)}>Edit</Btn>
                            <Btn onClick={handleDelete}>Delete</Btn>
                            <Btn>Email</Btn>
                            <Btn>File Manager</Btn>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>

            {/* Two Column Grid for Remaining Cards */}
            <Grid container spacing={3}>
                {/* Client Details */}
                <Grid item xs={12} md={6} >
                    <Card className='boxshadow' >
                        <CardHeader title="Client Details" />
                        <CardContent>
                            <Typography><b>Business Unit Name:</b> {client_view_direct_data?.vCodeRights_name}</Typography>
                            <Typography><b>Phone:</b> {JSON.parse(client_view_direct_data?.vPhone || "{}")?.mobileNumber}</Typography>
                            <Typography><b>Website:</b> {client_view_direct_data?.vWebsite}</Typography>
                            <Typography><b>Client Number:</b> {client_view_direct_data?.vClientNumber}</Typography>
                            <Typography><b>Creation Date:</b> {dayjs(client_view_direct_data?.dtCreationDate).format("DD.MM.YYYY")}</Typography>
                            <Typography><b>Status:</b> {client_view_direct_data?.vStatus}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Address */}
                <Grid item xs={12} md={6}>
                    <Card className='boxshadow'>
                        <CardHeader title="Address" />
                        <CardContent>
                            {(() => {
                                const addressData = JSON.parse(client_view_direct_data?.address1Detail || "[]");
                                const getAddressValue = (id) => addressData.find(item => item.id === id)?.value || "N/A";
                                return (
                                    <>
                                        <Typography><b>City:</b> {getAddressValue("address1_locality")}</Typography>
                                        <Typography><b>State:</b> {getAddressValue("address1_administrative_area_level_1")}</Typography>
                                        <Typography><b>Country:</b> {getAddressValue("address1_country")}</Typography>
                                        <Typography><b>Zip Code:</b> {getAddressValue("address1_postal_code")}</Typography>
                                    </>
                                );
                            })()}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Login Details */}
                <Grid item xs={12} md={6}>
                    <Card className='boxshadow'>
                        <CardHeader title="Login Details" />
                        <CardContent>
                            <GenericTable columns={columns} data={data} showDelete={true} showAction={false} displayColumns={6} displayRows={10} />
                        </CardContent>
                    </Card>
                </Grid>

                {/* Memo */}
                <Grid item xs={12} md={6}>
                    <Card className='boxshadow'>
                        <CardHeader title="Memo" />
                        <CardContent>
                            <Typography>{client_view_direct_data?.tMemo}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Account Information */}
                <Grid item xs={12} md={6}>
                    <Card className='boxshadow'>
                        <CardHeader title="Account Information" />
                        <CardContent>
                            <Typography><b>Sales TAX ID:</b> {JSON.parse(client_payment_list?.vPaymentInfo || "{}")?.tax_id}</Typography>
                            <Typography><b>Accounting Notes:</b> {JSON.parse(client_payment_list?.vPaymentInfo || "{}")?.memos}</Typography>
                            <Typography><b>Tripletex Id:</b> {client_view_direct_data?.accounting_tripletex}</Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Contact Person */}
                <Grid item xs={12} md={6}>
                    <Card className='boxshadow'>
                        <CardHeader title="Contact Person" />
                        <CardContent>
                            <GenericTable columns={columns} data={data} showDelete={true} showAction={false} displayColumns={6} displayRows={10} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            {openForDelete && (
                <PopupModal
                    maxWidth={"sm"}
                    fullWidth={true}
                    open={openForDelete}
                    handleClose={() => setOpenForDelete(false)}
                    actions={
                        <Grid container columnGap={2} justifyContent={"end"}>
                            <Btn
                                onClick={() =>
                                    dispatch(DeleteClient({ id: id, img: "blank.png" })).then(() =>
                                        setOpenForDelete(false)
                                    )
                                }
                            >
                                Yes
                            </Btn>
                            <Btn onClick={() => setOpenForDelete(false)}>Cancel</Btn>
                        </Grid>
                    }
                    title={<Typography variant="h6">Delete Client</Typography>}
                >
                    <Typography>
                        Are you sure you want to delete the selected type?
                    </Typography>
                </PopupModal>
            )}
        </>
    );
};

export default ViewClient;
