import { AiFillCloseCircle } from "react-icons/ai";
import "../styles/Model.css";
import ApiService from "../ApiService";
import { useState } from "react";
import toast from 'react-hot-toast';


function Model({ onClose, userID, userEmail }) {
  const [email, setEmail] = useState(userEmail);
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (!email) return;
      const data = await ApiService.updateUser(userID, email);
      if (data.success) {
        console.log(data.message);
        onClose();
        // refreshing window
        window.location.reload();
      } else {
        console.log("Update failed: ", data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error(error);
    }
  };
  return (
    <div className="model-overlay">
      <div className="model-container">
        <AiFillCloseCircle size={26} className="close-icon" onClick={onClose} />
        <p>Edit User Detail</p>
        <div className="popup-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button onClick={(e) => handleUpdate(e)} type="button">
          Update
        </button>
      </div>
    </div>
  );
}

export default Model;
