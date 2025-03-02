import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PrivateRoute, AdminRoute } from "./components/PrivateRoute";
import AuthContext from "./context/auth";
import Login from "./components/Login";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import Navbar from "./components/Navbar";

class App extends React.Component {
  state = {
    token: localStorage.getItem("token") || null,
    role: localStorage.getItem("role") || null,
  };

  login = (token, role) => {
    this.setState({ token, role });
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
  };

  logout = () => {
    this.setState({ token: null, role: null });
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  render() {
    const { token, role } = this.state;
    return (
      <AuthContext.Provider
        value={{
          token: this.state.token,
          role: this.state.role,
          login: this.login,
          logout: this.logout,
        }}
      >
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <UserDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/"
              element={
                token ? (
                  role === "admin" ? (
                    <AdminDashboard />
                  ) : (
                    <UserDashboard />
                  )
                ) : (
                  <Login />
                )
              }
            />
          </Routes>
        </Router>
      </AuthContext.Provider>
    );
  }
}

export default App;
