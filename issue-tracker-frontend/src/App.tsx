import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/page";
import Register from "./pages/register/page";
import Dashboard from "./pages/dashboard/page";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/wrappers/ProtectedRoute";
import { AuthProvider } from "./context/AuthProvider";
import Layout from "./components/Layout";
import { NuqsAdapter } from "nuqs/adapters/react-router/v6";
import IssueForm from "./pages/dashboard/forms/IssueForm";

function App() {
  return (
    <AuthProvider>
      <NuqsAdapter>
        <BrowserRouter>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route element={
              <ProtectedRoute>
                <Layout/>
              </ProtectedRoute>} 
            >
              <Route path="/" element={<Dashboard />} />
              <Route path="/issue/create" element={<IssueForm isEditing={false} />} />
              <Route path="/issue/edit/:id" element={<IssueForm isEditing={true} />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </NuqsAdapter>
    </AuthProvider>
  );
}

export default App
