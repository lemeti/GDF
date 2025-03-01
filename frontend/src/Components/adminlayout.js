import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SideBarAdmin from './SideBarAdmin';
import NavigationBar from './NavBar';
import AdminUsers from '../Pages/Adminuser';
import AdminMenu from '../Pages/Adminmenu';
import AdminCom from '../Pages/Admincom';
import AdminRes from '../Pages/Adminres';
import AdminStats from '../Pages/Adminstat';

function Adminlayout() {
  return (
    <div className="d-flex vh-100">
      {/* Sidebar visible uniquement en mode admin */}
      <SideBarAdmin />

      {/* Zone principale avec Navbar et contenu */}
      <div className="flex-grow-1 d-flex flex-column">
        <NavigationBar />
        <div className="p-3 overflow-auto" style={{ height: 'calc(100vh - 60px)' }}>
          <Routes>
            <Route path="Adminuser" element={<AdminUsers />} />
            <Route path="Adminmenu" element={<AdminMenu />} />
            <Route path="Admincom" element={<AdminCom />} />
            <Route path="Adminres" element={<AdminRes />} />
            <Route path="Adminstat" element={<AdminStats />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Adminlayout;
