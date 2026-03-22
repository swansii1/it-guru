import { Button, Space } from "antd";
import { ReloadOutlined, PlusOutlined } from "@ant-design/icons";

import style from "./ProductTable.module.css";

type Props = {
  onRefetch: () => void;
  isFetching: boolean;
  onAddClick: () => void;
};

export function ProductTableToolbar({
  onRefetch,
  isFetching,
  onAddClick,
}: Props) {
  return (
    <div className={style.table_header}>
      <span className={style.table_title}>Все позиции</span>
      <Space>
        <Button
          icon={<ReloadOutlined />}
          onClick={onRefetch}
          loading={isFetching}
          className={style.btn_refresh}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={onAddClick}
          className={style.btn_add}
        >
          Добавить
        </Button>
      </Space>
    </div>
  );
}
