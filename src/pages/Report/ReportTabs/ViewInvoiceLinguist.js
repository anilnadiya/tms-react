import { Avatar, Grid, Grid2, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Box, Divider, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Btn from "../../../Components/Ui_elements/Btn";
import { ClientInvoiceSetting } from "../../../redux/Thunk/ReportModule/ReportThunk";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const ViewInvoiceLinguist = () => {
    const { linguist_invoice_view, show_invoice_setting } = useSelector((state) => state.root.ReportModule);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(ClientInvoiceSetting())
    }, [])

    const bankInfo = linguist_invoice_view[0]?.matchBankInfo || {};
    const freeLanceAddress = JSON.parse(linguist_invoice_view[0]?.freelanceAddressDetail || "[]");
    const freelanceCountry = freeLanceAddress.find(item => item.id === "address1_country")?.value || "";
    const freelanceLocality = freeLanceAddress.find(item => item.id === "address1_locality")?.value || "";
    const freelancePostalCode = freeLanceAddress.find(item => item.id === "address1_postal_code")?.value || "";


    return (
        <>
            <Grid2 container justifyContent="end" gap={2} >
                <Btn onClick={() => window.history.back()}>Back</Btn>
                <Btn >Download</Btn>
                <Btn >invoice</Btn>
                <Btn >Credit Notes</Btn>
            </Grid2>
            <Paper elevation={2} sx={{ p: 3, maxWidth: 900, margin: "auto" }}>
                <Grid container alignItems="center" spacing={2}>
                    <Grid item xs>
                        <Typography variant="body2">
                            {linguist_invoice_view[0]?.freelanceAddress}
                        </Typography>
                        <Typography variant="body2">
                            {freelancePostalCode}{" "}
                            {freelanceLocality},
                            {freelanceCountry}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={4}>
                    <Grid item xs={12} sm={6}>
                        <Typography sx={{ fontWeight: "bold" }} variant="body1">{show_invoice_setting[0]?.company_name}</Typography>
                        <Typography variant="body2">{show_invoice_setting[0]?.address1}</Typography>
                        <Typography variant="body2">{show_invoice_setting[0]?.postcode} {show_invoice_setting[0]?.city}</Typography>
                        <Typography variant="body2">{show_invoice_setting[0]?.country}</Typography>
                        <Typography variant="body2">{show_invoice_setting[0]?.vat_number}</Typography>
                    </Grid>
                </Grid>
                <Grid container mt={4} alignItems="center" justifyContent={'flex-start'}>
                    <Grid item xs={12} sm={4}>
                        <Typography sx={{ fontWeight: "bold" }} variant="body2">Invoice Date</Typography>
                        <Typography variant="body2">
                            {dayjs(linguist_invoice_view[0]?.invoice_date).format('DD.MM.YYYY')}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography sx={{ fontWeight: "bold" }} variant="body2">Company Name</Typography>
                        <Typography variant="body2">
                            {linguist_invoice_view[0]?.companyName}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography sx={{ fontWeight: "bold" }} variant="body2">Due Date</Typography>
                        <Typography variant="body2">
                            {dayjs(linguist_invoice_view[0]?.inv_due_date).format('DD.MM.YYYY')}
                        </Typography>
                    </Grid>
                </Grid>

                <Typography variant="body1" fontWeight="bold" sx={{ mt: 2 }}>
                    Invoice # {linguist_invoice_view[0]?.custom_invoice_no}
                </Typography>

                <TableContainer component={Paper} sx={{ mt: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#f5f5f5", fontWeight: "700" }}>
                                <TableCell>Job Description</TableCell>
                                <TableCell>Amount in EUR</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                linguist_invoice_view.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item?.poNumber || ""} | {item?.item_name}</TableCell>
                                        <TableCell>{item?.price_per_job}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            
                <TableContainer component={Paper} sx={{ mt: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#f5f5f5", fontWeight: "700" }}>
                                <TableCell>Project</TableCell>
                                <TableCell>PO Number</TableCell>
                                <TableCell>Price in EUR</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* {scoop?.map((scoop, index) => (
                                <TableRow key={index}>
                                    <TableCell>{scoop?.orderNumber}-00{scoop?.item_number} | {scoop?.item_name}</TableCell>
                                    <TableCell>{scoop?.po_number}</TableCell>
                                    <TableCell>{scoop?.scoop_value || ""}</TableCell>
                                </TableRow>
                            ))} */}
                        </TableBody>

                    </Table>
                </TableContainer>
                <TableContainer component={Paper} sx={{ mt: 4 }}>
                    <Table sx={{ backgroundColor: "#f5f5f5" }}>
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Subtotal excl. TAX</b></TableCell>
                                <TableCell align="right"><b>{linguist_invoice_view[0]?.item_total || ""}</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>0,00 % TAX</TableCell>
                                <TableCell align="right">{linguist_invoice_view[0]?.vat || "00"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><b>Total Price</b></TableCell>
                                <TableCell align="right"><b> {(
                                    parseFloat(linguist_invoice_view[0]?.item_total || 0) +
                                    parseFloat(linguist_invoice_view[0]?.vat || 0)
                                ).toFixed(2)}</b></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Notes Section */}
                <Box sx={{ mt: 2 }}>
                    <Typography variant="body1" gutterBottom>
                        <strong>Notes:</strong>
                    </Typography>
                    <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                        Payment for this invoice is due by {dayjs(linguist_invoice_view[0]?.inv_due_date).format('DD.MM.YYYY')}
                    </Typography>
                </Box>

                {/* Bank / Payment Info */}
                <Box sx={{ mt: 2 }}>
                    <Typography variant="body1" gutterBottom>
                        <strong>Payment Details:</strong>
                    </Typography>
                    <Typography variant="body2">
                        <span>Bank Name:</span> {bankInfo?.bank_name || ""}
                    </Typography>
                    <Typography variant="body2">
                        <span>Bank Address:</span> {bankInfo?.address || ""}
                    </Typography>
                    <Typography variant="body2">
                        <span>Bank Holder:</span> {bankInfo?.holder_name || ""}
                    </Typography>
                    <Typography variant="body2">
                        <span>IBAN:</span> {bankInfo?.iban || ""}
                    </Typography>
                    <Typography variant="body2">
                        <span>SWIFT/BIC:</span> {bankInfo?.swift_bic || ""}
                    </Typography>
                </Box>
                <Divider sx={{ my: 4, borderBottomWidth: 2, borderImageSource: "linear-gradient(to right, red, blue, green)", borderImageSlice: 1 }} />

                <Grid container spacing={2} mt={2} justifyContent="space-between" >
                    {/* Company Address */}
                    <Grid item xs={4}>
                        <Typography variant="body2" fontWeight="bold">{linguist_invoice_view[0].freelanceName}</Typography>
                        <Typography variant="body2">
                            {linguist_invoice_view[0]?.freelanceAddress}
                        </Typography>
                        <Typography variant="body2">
                            {freelancePostalCode}{" "}
                            {freelanceLocality},
                            {freelanceCountry}
                        </Typography>
                    </Grid>

                    {/* Contact Details */}
                    <Grid item xs={4}>
                        <Typography variant="body2">
                            Email: <Link href={`mailto:${linguist_invoice_view[0].freelanceEmail}`} underline="hover">{linguist_invoice_view[0].freelanceEmail}</Link>
                        </Typography>
                    </Grid>

                    {/* VAT Information */}
                    <Grid item xs={4} textAlign="right">
                        <Typography variant="body2" fontWeight="bold">VAT NUMBER:</Typography>
                        <Typography variant="body2">Foretaksregisteret:</Typography>
                        <Typography variant="body2">{linguist_invoice_view[0].vat_number}</Typography>
                    </Grid>

                </Grid>
            </Paper>
        </>
    );
};

export default ViewInvoiceLinguist;
