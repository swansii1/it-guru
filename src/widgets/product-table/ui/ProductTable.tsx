import { useEffect, useMemo, useState } from "react";

import { useProducts } from "@/entities/product/lib/use-products";
import { useDebouncedValue } from "@/shared/lib/useDebouncedValue";
import { getProductColumns } from "../lib/get-product-columns";
import { useTableStore } from "./model/store";
import { AddProductModal } from "./AddProductModal";
import { ProductTableFooter } from "./ProductTableFooter";
import { ProductTableGrid } from "./ProductTableGrid";
import { ProductTableHeader } from "./ProductTableHeader";
import { ProductTableToolbar } from "./ProductTableToolbar";

import style from "./ProductTable.module.css";

export const ProductTable = () => {
  const {
    search,
    setSearch,
    sortModel,
    setSortModel,
    paginationModel,
    setPaginationModel,
  } = useTableStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [rawSearch, setRawSearch] = useState(search);
  const debouncedSearch = useDebouncedValue(rawSearch, 500);

  useEffect(() => {
    setRawSearch(search);
  }, [search]);

  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);

  const { data, isLoading, isFetching, refetch } = useProducts({
    page: paginationModel.page + 1,
    limit: paginationModel.pageSize,
    search,
    sortBy: sortModel[0]?.field,
    order: sortModel[0]?.sort as "asc" | "desc",
  });

  const columns = useMemo(() => getProductColumns(style), []);

  return (
    <div className={style.page_wrapper}>
      <ProductTableHeader
        rawSearch={rawSearch}
        onRawSearchChange={setRawSearch}
      />

      <div className={style.table_card}>
        <ProductTableToolbar
          onRefetch={() => refetch()}
          isFetching={isFetching}
          onAddClick={() => setIsModalOpen(true)}
        />

        <ProductTableGrid
          rows={data?.products || []}
          columns={columns}
          loading={isLoading}
          sortModel={sortModel}
          onSortModelChange={setSortModel}
        />

        <ProductTableFooter
          page={paginationModel.page}
          pageSize={paginationModel.pageSize}
          total={data?.total || 0}
          onPageChange={(page) =>
            setPaginationModel({ ...paginationModel, page })
          }
        />
      </div>

      <AddProductModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
