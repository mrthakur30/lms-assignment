import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './pages/Admin';
import Reports from './pages/Reports';
import Maintenance from './pages/Maintenance';
import Transaction from './pages/Transaction';
import { ProtectedRoute } from './components/ProtectedRoute';
import Login from './pages/Login';
import Navbar from './components/Navbar';

const App = () => {
  
  return (
    <Router>
       <Navbar />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Admin />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/transactions" element={<Transaction />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;