import { Input, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import style from "./ProductTable.module.css";

type Props = {
  rawSearch: string;
  onRawSearchChange: (value: string) => void;
};

export function ProductTableHeader({ rawSearch, onRawSearchChange }: Props) {
  return (
    <div className={style.header_panel}>
      <Typography.Title level={4} className={style.page_title}>
        Товары
      </Typography.Title>
      <div className={style.search_wrap}>
        <Input
          placeholder="Найти"
          value={rawSearch}
          prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
          className={style.search_input}
          onChange={(e) => onRawSearchChange(e.target.value)}
          allowClear
        />
      </div>
      <div className={style.header_spacer} aria-hidden />
    </div>
  );
}
