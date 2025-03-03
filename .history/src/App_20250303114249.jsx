import React from "react";
import { Route, Routes } from "react-router-dom";

import Main_Page from "./Components/Pages/Main_Page";
import Non_Found_Page from "./Components/Pages/Non_Found_Page";
import Layout from "./Components/Standart/Layout/Layout";
import InstallButton from "./Components/Pages/InstallButton/InstallButton";
import HomePage from "./Components/Pages/HomePage/HomePage";
import RegionPage from "./Components/Pages/RegionPage/RegionPage";
import OneTourPage from "./Components/Pages/OneTourPage/OneTourPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Main_Page />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/region/:title" element={<RegionPage />} />
          <Route path="/tours/:title" element={<OneTourPage />} />
          <Route path="*" element={<Non_Found_Page />} />
        </Route>
      </Routes>
      <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminPag />
            </ProtectedRoute>
          }
        />
      {/* Кнопка установки */}
      <InstallButton />
    </>
  )
}

export default App
