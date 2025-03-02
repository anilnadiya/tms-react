import { Avatar, Grid, Grid2, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Box, Divider, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Btn from "../../../Components/Ui_elements/Btn";
import { ClientInvoiceSetting } from "../../../redux/Thunk/ReportModule/ReportThunk";
import { Link } from "react-router-dom";

const ViewInvoice = () => {
    const { client_invoice_view, show_invoice_setting } = useSelector((state) => state.root.ReportModule);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(ClientInvoiceSetting())
    }, [])
    let phoneNumber = "";
    try {
        const phoneObj = JSON.parse(client_invoice_view?.companyPhone || "{}");
        phoneNumber = phoneObj?.mobileNumber || "";
    } catch (err) {
        phoneNumber = client_invoice_view?.companyPhone || "";
    }

    const bankInfo = client_invoice_view?.matchBankInfo || {};
    const scoop = client_invoice_view?.scoopData || {};
    const address = JSON.parse(client_invoice_view?.companyAddressDtl || "[]");

    const locality = address.find(item => item.id === "address1_locality")?.value || "";
    const postalCode = address.find(item => item.id === "address1_postal_code")?.value || "";
    const addressCountry = address.find(item => item.id === "address1_country")?.value || "";

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
                            {show_invoice_setting[0]?.company_name}
                            {show_invoice_setting[0]?.address1}, {show_invoice_setting[0]?.postcode} {show_invoice_setting[0]?.city}, {show_invoice_setting[0]?.country}
                        </Typography>
                    </Grid>
                    <Grid item>
                        {show_invoice_setting[0]?.logo_url && (
                            <img
                                src={show_invoice_setting[0]?.logo_url}
                                alt="Company Logo"
                                style={{ width: 110, height: 56, objectFit: "contain" }}
                            />
                        )}
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" fontWeight="bold">
                            {client_invoice_view?.clientCompanyName || ""}
                        </Typography>
                        <Typography variant="body2">
                            {client_invoice_view?.companyAddress || ""}
                        </Typography>
                        <Typography variant="body2">
                            {locality || ""}
                        </Typography>
                        <Typography variant="body2">
                            {postalCode || ""}
                        </Typography>
                        <Typography variant="body2">
                            {addressCountry || ""}
                        </Typography>
                    </Grid>
                </Grid>

                <TableContainer component={Paper} sx={{ mt: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#f5f5f5", fontWeight: "700" }}>
                                <TableCell>Contact</TableCell>
                                <TableCell>Telephone</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow >
                                <TableCell>{client_invoice_view?.sender_contact || ""}</TableCell>
                                <TableCell>{client_invoice_view?.sender_phone || ""}</TableCell>
                                <TableCell>{client_invoice_view?.sender_email || ""}</TableCell>
                                <TableCell>{client_invoice_view?.invoice_date?.split(" ")[0] || ""}</TableCell>

                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
                    Invoice # {client_invoice_view?.invoice_number}
                </Typography>

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
                            {scoop?.map((scoop, index) => (
                                <TableRow key={index}>
                                    <TableCell>{scoop?.orderNumber}-00{scoop?.item_number} | {scoop?.item_name}</TableCell>
                                    <TableCell>{scoop?.po_number}</TableCell>
                                    <TableCell>{scoop?.scoop_value || ""}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>
                <TableContainer component={Paper} sx={{ mt: 4 }}>
                    <Table sx={{ backgroundColor: "#f5f5f5" }}>
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Subtotal excl. TAX</b></TableCell>
                                <TableCell align="right"><b>{client_invoice_view?.item_total || ""}</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>0,00 % TAX</TableCell>
                                <TableCell align="right">{client_invoice_view?.vat || "00"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><b>Total Price</b></TableCell>
                                <TableCell align="right"><b> {(
                                    parseFloat(client_invoice_view?.item_total || 0) +
                                    parseFloat(client_invoice_view?.vat || 0)
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
                        Payment for this invoice is due by {client_invoice_view?.invoice_due_date}
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

                <Grid container spacing={2} mt={2} justifyContent="space-between">
                    {/* Company Address */}
                    <Grid item xs={4}>
                        <Typography variant="body2" fontWeight="bold">{show_invoice_setting[0].company_name}</Typography>
                        <Typography variant="body2">{show_invoice_setting[0].address1}</Typography>
                        <Typography variant="body2">{show_invoice_setting[0].postcode} {show_invoice_setting[0].city}</Typography>
                        <Typography variant="body2">{show_invoice_setting[0].country}</Typography>
                    </Grid>

                    {/* Contact Details */}
                    <Grid item xs={4}>
                        <Typography variant="body2">
                            Email: <Link href={`mailto:${show_invoice_setting[0].work_email}`} underline="hover">{show_invoice_setting[0].work_email}</Link>
                        </Typography>
                        <Typography variant="body2">
                            Web: <Link href={`https://${show_invoice_setting[0].web_address}`} target="_blank" rel="noopener" underline="hover">{show_invoice_setting[0].web_address}</Link>
                        </Typography>
                    </Grid>

                    {/* VAT Information */}
                    <Grid item xs={4} textAlign="right">
                        <Typography variant="body2" fontWeight="bold">VAT NUMBER:</Typography>
                        <Typography variant="body2">Foretaksregisteret:</Typography>
                        <Typography variant="body2">{show_invoice_setting[0].vat_number}</Typography>
                    </Grid>

                </Grid>
                <Typography variant="body2" textAlign="center" alignItems={"center"} mt={2}>&copy; {show_invoice_setting[0].copyright_text}</Typography>

                {/* Footer */}
                <Box textAlign="center" sx={{ mt: 4 }}>
                    <Typography variant="caption" display="block">
                        © 2025 Copyright
                    </Typography>
                </Box>
            </Paper>
        </>
    );
};

export default ViewInvoice;
