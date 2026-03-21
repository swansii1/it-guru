import { ProductTable } from "@/widgets/product-table/ui/ProductTable";
import { Layout } from "antd";

const { Content } = Layout;

export const ProductPage = () => {
  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <Content
        style={{
          padding: "24px",
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <ProductTable />
        </div>
      </Content>
    </Layout>
  );
};
