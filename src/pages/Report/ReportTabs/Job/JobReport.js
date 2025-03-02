import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import {
    ClientAccountList,
    ClientsList,
    JobStatusdetail,
    JobSummeryContact,
    JobSummeryResource,
    WorkType,
} from "../../../../redux/Thunk/ClientModule/ClientThunk";
import { FilterJobsReport } from "../../../../redux/Thunk/ReportModule/ReportThunk";
import FormComponent from "./Form";
import GenericTable from "../../../../Components/Ui_elements/GenericTable";
import TextFieldComponent from "../../../../Components/TextFieldComponent";
import { Grid } from "@mui/material";

const JobReport = () => {
    const dispatch = useDispatch();
    const {
        work_type,
        clientAccount,
        clients,
        job_summery_contact,
        job_summery_resource,
        job_status,
    } = useSelector((state) => state.root.ClientModule);

    const { dropdownClient, currencyCode } = useSelector(
        (state) => state.root.AdminModule
    );
    const { filterjobsReport } = useSelector((state) => state.root.ReportModule);

    const initialState = {
        account: "",
        companyCode: "",
        contactPerson: "",
        createDateFrom: "",
        createDateTo: "",
        currency: "",
        customer: "",
        endCreateDate: "",
        endItemDuedate: "",
        itemDuedate: "",
        itemDuedateEnd: "",
        itemDuedateStart: "",
        itemStatus: "",
        jobStatus: "",
        projectType: "",
        resource: "",
        startCreateDate: "",
    };

    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [order, setOrder] = useState({ column: "", dir: "asc" });

    // 1) 'searchInput' for the text field, 'search' for the actual query
    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");

    // Fetch dropdown data
    useEffect(() => {
        dispatch(WorkType());
        dispatch(ClientAccountList());
        dispatch(ClientsList());
        dispatch(JobSummeryContact());
        dispatch(JobSummeryResource());
        dispatch(JobStatusdetail());
    }, [dispatch]);

    useEffect(() => {
        fetchReports(page, pageSize, order, search);
    }, [page, pageSize, order, search]);

    //  Debounce logic: sets 'search' after 500ms of no typing
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

    const businessUnitOptions = dropdownClient?.map((item) => {
        let parsedOrderNumber;
        try {
            parsedOrderNumber = JSON.parse(item.order_number);
        } catch (error) {
            parsedOrderNumber = [];
        }
        const value = parsedOrderNumber[0]?.value?.replace(/_+$/, "") || "";
        return {
            label: item.name,
            value: value,
        };
    });

    const fetchReports = (page, pageSize, order, searchText) => {
        const payload = {
            draw: 2,
            filterParams: Object.fromEntries(
                Object.entries(formData).filter(([_, v]) => v !== "")
            ),
            length: pageSize,
            order: order.column ? [{ column: order.column, dir: order.dir }] : [],
            search: searchText || "",
            start: page * pageSize,
        };
        dispatch(FilterJobsReport(payload));
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

    const data = filterjobsReport?.data?.map((item, index) => ({
        rowNumber: index + 1,
        ...item,
    }));

    const handleReset = () => {
        setFormData(initialState);
        setSearchInput("");
        setSearch("");
        setPage(0);

        const payload = {
            draw: 2,
            filterParams: {},
            length: pageSize,
            order: order.column ? [{ column: order.column, dir: order.dir }] : [],
            search: "",
            start: 0,
        };
        dispatch(FilterJobsReport(payload));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchReports(0, pageSize, order, search);
        handleDebouncedSearch.flush();
    };

    const columns = [
        { name: "rowNumber", label: "No." },
        { name: "companyCode", label: "Job Details" },
        { name: "jobStatus", label: "Job Status" },
        { name: "contactPersonName", label: "Contact Person" },
        { name: "resourceName", label: "Resource" },
        { name: "customerName", label: "Customer" },
        { name: "client_account_name", label: "Account" },
        { name: "ItemLanguage", label: "Item Language" },
        { name: "jobPrice", label: "Job Price" },
        { name: "job_due_date", label: "Due Date" },
    ];

    // MUI Table options
    const optionsProps = {
        serverSide: true,
        count: filterjobsReport?.recordsTotal || 0,
        page,
        rowsPerPage: pageSize,
        rowsPerPageOptions: [10, 20, 50],
        onChangePage: (newPage) => setPage(newPage),
        onChangeRowsPerPage: (newSize) => setPageSize(newSize),
        onTableChange: (action, tableState) => {
            if (action === "search") {
                // If your GenericTable triggers a search action, handle it:
                handleSearchChange(tableState.searchText);
            }
            if (action === "sort") {
                setOrder((prevOrder) => {
                    if (prevOrder.column === tableState.activeColumn) {
                        return {
                            column: tableState.activeColumn,
                            dir: prevOrder.dir === "asc" ? "desc" : "asc",
                        };
                    }
                    return { column: tableState.activeColumn, dir: "asc" };
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
                currencyCode={currencyCode}
                work_type={work_type}
                clientAccount={clientAccount}
                clients={clients}
                businessUnitOptions={businessUnitOptions}
                job_summery_contact={job_summery_contact}
                job_summery_resource={job_summery_resource}
                job_status={job_status}
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
                count={filterjobsReport?.recordsTotal || 0}
                onPageChange={(newPage) => setPage(newPage)}
                onPageSizeChange={(newSize) => setPageSize(newSize)}
                // We rely on handleSearchChange for custom search:
                onSearchChange={handleSearchChange}
                order={order}
                displayColumns={columns?.length || 5}
                displayRows={10}
                showAction={false}
                setOrder={setOrder}
            />
        </>
    );
};

export default JobReport;
