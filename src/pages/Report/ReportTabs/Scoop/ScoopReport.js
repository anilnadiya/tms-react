import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AllLanguages,
  ClientAccountList,
  ClientCompanysContactList,
  ClientsList,
  ScoopDetails,
  UserManager,
  WorkType,
} from '../../../../redux/Thunk/ClientModule/ClientThunk';
import { FilterScoopReport } from '../../../../redux/Thunk/ReportModule/ReportThunk';
import FormComponent from './Form';
import GenericTable from '../../../../Components/Ui_elements/GenericTable';
import { Grid } from '@mui/material';
import TextFieldComponent from '../../../../Components/TextFieldComponent';
import { debounce } from 'lodash';

const ScoopReport = () => {
  const { filterscoopReport } = useSelector((state) => state.root.ReportModule);

  const dispatch = useDispatch();
  const {
    company_client_contact,
    user_manager,
    work_type,
    clientAccount,
    scoop_detail,
    clients,
    all_languages,
  } = useSelector((state) => state.root.ClientModule);

  const { dropdownClient, currencyCode } = useSelector((state) => state.root.AdminModule);
  const [isTrue, setIsTrue] = useState(true);
  const initialState = {
    companyCode: '',
    pm_name: '',
    pm_name_exclude: '',
    emailSubject: '',
    itemPonumber: '',
    indirect_customer: '',
    itemStatus: '',
    projectType: '',
    customer: '',
    contactPerson: '',
    currency: '',
    sourceLanguage: '',
    targetLanguage: '',
    createDateFrom: '',
    createDateTo: '',
    itemDuedateStart: '',
    itemDuedateEnd: '',
  }
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [order, setOrder] = useState({ column: "", dir: "asc" });
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    dispatch(UserManager());
    dispatch(WorkType());
    dispatch(ClientAccountList());
    dispatch(ScoopDetails());
    dispatch(ClientsList());
    dispatch(AllLanguages());
  }, [dispatch]);

  useEffect(() => {
    fetchReports(page, pageSize, order, search);
  }, [page, pageSize, order, search]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // If 'customer' is selected, fetch contact list and enable contactPerson field
    if (name === 'customer') {
      if (value) {
        dispatch(ClientCompanysContactList(value));
        setIsTrue(false); // Enable contactPerson field
      } else {
        setIsTrue(true); // Disable if customer is cleared
      }
    }

    // Clear validation error for the changed field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const fetchReports = (page, pageSize, order, search) => {
    const payload = {
      draw: 2,
      filterParams: Object.fromEntries(
        Object.entries(formData).filter(([_, value]) => value !== "")
      ),
      length: pageSize,
      order: order.column ? [{ column: order.column, dir: order.dir }] : [],
      search: search || "",
      start: page * pageSize,
    };
    dispatch(FilterScoopReport(payload));
  };

  const businessUnitOptions = dropdownClient?.map((item) => {
    // Parse order_number JSON string safely
    let parsedOrderNumber;
    try {
      parsedOrderNumber = JSON.parse(item.order_number);
    } catch (error) {
      parsedOrderNumber = []; // Fallback to an empty array
    }
    // Ensure the value matches the format of stepperData.vCodeRights
    const value = parsedOrderNumber[0]?.value.replace(/_+$/, '') || '';

    return {
      label: item.name, // Display name in the dropdown
      value: value, // Use the cleaned value for comparison
    };
  });

  const handleReset = () => {
    setFormData(initialState);
    setSearchInput("");
    setSearch("");
    setPage(0);
    const payload = {
      draw: 2,
      filterParams: {},
      length: pageSize,
      order: order.column ? [{ column: order.column, dir: order.dir }] : [{ column: 0, dir: "asc" }],
      search: search || "",
      start: page * pageSize,
    };
    dispatch(FilterScoopReport(payload));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(0);
    fetchReports(0, pageSize, order, search);
  };

  const columns = [
    { name: "rowNumber", label: "No.", },
    {
      name: "orderNumber",
      label: "Order Number",
      options: {
        customBodyRender: (value, tableMeta) => {
          const orderId = tableMeta.rowData[3];
          return (
            <div
              style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
              onClick={() => console.log("Order ID:", orderId)}
            >
              {value}-00{tableMeta.rowData[2]}
            </div>
          );
        },
      },
    },
    { name: "item_number", label: "Item Number", options: { display: false } },
    { name: "orderId", label: "Order Id", options: { display: false } },
    { name: "scoopName", label: "Scoop Name" },
    { name: "emailSubject", label: "Email Subject" },
    { name: "contactName", label: "Client" },
    { name: "indirectAccountName", label: "Account" },
    { name: "scoop_status_name", label: "Status" },
    { name: "itemPonumber", label: "PO Number" },
    { name: "itemCreatedDate", label: "Create Date" },
    { name: "itemDuedate", label: "Due Date" },
    { name: "totalAmount", label: "Prices" },
    { name: "total_job_priceEUR", label: "Expense (EUR)" },
    { name: "", label: "Profit (EUR)" },
    { name: "", label: "Profit Margin" },
  ];
  const data = filterscoopReport?.data?.data?.map((item, index) => ({
    rowNumber: index + 1, // Explicitly add sequential numbers
    ...item,
  }));
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

  // Options to be passed down to the table
  const optionsProps = {
    serverSide: true,
    count: filterscoopReport?.recordsTotal || 0,
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
        dropdownClient={dropdownClient}
        currencyCode={currencyCode}
        user_manager={user_manager}
        company_client_contact={company_client_contact}
        work_type={work_type}
        clientAccount={clientAccount}
        scoop_detail={scoop_detail}
        clients={clients}
        isTrue={isTrue}
        all_languages={all_languages}
        businessUnitOptions={businessUnitOptions}
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
        count={filterscoopReport?.recordsTotal || 0}
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

export default ScoopReport;