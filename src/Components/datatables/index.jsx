import MUIDataTable from "mui-datatables";
import { useSelector } from "react-redux";
import SkeletonTable from "../Ui_elements/SkeletonTable";

const DataTables = ({
  title,
  columns,
  datas,
  options,
  displayColumns,
  displayRows,
}) => {
  const { loading } = useSelector((state) => state.root.loading);

  const resolvedOptions = {
    ...{
      rowsPerPage: 50,
      rowsPerPageOptions: [10, 20, 50, 100, 200],
      print: false,
      filter: false,
      download: false,
      viewColumns: false,
      selectableRows: "none",
      resizableColumns: false,
      search: false,
      selectableRowsHideCheckboxes: true,
      draggableColumns: {
        enabled: true,
      },
    },
    ...options,
  };
  return loading ? (
    <SkeletonTable
      displayColumns={displayColumns || 5}
      displayRows={displayRows || 10}
    />
  ) : (
    <MUIDataTable
      title={title}
      data={datas}
      columns={columns}
      options={resolvedOptions}
    />
  );
};

export default DataTables;
