import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Box,
  Typography,
} from "@mui/material";

const DynamicTable = ({
  columns,
  data,
  rowsPerPageOptions = [5, 10, 25, 50, 100],
  defaultRowsPerPage = 5,
  page,
  setPage,
}) => {
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const startEntry = page * rowsPerPage + 1;
  const endEntry = Math.min((page + 1) * rowsPerPage, data.length);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper
      sx={{
        padding: "16px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#3f51b5" }}>
              {columns.map((column) => (
                <TableCell
                  key={column.field}
                  sx={{ color: "#fff", fontWeight: "bold" }}
                >
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  style={{
                    backgroundColor: rowIndex % 2 === 0 ? "#f5f5f5" : "#ffffff",
                  }}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.field}
                      style={
                        column.render
                          ? column.render(row[column.field])
                          : { padding: "12px", borderBottom: "1px solid #ddd" }
                      }
                    >
                      {column.format ? (
                        column.format(row[column.field], row)
                      ) : column.render ? (
                        <span style={column.render(row[column.field])}>
                          {row[column.field]}
                        </span>
                      ) : (
                        row[column.field]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="10px"
      >
        <Typography variant="body2">
          Showing {startEntry} to {endEntry} of {data.length} entries
        </Typography>
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Rows per page:"
        />
      </Box>
    </Paper>
  );
};

export default DynamicTable;
