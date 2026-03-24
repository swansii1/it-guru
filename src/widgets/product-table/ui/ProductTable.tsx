import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router";

import { useProducts } from "@/entities/product/lib/use-products";
import { useDebouncedValue } from "@/shared/lib/useDebouncedValue";
import { getProductColumns } from "../lib/get-product-columns";
import { AddProductModal } from "./AddProductModal";
import { ProductTableFooter } from "./ProductTableFooter";
import { ProductTableGrid } from "./ProductTableGrid";
import { ProductTableHeader } from "./ProductTableHeader";
import { ProductTableToolbar } from "./ProductTableToolbar";

import style from "./ProductTable.module.css";
import type { GridSortModel } from "@mui/x-data-grid";

export const ProductTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const search = searchParams.get("q") || "";
  const page = Number(searchParams.get("page")) || 1;
  const sortBy = searchParams.get("sortBy") || undefined;
  const order = (searchParams.get("order") as "asc" | "desc") || undefined;
  const pageSize = 10;

  const [rawSearch, setRawSearch] = useState(search);
  const debouncedSearch = useDebouncedValue(rawSearch, 500);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (debouncedSearch === (searchParams.get("q") || "")) {
      return;
    }

    const params = new URLSearchParams(searchParams);
    if (debouncedSearch) {
      params.set("q", debouncedSearch);
      params.set("page", "1");
    } else {
      params.delete("q");
      params.set("page", "1");
    }
    setSearchParams(params, { replace: true });
  }, [debouncedSearch]);

  const { data, isLoading, isFetching, refetch } = useProducts({
    page,
    limit: pageSize,
    search,
    sortBy,
    order,
  });

  const columns = useMemo(() => getProductColumns(style), []);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", (newPage + 1).toString());
    setSearchParams(params);
  };

  const handleSortChange = (model: GridSortModel) => {
    const params = new URLSearchParams(searchParams);

    if (model.length > 0) {
      const { field, sort } = model[0];
      params.set("sortBy", field);
      params.set("order", sort || "asc");
    } else {
      params.delete("sortBy");
      params.delete("order");
    }

    setSearchParams(params);
  };
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
          loading={isLoading || isFetching}
          sortModel={sortBy ? [{ field: sortBy, sort: order }] : []}
          onSortModelChange={handleSortChange}
        />

        <ProductTableFooter
          page={page - 1}
          pageSize={pageSize}
          total={data?.total || 0}
          onPageChange={handlePageChange}
        />
      </div>

      <AddProductModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
