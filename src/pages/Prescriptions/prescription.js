import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import image from "../../images/home.svg";
import cardimg from "../../images/card.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./prescription.css";
import Footer from "../../components/footer/footer";
import Navbar from "../../components/navbar/navbar";
import { useEffect, useState } from "react";
import axios from "axios";

const PrescriptionPage = () => {
  const [query, setquery] = useState("");
  const [data, setData] = useState([]);

  const userId = localStorage.getItem("userId") || "defaultUserId";
  const client = localStorage.getItem("client") || "defaultClient";
  const { state } = useLocation();
  const queryId = state ? state.queryId : null; // Safely access queryId

  useEffect(() => {
    if (queryId) {
      getData();
    } else {
      console.error("Query ID is not defined");
      toast.error("Query ID is not defined");
    }
  }, [queryId]);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/doctorService/prescriptions");
      if (response && response.data) {
        const array = response.data;
        const arr = array.filter((obj) => obj.queryId === queryId);
        arr.reverse();
        setData(arr);
        console.log(arr);
      } else {
        console.error("Response data is undefined");
        toast.error("Failed to fetch prescriptions. Response data is undefined.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch prescriptions. Please try again later.");
    }
  };

  return (
    <>
      <Navbar />
      {data.length === 0 ? (
        <center>
          <h2>None of the doctors have prescribed yet</h2>
        </center>
      ) : (
        <div className="page">
          {data.map((item) => (
            <div className="querycontainer" key={item._id}>
              <div className="answerBody">{item.body}</div>
              <div className="viewpresc">Prescribed by: {item.doctorname}</div>
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
      <Footer />
    </>
  );
};

export default PrescriptionPage;
