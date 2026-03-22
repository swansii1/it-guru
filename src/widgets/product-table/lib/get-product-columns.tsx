import { Button, Space, Avatar } from "antd";
import { PlusOutlined, MoreOutlined } from "@ant-design/icons";
import type { GridColDef } from "@mui/x-data-grid";

import tableStyles from "../ui/ProductTable.module.css";

export type ProductTableCss = typeof tableStyles;

export function getProductColumns(style: ProductTableCss): GridColDef[] {
  return [
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
      renderCell: (p) => (
        <span className={style.vendor_cell}>{p.value}</span>
      ),
    },
    {
      field: "sku",
      headerName: "Артикул",
      width: 130,
      sortable: false,
      valueGetter: (_, row) => `RCH${row.id}Q1A`,
    },
    {
      field: "rating",
      headerName: "Оценка",
      width: 100,
      renderCell: (params) => (
        <span
          className={
            params.value < 3.5 ? style.rating_low : style.rating_ok
          }
        >
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
          <span className={style.btn_more_wrap}>
            <MoreOutlined className={style.icon_more} />
          </span>
        </Space>
      ),
    },
  ];
}
