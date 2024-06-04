import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../../components/navbar/navbar";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [doctor, setDoctor] = useState(false);
  const [clientOTP, setOTP] = useState();

  const otp = localStorage.getItem("otp");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email == "") {
      toast.warn("You have not entered the email properly", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
    } else if (password == "") {
      toast.warn("You have not entered the password properly", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
    } else if(otp != clientOTP) {
      toast.warn("Wrong OTP", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
    }
    else {
      console.log({ email, password, doctor });
      if (doctor) {
        try {
          const res = await axios.post(
            "https://test-aws-app.simform.solutions/authService/signin",
            {
              email: email,
              password: password,
              client: "doctor",
            }
          );
          console.log(res);
          localStorage.setItem("userId", res.data._id);
          localStorage.setItem("client", res.data.client);
          localStorage.setItem("name", res.data.doctorname);
          toast.success(
            `Hello ${res.data.doctorname}, you are welcome our portal`,
            { position: toast.POSITION.TOP_CENTER, autoClose: 1500 }
          );
          setTimeout(() => {
            navigate("/home");
          }, 2500);
          localStorage.removeItem('otp')

        } catch (e) {
          console.log(e.response.data);
          toast.error(`${e.response.data}`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
        }
      } else {
        try {
          const res = await axios.post(
            "https://test-aws-app.simform.solutions/authService/signin",
            {
              email: email,
              password: password,
              client: "user",
            }
          );
          console.log(res);
          localStorage.setItem("userId", res.data._id);
          localStorage.setItem("client", res.data.client);
          localStorage.setItem("name", res.data.username);
          localStorage.removeItem('otp')

          toast.success(
            `Hello ${res.data.username}, you are welcome to our portal`,
            { position: toast.POSITION.TOP_CENTER, autoClose: 1500 }
          );
          setTimeout(() => {
            navigate("/home");
          }, 2500);
        } catch (e) {
          console.log(e.response.data);
          toast.error(`${e.response.data}`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
        }
      }
    }
  };

  return (
    <>
      <Navbar />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log In
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    type="email"
                    label="Email Address"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                {
                  otp ? <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="OTP"
                    type="text"
                    id="OTP"
                    // autoComplete="new-password"
                    value={clientOTP}
                    onChange={(e) => setOTP(e.target.value)}
                  />
                </Grid> : <></>
                }
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="allowExtraEmails"
                        onChange={(e) => setDoctor(!doctor)}
                      />
                    }
                    label="Do you have your account as a doctor?"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
            </Box>
          </Box>
        </Container>
        <ToastContainer />
      </ThemeProvider>
    </>
  );
}
