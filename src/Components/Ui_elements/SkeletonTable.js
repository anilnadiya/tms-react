import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Skeleton } from '@mui/material';

const SkeletonTable = ({displayColumns, displayRows}) => {
  // Adjust the number of rows and columns as per your actual table
  const rows = displayRows || 5;
  const columns = displayColumns || 5;

  return (
    <TableContainer  component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {Array.from(new Array(columns)).map((_, index) => (
              <TableCell key={index}>
                <Skeleton variant="text" />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from(new Array(rows)).map((_, rowIndex) => (
            <TableRow key={rowIndex}>
              {Array.from(new Array(columns)).map((_, colIndex) => (
                <TableCell key={colIndex}>
                  <Skeleton variant="rectangular" height={30} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SkeletonTable;
