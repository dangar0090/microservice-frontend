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
import "./query.css";
import Footer from "../../components/footer/footer";
import Navbar from "../../components/navbar/navbar";
import { useEffect, useState } from "react";
import axios from "axios";

const QueryPage = () => {
  const [query, setquery] = useState("");
  const [data, setData] = useState([]);

  const userId = localStorage.getItem("userId");
  const client = localStorage.getItem("client");
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async (e) => {
    var array;
    var arr = [];
    await axios
      .get("https://test-aws-app.simform.solutions/userService/queries")
      .then((response) => {
        array = response.data;
        arr = array.filter((obj) => {
          return obj.userID == userId;
        });
        arr.reverse();
        setData(arr);
        console.log(arr);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (query === "") {
      toast.warn("You have not entered any query", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
    } else {
      try {
        const res = await axios.post(
          `https://test-aws-app.simform.solutions/userService/${userId}/query`,
          {
            body: query,
          }
        );
        toast.success(`Your query will be answered soon!`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
        getData();
      } catch (e) {
        console.log(e.response.data);
        toast.error(`${e.response.data}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
      }
    }
    setquery("");
  };

  return (
    <>
      <Navbar />
      <div className="body">
      <div class="form-style-6">
        <form onSubmit={handleSubmit}>
          <textarea
            value={query}
            placeholder="Please enter your query"
            onChange={(e) => setquery(e.target.value)}
          ></textarea>
          <input type="submit" value="Ask your Query" />
        </form>
      </div>
      {data.map((item) => {
        return (
          <>
            <div className="querycontainer">
              <div className="answerBody">{item.body}</div>
              <div className="viewpresc">
                <Button
                  className="btn"
                  onClick={() => {
                    navigate("/prescriptions", {
                      state: { queryId: item._id },
                    });
                  }}
                >
                  View Prescriptions
                </Button>
              </div>
            </div>
          </>
        );
      })}
      </div>
      <ToastContainer />
      <br></br>
      <Footer />
    </>
  );
};

export default QueryPage;
