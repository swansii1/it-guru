import { useEffect, useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import {
  Button,
  Input,
  Modal,
  Form,
  message,
  Space,
  Typography,
  Avatar,
  Pagination,
} from "antd";
import {
  ReloadOutlined,
  PlusOutlined,
  MoreOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useProducts } from "@/entities/product/lib/use-products";
import { useDebouncedValue } from "@/shared/lib/useDebouncedValue";
import { useTableStore } from "./model/store";

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

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Наименование",
      flex: 1,
      minWidth: 250,
      renderCell: (params) => (
        <Space>
          <Avatar shape="square" size={40} src={params.row.thumbnail} />
          <div className={style.name_container}>
            <span className={style.name}>{params.row.title}</span>
            <span className={style.name_categories}>{params.row.category}</span>
          </div>
        </Space>
      ),
    },
    {
      field: "brand",
      headerName: "Вендор",
      width: 150,
      renderCell: (p) => <strong>{p.value}</strong>,
    },
    {
      field: "sku",
      headerName: "Артикул",
      width: 130,
      valueGetter: (_, row) => `RCH${row.id}Q1A`,
    },
    {
      field: "rating",
      headerName: "Оценка",
      width: 100,
      renderCell: (params) => (
        <span style={{ color: params.value < 3.5 ? "#ff4d4f" : "#1a1a1a" }}>
          {params.value}/5
        </span>
      ),
    },
    {
      field: "price",
      headerName: "Цена, ₽",
      width: 150,
      renderCell: (params) => {
        const formatted = params.value
          ?.toLocaleString("ru-RU")
          .replace(/\u00A0/g, " ");
        return (
          <span className={style.price_main}>
            {formatted}
            <span className={style.price_cents}>, 00</span>
          </span>
        );
      },
    },
    {
      field: "actions",
      headerName: "",
      width: 100,
      sortable: false,
      renderCell: () => (
        <Space size="middle">
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            size="small"
            className={style.btn_action_add}
          />
          <MoreOutlined className={style.icon_more} />
        </Space>
      ),
    },
  ];

  return (
    <div className={style.page_wrapper}>
      <div className={style.header_panel}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          Товары
        </Typography.Title>
        <Input
          placeholder="Найти"
          value={rawSearch}
          prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
          className={style.search_input}
          onChange={(e) => setRawSearch(e.target.value)}
          allowClear
        />
        <div style={{ width: 40 }} />
      </div>

      <div className={style.table_card}>
        <div className={style.table_header}>
          <span className={style.table_title}>Все позиции</span>
          <Space>
            <Button
              icon={<ReloadOutlined />}
              onClick={() => refetch()}
              loading={isFetching}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsModalOpen(true)}
              className={style.btn_add}
            >
              Добавить
            </Button>
          </Space>
        </div>

        <div className={style.grid_container}>
          <DataGrid
            rows={data?.products || []}
            columns={columns}
            loading={isLoading}
            hideFooter
            sortingMode="server"
            sortModel={sortModel}
            onSortModelChange={setSortModel}
            disableRowSelectionOnClick
            sx={{
              border: "none",
              "& .MuiDataGrid-columnHeaders": {
                borderBottom: "1px solid #f0f0f0",
              },
              "& .MuiDataGrid-cell": { borderBottom: "1px solid #f0f0f0" },
              "& .MuiDataGrid-columnHeaderTitle": {
                color: "#bfbfbf",
                fontWeight: 500,
              },
            }}
          />
        </div>

        <div className={style.footer}>
          <span className={style.footer_text}>
            Показано {paginationModel.page * paginationModel.pageSize + 1}–
            {Math.min(
              (paginationModel.page + 1) * paginationModel.pageSize,
              data?.total || 0,
            )}
            из {data?.total || 0}
          </span>
          <Pagination
            current={paginationModel.page + 1}
            pageSize={paginationModel.pageSize}
            total={data?.total || 0}
            showSizeChanger={false}
            onChange={(page) =>
              setPaginationModel({ ...paginationModel, page: page - 1 })
            }
          />
        </div>
      </div>

      <Modal
        title="Добавить новый товар"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={() => {
            message.success("Товар успешно добавлен (имитация)");
            setIsModalOpen(false);
          }}
        >
          <Form.Item
            label="Наименование"
            name="title"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Цена" name="price" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Вендор" name="brand" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Артикул" name="sku" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            className={style.btn_add}
          >
            Сохранить
          </Button>
        </Form>
      </Modal>
    </div>
  );
};
