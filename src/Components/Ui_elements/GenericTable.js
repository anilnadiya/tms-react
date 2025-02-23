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
  displayRows 
}) => {
  const { loading } = useSelector((state) => state.root.loading);

  // Conditionally add the "action" column if showAction is true
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

  const options = {
    selectableRows: "none",
    responsive: "standard",
    search: true,
    download: false,
    print: false,
    filter: false,
    viewColumns: false,
    pagination: true,
    rowsPerPage: 100, // Default rows per page
    rowsPerPageOptions: [10, 25, 50, 100], // Options for rows per page
  };
  

  return (
    <>
      {loading ? (
        <SkeletonTable displayColumns={displayColumns || 5} displayRows={displayRows || 10} />
      ) : (
        <MUIDataTable data={data} columns={enhancedColumns} options={options} />
      )}
    </>
  );
};

export default GenericTable;
