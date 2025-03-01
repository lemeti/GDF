import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './Components/NavBar';
import Footer from './Components/FooterBar';
import Login from './Pages/Login';
import SignUp from './Pages/Sign-up';
import Home from './Pages/home';
import { AuthProvider } from './AuthContext';
import Commande from './Pages/commande';
import Payment from './Pages/payment';
import Menu from './Pages/menu';
import Reservation from './Pages/reservation';
import Livraison from './Pages/livraison';
import Contact from './Pages/contact';
import Propos from './Pages/propos';
import Faq from './Pages/faq';
import Entrees from './Pages/entrees';
import Principaux from './Pages/principaux';
import Grillades from './Pages/grillades';
import Dejeuner from './Pages/dejeuner';
import Exotique from './Pages/exotique';
import Boisson from './Pages/boisson';
import SearchResults from './Pages/search';
import SideBarAdmin from './Components/SideBarAdmin';
import AdminCom from './Pages/Admincom';
import AdminMenu from './Pages/Adminmenu';
import AdminRes from './Pages/Adminres';
import AdminStat from './Pages/Adminstat';
import AdminUser from './Pages/Adminuser';

function AdminLayout({ children }) {
  return (
    <div style={{ display: 'flex' }}>
      <SideBarAdmin />
      <div style={{ flexGrow: 1 }}>
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Pages Utilisateurs */}
          <Route path="/" element={<><NavigationBar /><Home /> <Footer /></>} />
          <Route path="/login" element={<><NavigationBar /><Login /> <Footer /></>} />
          <Route path="/sign-up" element={<><NavigationBar /><SignUp /> <Footer /></>} />
          <Route path="/commande" element={<><NavigationBar /><Commande /> <Footer /></>} />
          <Route path="/payment" element={<><NavigationBar /><Payment /> <Footer /></>} />
          <Route path="/menu" element={<><NavigationBar /><Menu /> <Footer /></>} />
          <Route path="/reservation" element={<><NavigationBar /><Reservation /> <Footer /></>} />
          <Route path="/livraison" element={<><NavigationBar /><Livraison /> <Footer /></>} />
          <Route path="/contact" element={<><NavigationBar /><Contact /> <Footer /></>} />
          <Route path="/propos" element={<><NavigationBar /><Propos /> <Footer /></>} />
          <Route path="/faq" element={<><NavigationBar /><Faq /> <Footer /></>} />
          <Route path="/entrees" element={<><NavigationBar /><Entrees /> <Footer /></>} />
          <Route path="/principaux" element={<><NavigationBar /><Principaux /> <Footer /></>} />
          <Route path="/grillades" element={<><NavigationBar /><Grillades /> <Footer /></>} />
          <Route path="/dejeuner" element={<><NavigationBar /><Dejeuner /> <Footer /></>} />
          <Route path="/exotique" element={<><NavigationBar /><Exotique /> <Footer /></>} />
          <Route path="/boisson" element={<><NavigationBar /><Boisson /> <Footer /></>} />
          <Route path="/search" element={<><NavigationBar /><SearchResults /> <Footer /></>} />
      
          {/* Pages Administrateurs */}
          <Route path="/Admincom" element={<AdminLayout><AdminCom /></AdminLayout>} />
          <Route path="Adminmenu" element={<AdminLayout><AdminMenu /></AdminLayout>} />
          <Route path="Adminres" element={<AdminLayout><AdminRes /></AdminLayout>} />
          <Route path="Adminstat" element={<AdminLayout><AdminStat /></AdminLayout>} />
          <Route path="Adminuser" element={<AdminLayout><AdminUser /></AdminLayout>} />
        </Routes>
        
      </Router>
    </AuthProvider>
  );
}

export default App;
