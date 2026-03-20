import { useAuthStore } from "@/entities/user/model/store";
import { LoginPage } from "@/pages/login/ui/LoginPage";
import { ProductPage } from "@/pages/productPage/ui/ProductPage";
import { Navigate, Route, Routes } from "react-router";

function App() {
  const token = useAuthStore((state) => state.token);
  const isAuth = !!token;

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={isAuth ? <Navigate to="/products" replace /> : <LoginPage />}
        />
        <Route
          path="/products"
          element={isAuth ? <ProductPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/"
          element={<Navigate to={isAuth ? "/products" : "/login"} replace />}
        />
      </Routes>
    </>
  );
}

export default App;
