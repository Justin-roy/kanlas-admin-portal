import React, { useEffect, useState } from "react";
import Table from "./Table";
import Header from "./Header";
import ApiService from "../ApiService";
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const data = await ApiService.getAllUsers();
      if (data.success) {
        console.log(data.data);
        setUsers(data.data);
      } else {
        console.log("User fetch failed: ", data.message);
        toast.error("User fetch failed: ", data.message);
      }
    } catch (error) {
      console.error("User fetch failed in Catch Error: ", error);
      toast.error("User fetch failed in Catch Error: ", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <>
      <Header />
      <Table users={users} />
    </>
  );
};

export default Dashboard;
