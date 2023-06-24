// SignupPage.js
import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import "./auth.css";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerAPI } from "../../utils/ApiRequest";
import axios from "axios";

const Register = () => {

  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('user')){
      navigate('/');
    }
  }, [navigate]);

  const particlesInit = useCallback(async (engine) => {
    // console.log(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // await console.log(container);
  }, []);

  const [values, setValues] = useState({
    name : "",
    email : "",
    password : "",

  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  }

  const handleChange = (e) => {
    setValues({...values , [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const { name, email, password } = values;
    console.log(values)
    // console.log(response.data);
    // try {
    //   const response = await axios.post(registerAPI, {
    //     name,
    //     email,
    //     password
    //   });
    //   console.log("here")
    //   console.log(response.data); // Log the response data
  
    //   if (response.data.success === true) {
    //     alert("successful");
    //     localStorage.setItem("user", JSON.stringify(response.data.user));
    //     navigate("/");
    //   } else {
    //     toast.error(response.data.message, toastOptions);
    //   }
    // } catch (error) {
    //   console.error(error);
    //   toast.error("An error occurred", toastOptions);
    // }

    const regis = async () => {
      const userData = {
        name: values.name,
        email: values.email,
        password: values.password
      };
    
      try {
        const response = await fetch("http://localhost:3009/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(userData)
        });
    
        if (response.ok) {
          // Request was successful
          const data = await response.json();
          alert("here")
          console.log(data); // Log the response data
          // Handle the response data accordingly
        } else {
          // Request failed
          console.error("Request failed with status:", response.status);
          // Handle the error
        }
      } catch (error) {
        console.error("An error occurred:", error);
        // Handle the error
      }
    };

    regis();
    
  };
  

  return (
    <>
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: '#000',
            },
          },
          fpsLimit: 60,
          particles: {
            number: {
              value: 200,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: '#ffcc00',
            },
            shape: {
              type: 'circle',
            },
            opacity: {
              value: 0.5,
              random: true,
            },
            size: {
              value: 3,
              random: { enable: true, minimumValue: 1 },
            },
            links: {
              enable: false,
            },
            move: {
              enable: true,
              speed: 2,
            },
            life: {
              duration: {
                sync: false,
                value: 3,
              },
              count: 0,
              delay: {
                random: {
                  enable: true,
                  minimumValue: 0.5,
                },
                value: 1,
              },
            },
          },
          detectRetina: true,
        }}
        style={{
          position: 'absolute',
          zIndex: -1,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />

      <Container className="mt-5" style={{position: 'relative', zIndex: "2 !important", color:"white !important"}}>
      <Row>
        <h1 className="text-center">
          <AccountBalanceWalletIcon sx={{ fontSize: 40, color: "white"}}  className="text-center" />
        </h1>
        <h1 className="text-center text-white">Welcome to Expense Tracking System</h1>
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="text-white text-center mt-5" >Registration</h2>
          <Form>
            <Form.Group controlId="formBasicName" className="mt-3" >
              <Form.Label className="text-white">Name</Form.Label>
              <Form.Control type="text"  name="name" placeholder="Full name" value={values.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formBasicEmail" className="mt-3">
              <Form.Label className="text-white">Email address</Form.Label>
              <Form.Control type="email"  name="email" placeholder="Enter email" value={values.email} onChange={handleChange}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mt-3">
              <Form.Label className="text-white">Password</Form.Label>
              <Form.Control type="password"  name="password" placeholder="Password" value={values.password} onChange={handleChange} />
            </Form.Group>
            <div style={{width: "100%", display: "flex" , alignItems:"center", justifyContent:"center", flexDirection: "column"}} className="mt-4">
              <Link to="/forgotPassword" className="text-white lnk" >Forgot Password?</Link>

              <Button   className=" text-center mt-3 btnStyle" onClick={handleSubmit}>
                Signup
              </Button>

              <p className="mt-3" color={{color: "#FBF9F9"}}><Link to="/login" className="text-white lnk" >Already have an account? Login</Link></p>
            </div>
          </Form>
        </Col>
      </Row>
    <ToastContainer />
    </Container>
    </div>
    </>
  )
}

export default Register