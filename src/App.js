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

function AppWrapper() {
  const location = useLocation();

  const hideNavbar = location.pathname === "/";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/monitoring" element={<MonitoringPage />} />
        <Route path="/ai" element={<AiPage />} />
        <Route path="/aidata" element={<AidataPage />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/updates" element={<UpdatePage />} />
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
