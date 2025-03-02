// import React from "react";
// import MUIDataTable from "mui-datatables";
// import IconButton from "@mui/material/IconButton";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import SkeletonTable from "./SkeletonTable";
// import { useSelector } from "react-redux";

// const GenericTable = ({ 
//   columns, 
//   data, 
//   onEdit, 
//   onDelete, 
//   showDelete = true, 
//   showAction = true, 
//   displayColumns, 
//   displayRows,
//   serverSide = false,  // Enable or disable server-side pagination
//   count = 0,  // Total number of records (for server-side pagination)
//   onPageChange = () => {}, // Function to handle page change for server-side
//   onPageSizeChange = () => {}, // Function to handle page size change
//   optionsProps
// }) => {
//   const { loading } = useSelector((state) => state.root.loading);

//   // Conditionally add the "action" column if showAction is true
//   const enhancedColumns = showAction
//     ? [
//         ...columns,
//         {
//           name: "action",
//           label: "Action",
//           options: {
//             customBodyRender: (value, tableMeta) => (
//               <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//                 <IconButton onClick={() => onEdit(tableMeta.rowData)}>
//                   <EditIcon />
//                 </IconButton>
//                 {showDelete && (
//                   <IconButton onClick={() => onDelete(tableMeta.rowData[1])} color="error">
//                     <DeleteIcon />
//                   </IconButton>
//                 )}
//               </div>
//             ),
//             setCellProps: () => ({ style: { width: "120px" } }),
//             setCellHeaderProps: () => ({ style: { width: "120px" } }),
//           },
//         },
//       ]
//     : columns;

//   // MUI Table options
//   const options = {
//     selectableRows: "none",
//     responsive: "standard",
//     search: true,
//     download: false,
//     print: false,
//     filter: false,
//     viewColumns: false,
//     pagination: true,
//     rowsPerPage: 100, 
//     rowsPerPageOptions: [10, 25, 50, 100], 
//     serverSide: serverSide,  // Enable server-side pagination when needed
//     count: serverSide ? count : data.length, // Use count prop for total records in server-side mode
//     onTableChange: (action, tableState) => {
//       if (serverSide) {
//         if (action === "changePage") {
//           onPageChange(tableState.page + 1); // Send 1-based page index
//         }
//         if (action === "changeRowsPerPage") {
//           onPageSizeChange(tableState.rowsPerPage);
//         }
//       }
//     }
//   };

//   return (
//     <>
//       {loading ? (
//         <SkeletonTable displayColumns={displayColumns || 5} displayRows={displayRows || 10} />
//       ) : (
//         <MUIDataTable data={data} columns={enhancedColumns} options={optionsProps ? optionsProps : options} />
//       )}
//     </>
//   );
// };

// export default GenericTable;






import React from "react";
import MUIDataTable from "mui-datatables";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SkeletonTable from "./SkeletonTable";
import { useSelector } from "react-redux";

const GenericTable = ({
  columns,
  data,
  onEdit,
  onDelete,
  showDelete = true,
  showAction = true,
  displayColumns,
  displayRows,
  serverSide = false,
  count = 0,
  onPageChange = () => { },
  onPageSizeChange = () => { },
  onSearchChange = () => { },
  options, 
  order, 
  setOrder
}) => {
  const { loading } = useSelector((state) => state.root.loading);

  const enhancedColumns = showAction
    ? [
      ...columns,
      {
        name: "action",
        label: "Action",
        options: {
          customBodyRender: (value, tableMeta) => (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <IconButton onClick={() => onEdit(tableMeta.rowData)}>
                <EditIcon />
              </IconButton>
              {showDelete && (
                <IconButton onClick={() => onDelete(tableMeta.rowData[1])} color="error">
                  <DeleteIcon />
                </IconButton>
              )}
            </div>
          ),
          setCellProps: () => ({ style: { width: "120px" } }),
          setCellHeaderProps: () => ({ style: { width: "120px" } }),
        },
      },
    ]
    : columns;

  const tableOptions = {
    selectableRows: "none",
    responsive: "standard",
    search: true,
    download: false,
    print: false,
    filter: false,
    viewColumns: false,
    pagination: true,
    sort: true, 
    sortOrder: order && order.column ? { name: order.column, direction: order.dir } : {},
    rowsPerPage: options?.rowsPerPage || 10,
    rowsPerPageOptions: options?.rowsPerPageOptions || [10, 25, 50, 100],
    serverSide: serverSide,
    count: serverSide ? count : data.length,
    onTableChange: (action, tableState) => {
      if (serverSide) {
        switch (action) {
          case "changePage":
            if (typeof tableState.page !== "undefined") {
              onPageChange(tableState.page);
            }
            break;

          case "changeRowsPerPage":
            if (typeof tableState.rowsPerPage !== "undefined") {
              onPageSizeChange(tableState.rowsPerPage);
            }
            break;

          case "search":
            if (typeof tableState.searchText !== "undefined") {
              onSearchChange(tableState.searchText);
            }
            break;

          default:
            break;
        }
      }
    },
  };

  return (
    <>
      {loading ? (
        <SkeletonTable displayColumns={displayColumns || 5} displayRows={displayRows || 10} />
      ) : (
        <MUIDataTable data={data} columns={enhancedColumns} options={options? options : tableOptions} />
      )}
    </>
  );
};

export default GenericTable;
