import axios from "axios";

const _BASE_URL = "https://kanlas-backend-assignment.onrender.com/api";

const ApiService = {
  login: async (email, password) => {
    const { data } = await axios.post(`${_BASE_URL}/user/admin`, {
      email,
      password,
    });
    if (data.success) {
      localStorage.setItem("ADMIN-ID", data.data._id);
      console.log(data.message);
    }
    return data.success;
  },
  getAllUsers: async () => {
    const { data } = await axios.get(`${_BASE_URL}/user/all`);
    return data;
  },

  updateUser: async (userId,email) => {
    var adminID = localStorage.getItem("ADMIN-ID");
    const { data } = await axios.put(
      `${_BASE_URL}/user/${adminID}?userId=${userId}&email=${email}`
    );
    return data;
  },

  deleteUser: async (userId) => {
    var adminID = localStorage.getItem("ADMIN-ID");
    const { data } = await axios.delete(
      `${_BASE_URL}/user/${adminID}?userId=${userId}`
    );
    return data;
  },
};

export default ApiService;
