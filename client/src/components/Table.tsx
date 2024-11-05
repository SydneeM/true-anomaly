import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

interface BasicSatInfo {
  id: number;
  name: string;
}
interface TableSatInfo extends BasicSatInfo {
  _id: string;
  command: string;
}

interface DataTableProps {
  rows: TableSatInfo[]
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Satellite ID', width: 200 },
  { field: 'name', headerName: 'Satellite Name', width: 200 },
  { field: 'command', headerName: 'Satellite Command', width: 200, editable: true }
];

const DataTable = (props: DataTableProps) => {
  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={props.rows}
        columns={columns}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}

export default DataTable