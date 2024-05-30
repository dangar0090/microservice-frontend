import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import image from "../../images/home.svg";
import cardimg from "../../images/card.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./home.css";
import Footer from "../../components/footer/footer";
import Navbar from "../../components/navbar/navbar";

const Home = () => {
  const client = localStorage.getItem("client");
  return (
    <>
      <Navbar />
      <div className="container-1">
        <div className="container-1-left">
          <img src={image} className="image" />
        </div>
        <div className="container-1-right">
          {client == "doctor"
            ? "Hi Doctor! We provide the Experience of age-old wisdom of Ayurveda with personalized Ayurvedic recommendations by you. Please look at the queries of the users to prescribe them."
            : "Hi User! Experience the age-old wisdom of Ayurveda and natural solutions for your health concerns with personalized Ayurvedic recommendations."
            }
        </div>
      </div>
      <div className="container-2">
        <div className="sub-container">
          <img src={cardimg} className="card-image" />
          Access to a comprehensive database of Ayurvedic remedies, herbs, and
          supplements, along with recommended dosages and usage instructions.
        </div>
        <div className="sub-container">
          <img src={cardimg} className="card-image" />
          Reminders and tracking features to help you stay on top of your
          treatment plan and monitor progress.
        </div>
        <div className="sub-container">
          <img src={cardimg} className="card-image" />
          Integration with wearable health technology to provide even more
          personalized recommendations and data tracking.
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default Home;
