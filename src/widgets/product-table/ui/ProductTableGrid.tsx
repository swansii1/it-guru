import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { GridSortModel } from "@mui/x-data-grid";

import { productTableGridSx } from "../lib/product-table-grid-sx";

import style from "./ProductTable.module.css";

type Props = {
  rows: unknown[];
  columns: GridColDef[];
  loading: boolean;
  sortModel: GridSortModel;
  onSortModelChange: (model: GridSortModel) => void;
};
const CustomNoRowsOverlay = () => (
  <div className={style.customOwerlay}>
    <span style={{ fontSize: "3rem" }}>😔</span>
    <p>Товары не найдены.</p>
  </div>
);

export function ProductTableGrid({
  rows,
  columns,
  loading,
  sortModel,
  onSortModelChange,
}: Props) {
  return (
    <div className={style.grid_container}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        hideFooter
        sortingMode="server"
        sortModel={sortModel}
        onSortModelChange={onSortModelChange}
        checkboxSelection
        disableRowSelectionOnClick
        sx={productTableGridSx}
        slots={{ noRowsOverlay: CustomNoRowsOverlay }}
      />
    </div>
  );
}
