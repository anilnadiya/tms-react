import React, { useCallback, useEffect, useState } from 'react';
import FormComponent from './Form';
import { FilterInvoiceReport, SingleInvoiceView } from '../../../../redux/Thunk/ReportModule/ReportThunk';
import { useDispatch, useSelector } from 'react-redux';
import GenericTable from '../../../../Components/Ui_elements/GenericTable';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import TextFieldComponent from '../../../../Components/TextFieldComponent';
import { Grid } from '@mui/material';

const InvoiceReport = () => {
    const initialState = {
        InvoicePrice: "",
        createDateFrom: "",
        createDateTo: "",
        currency: "",
        customer: "",
        invoiceNumber: "",
        invoiceStatus: "",
        itemDuedateEnd: "",
        itemDuedateStart: "",
    };
    const { clients } = useSelector((state) => state.root.ClientModule);
    const { currencyCode } = useSelector((state) => state.root.AdminModule);
    const { filterInvoiceReport } = useSelector((state) => state.root.ReportModule);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [order, setOrder] = useState({ column: "", dir: "asc" });
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");
    useEffect(() => {
        fetchReports(page, pageSize, order, search);
    }, [page, pageSize, order, search]);

    const fetchReports = (page, pageSize, order, search) => {
        const filterParams = Object.fromEntries(
            Object.entries(formData).filter(([_, value]) => value !== "")
        );
       
            const payload = {
                draw: 2,
                filterParams,
                length: pageSize,
                order: order.column ? [{ column: order.column, dir: order.dir }] : [{ column: 0, dir: "asc" }],
                search: search || "",
                start: page * pageSize,
            };
            dispatch(FilterInvoiceReport(payload));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    const data = filterInvoiceReport?.data?.map((item, index) => ({
        rowNumber: index + 1, // Explicitly add sequential numbers
        ...item,
    }));

    const handleReset = () => {
        setFormData(initialState);
        setPage(0);
        setSearch(""); // Reset search term
        const payload = {
            draw: 1,
            filterParams: {},
            length: pageSize,
            order: order.column ? [{ column: order.column, dir: order.dir }] : [{ column: 0, dir: "asc" }],
            search: "",
            start: 0,
        };
        dispatch(FilterInvoiceReport(payload));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setPage(0);
        fetchReports(0, pageSize, order, search);
    };

    const columns = [
        { name: "rowNumber", label: "No.", },
        { name: "invoice_id", label: "invoice_id", options: { display: false } },
        {
            name: "invoice_number",
            label: "Invoice Number",
            options: {
                customBodyRender: (value, tableMeta) => {
                    const invoiceId = tableMeta.rowData[1];
                    return (
                        <button
                            style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}
                            onClick={() => handleInvoiceClick(invoiceId)}
                        >
                            {value}
                        </button>
                    );
                },
            },
        },
        { name: "clientCompanyName", label: "Company Name" },
        { name: "accounting_tripletex", label: "Tripletex ID" },
        { name: "Invoice_cost", label: "Price" },
        { name: "client_currency", label: "Currency" },
        { name: "invoice_due_date", label: "Invoice Due Date" },
        { name: "paid_date", label: "Payment Paid Date" },
        { name: "invoice_status", label: "Invoice Status" },
    ];
    const optionsProps = {
        serverSide: true,
        count: filterInvoiceReport?.recordsTotal || 0,
        page,
        rowsPerPage: pageSize,
        rowsPerPageOptions: [10, 20, 50],
        onChangePage: (newPage) => setPage(newPage),
        onChangeRowsPerPage: (newSize) => setPageSize(newSize),
        onTableChange: (action, tableState) => {
            if (action === 'sort') {
                setOrder((prevOrder) => {
                    // If the same column is clicked, toggle the sort direction
                    if (prevOrder.column === tableState.activeColumn) {
                        return {
                            column: tableState.activeColumn,
                            dir: prevOrder.dir === "asc" ? "desc" : "asc",
                        };
                    }
                    // For a new column, default to ascending order
                    return {
                        column: tableState.activeColumn,
                        dir: "asc",
                    };
                });
            }
        },

        selectableRows: "none",
        responsive: "standard",
        search: false,
        download: false,
        print: false,
        filter: false,
        viewColumns: false,
        pagination: true,
        sort: true,
    };

    const handleDebouncedSearch = useCallback(
        debounce((value) => {
            setSearch(value);
            setPage(0); // Reset to first page when new search begins
        }, 500),
        []
    );

    // Cleanup debounce on unmount
    useEffect(() => {
        return () => {
            handleDebouncedSearch.cancel();
        };
    }, [handleDebouncedSearch]);

    // Each keystroke updates local 'searchInput' + calls the debounced function
    const handleSearchChange = (value) => {
        setSearchInput(value);      // update text field immediately
        handleDebouncedSearch(value); // actual server search is debounced
    };
    const handleInvoiceClick = (invoiceId) => {
        dispatch(SingleInvoiceView(invoiceId))
        navigate(`/viewinvoice/${invoiceId}`)
    };
    return (
        <>
            <FormComponent
                formData={formData}
                errors={errors}
                handleInputChange={handleInputChange}
                handleReset={handleReset}
                handleSubmit={handleSubmit}
                currencyCode={currencyCode}
                clients={clients}
            />
            {/* Debounced Search Field */}
            <Grid container alignItems="center" justifyContent="flex-end" spacing={2}>
                <Grid item sm={3} xs={12}>
                    <TextFieldComponent
                        type="text"
                        name="search"
                        placeholder="Search..."
                        value={searchInput}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        isNotMandatory={true}
                    />
                </Grid>
            </Grid>
            <GenericTable
                columns={columns}
                options={optionsProps}
                data={data || []}
                serverSide={true}
                count={filterInvoiceReport?.recordsTotal || 0}
                onPageChange={(newPage) => setPage(newPage)}
                onPageSizeChange={(newSize) => setPageSize(newSize)}
                onSearchChange={handleSearchChange}
                order={order}  // Pass current sort order to GenericTable
                displayColumns={columns?.length || 5}
                displayRows={10}
                showAction={false}
                setOrder={setOrder}
            />
        </>
    );
};

export default InvoiceReport;

