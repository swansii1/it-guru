import { LoginPage } from "@/pages/login/ui/LoginPage";
import { Route, Routes } from "react-router";

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
