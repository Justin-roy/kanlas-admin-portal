import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import "./styles/App.css"
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';
const App = () => {
  return (
    <Router>
      <Toaster position='top-center'/>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
};

export default App;
