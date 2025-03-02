import React, { useCallback, useEffect, useState } from 'react';
import FormComponent from './Form';
import { useDispatch, useSelector } from 'react-redux';
import { SortAlphabetically } from '../../../../Helper/SortAlphbetically';
import { FilterLinguistReport, SingleInvoiceViewLinguist } from '../../../../redux/Thunk/ReportModule/ReportThunk';
import { JobSummeryResource } from '../../../../redux/Thunk/ClientModule/ClientThunk';
import GenericTable from '../../../../Components/Ui_elements/GenericTable';
import Btn from '../../../../Components/Ui_elements/Btn';
import { Grid } from '@mui/material';
import TextFieldComponent from '../../../../Components/TextFieldComponent';
import { debounce } from 'lodash';
import { useNavigate } from 'react-router-dom';

const LinguistReport = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { job_summery_resource, } = useSelector((state) => state.root.ClientModule);
    const { filterLinguistReport } = useSelector((state) => state.root.ReportModule);

    const initialState = {
        createDateFrom: "",
        endCreateDate: "",
        endItemDuedate: "",
        endPaymentDate: "",
        freelanceName: "",
        invoiceStatus: "",
        itemDuedate: "",
        itemDuedateEnd: "",
        itemDuedateStart: "",
        paymentDateFrom: "",
        paymentDateTo: "",
        startCreateDate: "",
        startPaymentDate: "",
        createDateTo: "",
    };

    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [order, setOrder] = useState({ column: "", dir: "asc" });
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");


    useEffect(() => {
        dispatch(JobSummeryResource())
    }, [])

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
                order: order.column ? [{ column: order.column, dir: order.dir }] : [],
                search: search || "",
                start: page * pageSize,
            };
            dispatch(FilterLinguistReport(payload));
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

    const sortedData = SortAlphabetically(filterLinguistReport?.data || [], "companyCode");
    const data = sortedData?.map((item, index) => ({
        rowNumber: index + 1, // Explicitly add sequential numbers
        ...item,
    }));

    const handleReset = () => {
        setFormData(initialState);
        setPage(0);
        setSearch(""); // Reset search term
        setSearchInput("");
        const payload = {
            draw: 2,
            filterParams: {},
            length: pageSize,
            order: order.column ? [{ column: order.column, dir: order.dir }] : [],
            search: "",
            start: 0,
        };
        dispatch(FilterLinguistReport(payload));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setPage(0);
        fetchReports(0, pageSize, order, search);

    };
    const handleInvoiceClick = (invoiceId) => {
        dispatch(SingleInvoiceViewLinguist(invoiceId))
        navigate(`/viewinvoicelinguist/${invoiceId}`)
    };

    const handleButtonClick = (freelanceId) => {
        navigate(`/viewExternal/${freelanceId}`);
        console.log('clickedId: ', freelanceId);
    }
    const columns = [
        { name: "rowNumber", label: "No.", },
        { name: "invoice_id", label: "invoice_id", options: { display: false } },
        { name: "freelanceId", label: "freelanceId", options: { display: false } },
        { name: "org_invoice_number", label: "Invoice Number",
            options: {
                customBodyRender: (value, tableMeta) => {
                    const invoiceId = tableMeta.rowData[1];
                    return (
                        <div
                            style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}
                            onClick={() => handleInvoiceClick(invoiceId)}
                        >
                            {value}
                        </div>
                    );
                },
            },
         },
        {
            name: "freelanceName", label: "Resource",
                options: {
                customBodyRender: (value, tableMeta) => {
                    const freelanceId = tableMeta.rowData[2];
                    return (
                        <div style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}
                        onClick={() => handleButtonClick(freelanceId)}>{value}</div>
                    );
                },
            },
        },
        { name: "Invoice_cost", label: "Amount" },
        { name: "freelance_currency", label: "Currency" },
        { name: "custom_invoice_no", label: "Custom Invoice Number" },
        { name: "invoice_date", label: "Invoice Date" },
        { name: "inv_due_date", label: "Invoice Due Date" },
        { name: "paid_date", label: "Payment Paid Date" },
        { name: "invoice_status", label: "Invoice Status" },
    ];

    const optionsProps = {
        serverSide: true,
        count: filterLinguistReport?.recordsTotal || 0,
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


    return (
        <>
            <FormComponent
                formData={formData}
                errors={errors}
                handleInputChange={handleInputChange}
                handleReset={handleReset}
                handleSubmit={handleSubmit}
                job_summery_resource={job_summery_resource}
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
                count={filterLinguistReport?.recordsTotal || 0}
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

export default LinguistReport;