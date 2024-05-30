import {AppBar,Toolbar,IconButton, Typography,Stack,Button} from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import logo from '../../images/logo.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './navbar.css'
import { useEffect } from "react";

const Navbar=()=>{
    const user = localStorage.getItem('userId')
    const client = localStorage.getItem('client')

    const navigate = useNavigate()

    const logOut = async(e) => {
        localStorage.removeItem('userId')
        localStorage.removeItem('client')
        localStorage.removeItem('name')
        alert(`Logged Out successfully!`)
        setTimeout(function(){navigate('/home')}, 500)
    }

  return(
    <>
    <AppBar position="relative" style={{ background: '#C2F4AD'}}>
      <Toolbar>
      <img src={logo} className="logo" alt="logo" onClick={() => {navigate('/home')}} />
        <Stack direction="row" spacing={2}>
            {user?<></>:<Button color='inherit' onClick={function(){navigate('/login', {state:{page: 1}})}}>
            <Link style={{color: "#55B53B"}}  className="nav-link" to={'/login'}>
              Login
            </Link></Button>}

            {user?<></>:<Button color='inherit' >
            <Link style={{color: "#55B53B"}}  className="nav-link" to={'/signup'}>
              Sign-up
            </Link>
            </Button>}
          
          {
            user? <Button color='inherit' >
            <Link style={{color: "#55B53B"}}  className="nav-link" to={client == "doctor" ? '/answerQueries' :'/query'}>
              {client == "doctor" ? "Answer Queries" : "Ask your query"}
            </Link>
            </Button>
            : <></>
          }
          {user?<Button color='inherit' onClick={logOut}>
          <Link style={{color: "#55B53B"}}  className="nav-link" to={'/'}>
            Log Out
          </Link>
          </Button>:<></>}
        </Stack>
      </Toolbar>
    </AppBar>
    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#248FA8" fill-opacity="1" d="M0,96L80,101.3C160,107,320,117,480,112C640,107,800,85,960,80C1120,75,1280,85,1360,90.7L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg> */}
    </>
  );
}

export default Navbar;