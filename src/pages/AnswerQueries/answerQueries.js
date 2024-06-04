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
import "./asnwerQueries.css";
import Footer from "../../components/footer/footer";
import Navbar from "../../components/navbar/navbar";
import { useEffect, useState } from "react";
import axios from "axios";

const AnswerQueriesPage = () => {
  const [query, setquery] = useState("");
  const [data, setData] = useState([]);

  const userId = localStorage.getItem("userId");
  const client = localStorage.getItem("client");
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async (e) => {
    let arr = [];
    await axios
      .get("https://microapp-ALB-685019548.us-east-1.elb.amazonaws.com/userService/queries")
      .then((response) => {
        arr = response.data;
        arr.reverse();
        setData(arr);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <Navbar />
      {data.map((item) => {
        return (
          <>
            <div className="querycontainer">
              <div className="answerBody">{item.body}</div>
              <div className="viewpresc">
                <Button
                  className="btn"
                  onClick={() => {
                    navigate("/prescribe", { state: { queryId: item._id } });
                  }}
                >
                  Give a Prescription
                </Button>
              </div>
            </div>
          </>
        );
      })}
      <ToastContainer />
      <br></br>
      <Footer />
    </>
  );
};

export default AnswerQueriesPage;
