import { FaFan } from "react-icons/fa"

import '../styles/Header.css'
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="header-section">
      <div className="image-section">
        <FaFan size={45} />
        <h2>Welcome Admin!</h2>
      </div>
      <button onClick={(e) => handleLogout(e)} type="button">Logout</button>
    </div>
  );
}

export default Header;
