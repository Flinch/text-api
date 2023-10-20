"use client";

import {
  DataGrid,
  GridColumnHeaderParams,
  type GridColDef,
} from "@mui/x-data-grid";
import { APIRequest } from "@prisma/client";
import { useTheme } from "next-themes";
import { createTheme, ThemeProvider } from "@mui/material";
import { FC } from "react";

interface TableProps {
  userRequests: ModifiedRequestType<"timestamp">[];
}

type ModifiedRequestType<K extends keyof APIRequest> = Omit<APIRequest, K> & {
  timestamp: string;
};

export const columnsDraft: GridColDef[] = [
  {
    field: "col1",
    headerName: "API key used",
    width: 300,
    renderHeader(params) {
      return (
        <strong className="font-semi-bold"> {params.colDef.headerName} </strong>
      );
    },
  },

  {
    field: "col2",
    headerName: "Path",
    width: 200,
  },
  {
    field: "col3",
    headerName: "Recency",
    width: 150,
  },
  {
    field: "col4",
    headerName: "Duration",
    width: 150,
  },
  {
    field: "col5",
    headerName: "Status",
    width: 150,
  },
];

const columns = columnsDraft.map((col) => {
  if (col.field === "col1") {
    return col;
  }

  return {
    ...col,
    renderHeader(params: GridColumnHeaderParams<any, any, any>) {
      return (
        <strong className="font-semi-bold"> {params.colDef.headerName} </strong>
      );
    },
  };
});

const Table: FC<TableProps> = ({ userRequests }) => {
  const { theme: applicationTheme } = useTheme();

  const darkTheme = createTheme({
    palette: {
      mode: applicationTheme === "light" ? "light" : "dark",
    },
  });

  const rows = userRequests.map((request) => ({
    id: request.id,
    col1: request.usedAPIKey,
    col2: request.path,
    col3: `${request.timestamp} ago`,
    col4: `${request.Duration} ms`,
    col5: request.status,
  }));

  return (
    <ThemeProvider theme={darkTheme}>
      <DataGrid
        style={{
          backgroundColor: applicationTheme === "light" ? "white" : "#152238",
          fontSize: "1rem",
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        autoHeight
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        columns={columns}
        rows={rows}
      />
    </ThemeProvider>
  );
};
export default Table;
