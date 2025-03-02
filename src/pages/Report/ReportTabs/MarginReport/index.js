import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MarginReportList } from '../../../../redux/Thunk/ReportModule/ReportThunk';
import { margin_report1 } from './StaticData';
import GenericTable from '../../../../Components/Ui_elements/GenericTable';


const MarginReport = () => {
    const { margin_report } = useSelector((state) => state.root.ReportModule);
    
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [order, setOrder] = useState({ column: "", dir: "asc" });
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(MarginReportList())
    },[])

    const data = margin_report1?.data?.map((item, index) => ({
        rowNumber: index + 1, // Explicitly add sequential numbers
        ...item,
      }));
    const columns = [
        {name: "rowNumber",label: "No.",},        
        { name: "companyCode", label: "Scoop" },
        { name: "poNumber", label: "Job Number" },
        { name: "job_due_date", label: "Due Date" },
        { name: "customerName", label: "Customer" },
        { name: "client_account_name", label: "Account" },
        { name: "resourceName", label: "Resource" },
        { name: "totalAmount", label: "Receivable" },
        { name: "", label: "Payable" },
        { name: "jobPrice", label: "Job Price" },
        { name: "profit_margin_percent_euro", label: "Margin Profit" },
        { name: "profit_euro", label: "Gross Profit" },
    ];
    
    const handleSearchChange = (searchText) => {
        console.log("Search changed:", searchText);
        setSearch(searchText);
        setPage(0);
    };

    const optionsProps = {
        serverSide: true,
        count: margin_report1?.recordsTotal || 0,
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
        search: true,
        download: false,
        print: false,
        filter: false,
        viewColumns: false,
        pagination: true,
        sort: true,
    };
    return (
        <>
            <GenericTable
                columns={columns}
                options={optionsProps}
                data={data || []}
                serverSide={true}
                count={margin_report1?.recordsTotal || 0}
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

export default MarginReport;