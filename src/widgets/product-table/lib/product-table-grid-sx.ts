import type { SxProps, Theme } from "@mui/material/styles";

export const productTableGridSx: SxProps<Theme> = {
  border: "none",
  "& .MuiDataGrid-columnHeaders": {
    borderBottom: "1px solid #f0f0f0",
  },
  "& .MuiDataGrid-cell": {
    borderBottom: "1px solid #f0f0f0",
    alignItems: "center",
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    color: "#a0a5b9",
    fontWeight: 500,
    fontSize: "13px",
  },
  "& .MuiDataGrid-row.Mui-selected": {
    backgroundColor: "rgba(59, 78, 217, 0.06)",
    boxShadow: "inset 3px 0 0 #3B4ED9",
  },
  "& .MuiDataGrid-row.Mui-selected:hover": {
    backgroundColor: "rgba(59, 78, 217, 0.09)",
  },
  "& .MuiCheckbox-root.Mui-checked, & .MuiCheckbox-root.MuiCheckbox-indeterminate":
    {
      color: "#3B4ED9",
    },
};
