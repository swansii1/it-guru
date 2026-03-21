import { create } from "zustand";
import type { GridSortModel } from "@mui/x-data-grid";

interface TableState {
  search: string;
  sortModel: GridSortModel;
  paginationModel: { page: number; pageSize: number };
  setSearch: (search: string) => void;
  setSortModel: (model: GridSortModel) => void;
  setPaginationModel: (model: { page: number; pageSize: number }) => void;
}

export const useTableStore = create<TableState>((set) => ({
  search: "",
  sortModel: [],
  paginationModel: { page: 0, pageSize: 10 },
  setSearch: (search) =>
    set({ search, paginationModel: { page: 0, pageSize: 10 } }), // Сброс на 1 страницу при поиске
  setSortModel: (sortModel) => set({ sortModel }),
  setPaginationModel: (paginationModel) => set({ paginationModel }),
}));
