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
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
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

export default function SignUp() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [doctor, setDoctor] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (name === "") {
      toast.warn("You have not entered the name properly", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
    } else if (email === "") {
      toast.warn("You have not entered the email properly", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
    } else if (password === "") {
      toast.warn("You have not entered the password properly", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
    } else {
      try {
        let res;
        if (doctor) {
          res = await axios.post("https://test-aws-app.simform.solutions/auth-service/signup", {
            doctorname: name,
            email: email,
            password: password,
            registrationNo: "1234",
            client: "doctor",
          });
        } else {
          res = await axios.post("https://test-aws-app.simform.solutions/auth-service/signup", {
            username: name,
            email: email,
            password: password,
            client: "user",
          });
        }

        toast.success(`Hello ${name}, you are registered successfully!`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (e) {
        console.error("Error during signup:", e);
        if (e.response && e.response.data) {
          toast.error(`Error: ${e.response.data}`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1500,
          });
        } else {
          toast.error("An unexpected error occurred. Please try again later.", {
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
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    required
                    fullWidth
                    id="firstName"
                    label="Name"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
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
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="allowExtraEmails"
                        onChange={(e) => setDoctor(!doctor)}
                      />
                    }
                    label="Do you want to sign up as a doctor to give prescriptions?"
                  />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign Up
              </Button>
            </Box>
          </Box>
        </Container>
        <ToastContainer />
      </ThemeProvider>
    </>
  );
}
