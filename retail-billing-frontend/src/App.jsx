import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Billing from "./pages/Billing";
import Invoice from "./pages/Invoice";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Employees from "./pages/Employees";


import AuthProvider from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        <Routes>

          {/* Login */}
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
  path="/register"
  element={<Register />}
/>
          {/* Dashboard */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <RoleProtectedRoute
                  allowedRoles={["ADMIN", "STAFF"]}
                >
                  <Layout>
                    <Dashboard />
                  </Layout>
                </RoleProtectedRoute>
              </PrivateRoute>
            }
          />

          {/* Products */}
          <Route
            path="/products"
            element={
              <PrivateRoute>
                <RoleProtectedRoute
                  allowedRoles={["ADMIN", "MANAGER"]}
                >
                  <Layout>
                    <Products />
                  </Layout>
                </RoleProtectedRoute>
              </PrivateRoute>
            }
          />

          {/* Customers */}
          <Route
            path="/customers"
            element={
              <PrivateRoute>
                <RoleProtectedRoute
                  allowedRoles={["ADMIN",  "STAFF"]}
                >
                  <Layout>
                    <Customers />
                  </Layout>
                </RoleProtectedRoute>
              </PrivateRoute>
            }
          />

          {/* Billing */}
          <Route
            path="/billing"
            element={
              <PrivateRoute>
                <RoleProtectedRoute
                  allowedRoles={["ADMIN", "STAFF"]}
                >
                  <Layout>
                    <Billing />
                  </Layout>
                </RoleProtectedRoute>
              </PrivateRoute>
            }
          />

          {/* Invoice */}
          <Route
            path="/invoice"
            element={
              <PrivateRoute>
                <RoleProtectedRoute
                  allowedRoles={["ADMIN", "STAFF"]}
                >
                  <Layout>
                    <Invoice />
                  </Layout>
                </RoleProtectedRoute>
              </PrivateRoute>
            }
          />

          {/* Reports */}
          <Route
            path="/reports"
            element={
              <PrivateRoute>
                <RoleProtectedRoute
                  allowedRoles={["ADMIN", "MANAGER"]}
                >
                  <Layout>
                    <Reports />
                  </Layout>
                </RoleProtectedRoute>
              </PrivateRoute>
            }
          />

          <Route
            path="/employees"
            element={
              <PrivateRoute>
                <RoleProtectedRoute allowedRoles={["ADMIN"]}>
                  <Layout>
                    <Employees />
                  </Layout>
                </RoleProtectedRoute>
              </PrivateRoute>
            }
          />

         
        </Routes>

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;