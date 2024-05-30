import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home";
import QueryPage from "./pages/Query/query";
import Form from "./pages/Form/form";
import SignUp from "./pages/Signup/signup";
import Login from "./pages/LogIn/login";
import PrescriptionPage from "./pages/Prescriptions/prescription";
import Prescribe from "./pages/Prescribe/prescribe";
import AnswerQueriesPage from "./pages/AnswerQueries/answerQueries";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Router>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/query" element={<QueryPage />} />
        <Route exact path="/formPage" element={<Form />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/prescriptions" element={<PrescriptionPage />} />
        <Route exact path="/answerQueries" element={<AnswerQueriesPage />} />
        <Route exact path="/prescribe" element={<Prescribe />} />
      </Routes>
    </Router>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
