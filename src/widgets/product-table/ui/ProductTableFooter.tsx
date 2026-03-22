import { Pagination } from "antd";

import style from "./ProductTable.module.css";

type Props = {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
};

export function ProductTableFooter({
  page,
  pageSize,
  total,
  onPageChange,
}: Props) {
  const from = page * pageSize + 1;
  const to = Math.min((page + 1) * pageSize, total);

  return (
    <div className={style.footer}>
      <span className={style.footer_text}>
        Показано {from}–{to} из {total}
      </span>
      <Pagination
        className={style.pagination}
        current={page + 1}
        pageSize={pageSize}
        total={total}
        showSizeChanger={false}
        onChange={(p) => onPageChange(p - 1)}
      />
    </div>
  );
}
