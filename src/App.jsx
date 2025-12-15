import React, { useContext, useEffect, useState } from "react";
import Login from "./components/Auth/Login";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import { AuthContext } from "./contexts/AuthProvider";

function App() {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState({});
  const [userData] = useContext(AuthContext);

  // On load, check if someone is logged in (using token or cached role)
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed.role);
      setLoggedInUserData(parsed.data || {});
    }
  }, []);

  // Basic temporary login logic (replace with GraphQL auth later)
  const handleLogin = (email, password) => {
    // Admin login (temporary hardcoded)
    if (email === "admin@me.com" && password === "123") {
      const userInfo = { role: "admin" };
      setUser(userInfo.role);
      localStorage.setItem("loggedInUser", JSON.stringify(userInfo));
      return;
    }

    // Employee login (check backend-loaded employees)
    if (userData && userData.length > 0) {
      const employee = userData.find(
        (e) => e.email === email && e.password === password
      );
      if (employee) {
        const userInfo = { role: "employee", data: employee };
        setUser(userInfo.role);
        setLoggedInUserData(employee);
        localStorage.setItem("loggedInUser", JSON.stringify(userInfo));
        return;
      }
    }

    alert("Invalid credentials");
  };

  // Logout handler passed down to dashboards
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    setLoggedInUserData({});
  };

  return (
    <>
      {!user && <Login handleLogin={handleLogin} />}

      {user === "admin" && <AdminDashboard changeUser={handleLogout} />}
      {user === "employee" && (
        <EmployeeDashboard changeUser={handleLogout} data={loggedInUserData} />
      )}
    </>
  );
}

export default App;