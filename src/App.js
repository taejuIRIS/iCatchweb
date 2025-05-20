import React from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import StartPage from "./pages/StartPage";
import UsersPage from "./pages/UsersPage";
import MonitoringPage from "./pages/MonitoringPage";
import AiPage from "./pages/AiPage";
import AidataPage from "./pages/AidataPage";
import AlertsPage from "./pages/AlertsPage";
import UpdatePage from "./pages/UpdatePage";
import PrivateRoute from "./components/PrivateRoute";

function AppWrapper() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <UsersPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/monitoring"
          element={
            <PrivateRoute>
              <MonitoringPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/ai"
          element={
            <PrivateRoute>
              <AiPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/aidata"
          element={
            <PrivateRoute>
              <AidataPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/alerts"
          element={
            <PrivateRoute>
              <AlertsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/updates"
          element={
            <PrivateRoute>
              <UpdatePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <HashRouter>
      <AppWrapper />
    </HashRouter>
  );
}

export default App;