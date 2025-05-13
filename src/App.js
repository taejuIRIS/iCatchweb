import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import StartPage from "./pages/StartPage";
import UsersPage from "./pages/UsersPage";
import MonitoringPage from "./pages/MonitoringPage";
import AiPage from "./pages/AiPage";
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
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/updates" element={<UpdatePage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;
