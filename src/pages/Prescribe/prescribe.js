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
import "./prescribe.css";
import Footer from "../../components/footer/footer";
import Navbar from "../../components/navbar/navbar";
import { useEffect, useState } from "react";
import axios from "axios";

const Prescribe = () => {
  let prescriptionObj = null;

  const [data, setData] = useState([]);
  const [prescribed, setPrescribed] = useState(prescriptionObj ? true : false);
  const [prescription, setPrescription] = useState(
    prescriptionObj ? prescriptionObj.body : ""
  );
  const [submitType, setSubmitType] = useState("");

  const navigate = useNavigate();

  let presc = [];

  const userId = localStorage.getItem("userId");
  const client = localStorage.getItem("client");
  const { state } = useLocation();
  const queryId = state ? state.queryId : null;

  const [prescId, setprescId] = useState(queryId);

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
      const response = await axios.get("https://test-aws-app.simform.solutions/doctor-service/prescriptions");
      if (response && response.data) {
        const array = response.data;
        const arr = array.filter((obj) => obj.queryId === queryId);
        presc = arr.filter((prescription) => prescription.doctorId === userId);
        if (presc.length > 0) {
          console.log("Prescription found:", presc[0]);
          prescriptionObj = presc[0];
          setprescId(prescriptionObj._id);
          setPrescription(prescriptionObj.body);
          setPrescribed(true);
        } else {
          console.log("No prescription found for the given query and user.");
        }
      } else {
        console.error("Response data is undefined or null");
        toast.error("Failed to fetch prescriptions. Response data is undefined.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch prescriptions. Please try again later.");
    }
  };

  const createPrescription = async (e) => {
    e.preventDefault();
    if (prescription === "") {
      toast.warn("You have not entered any prescription", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
    } else {
      try {
        const res = await axios.post(
          `https://test-aws-app.simform.solutions/doctor-service/${userId}/${queryId}/prescription`,
          { body: prescription }
        );
        toast.success("Your prescription has been added successfully!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
        setTimeout(() => {
          navigate("/answerQueries");
        }, 2000);
        getData();
      } catch (error) {
        console.error("Error creating prescription:", error);
        toast.error("Failed to create prescription. Please try again later.");
      }
    }
  };

  const updatePrescription = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `https://test-aws-app.simform.solutions/doctor-service/${prescId}`,
        { body: prescription }
      );
      toast.success("Your prescription has been updated successfully!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      setTimeout(() => {
        navigate("/answerQueries");
      }, 2000);
    } catch (error) {
      console.error("Error updating prescription:", error);
      toast.error("Failed to update prescription. Please try again later.");
    }
  };

  const deletePrescription = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete(
        `https://test-aws-app.simform.solutions/doctor-service/${queryId}/${prescId}`
      );
      toast.success("Your prescription has been deleted successfully!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      setTimeout(() => {
        navigate("/answerQueries");
      }, 2000);
    } catch (error) {
      console.error("Error deleting prescription:", error);
      toast.error("Failed to delete prescription. Please try again later.");
    }
  };

  const submitPrescription = async (e) => {
    e.preventDefault();
    if (submitType === "update") {
      updatePrescription(e);
    } else if (submitType === "delete") {
      deletePrescription(e);
    }
  };

  return (
    <>
      <Navbar />
      {prescribed ? (
        <>
          <p className="text">
            You have already given your prescription, if there are any changes
            please update!
          </p>
          <div className="form-style-6">
            <form onSubmit={submitPrescription}>
              <textarea
                value={prescription}
                placeholder="Please enter your query"
                onChange={(e) => setPrescription(e.target.value)}
              ></textarea>
              <input
                type="submit"
                value="Update this prescription"
                onClick={(e) => setSubmitType("update")}
              />
              <br></br>
              <input
                type="submit"
                value="Delete this prescription"
                onClick={(e) => setSubmitType("delete")}
              />
            </form>
          </div>
        </>
      ) : (
        <>
          <p className="text">
            You have not given a prescription yet! Please provide a proper
            prescription!
          </p>
          <div className="form-style-6">
            <form onSubmit={createPrescription}>
              <textarea
                value={prescription}
                placeholder="Please enter your prescription"
                onChange={(e) => setPrescription(e.target.value)}
              ></textarea>
              <input type="submit" value="Send this prescription" />
            </form>
          </div>
        </>
      )}
      <ToastContainer />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Footer />
    </>
  );
};

export default Prescribe;
