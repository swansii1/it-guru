import { ProductTable } from "@/widgets/product-table";
import { Layout } from "antd";

import style from "./ProductPage.module.css";

const { Content } = Layout;

export const ProductPage = () => {
  return (
    <Layout className={style.layout}>
      <Content className={style.content}>
        <ProductTable />
      </Content>
    </Layout>
  );
};
