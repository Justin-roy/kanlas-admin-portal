import { FaFan } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ErrorComponent from "./ErrorComponent";
import ApiService from "../ApiService";
import { useState } from "react";
import Loader from './Loader'
import toast from 'react-hot-toast';


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const status = await ApiService.login(email, password);
      if (status) {
        console.log(status);
        // navigate to Dashboard
        navigate("/dashboard");
      } else {
        console.log("Login failed: ", status);
        toast.error("Login failed: " + status);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError(true);
      toast.error("Login failed: " + error)
    } finally {
      setLoading(false);
    }
  };

  if (error) return <ErrorComponent message={"something-went-wrong"} />;

  return (
    <div className="login-container">
      {loading ? (
        <Loader />
      ) : (
        <div className="login-box">
          <div className="login-logo">
            <FaFan size={45} />
          </div>
          <form className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="sophat.leat@nintrea.live"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group remember-me">
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>
            <button onClick={handleLogin} type="button">
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
