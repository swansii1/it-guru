import { useAuthStore } from "@/entities/user/model/store";
import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router";
import { PageFallback } from "./ui/PageFallback";


const LoginPage = lazy(() =>
  import("@/pages/login/ui/LoginPage").then((m) => ({ default: m.LoginPage })),
);

const ProductPage = lazy(() =>
  import("@/pages/productPage/ui/ProductPage").then((m) => ({
    default: m.ProductPage,
  })),
);

function App() {
  const token = useAuthStore((state) => state.token);
  const isAuth = !!token;

  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route
          path="/login"
          element={
            isAuth ? <Navigate to="/products" replace /> : <LoginPage />
          }
        />
        <Route
          path="/products"
          element={
            isAuth ? <ProductPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/"
          element={<Navigate to={isAuth ? "/products" : "/login"} replace />}
        />
      </Routes>
    </Suspense>
  );
}

export default App;
