// import { useState } from "react"; 
import  { useState } from "react"; 


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Form, Button } from "react-bootstrap"; 
import useTitle from "../hooks/useTitle"; 
import {Login} from "../features/auth/authApiSlice"; 
import { useNavigate, useParams, useLocation } from 'react-router-dom';
 
const LoginForm: React.FC = () => { 
  useTitle('Login')
  const router = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try { 

      let rData:any =  await  Login(username, password);

      console.log("rData", rData);
      // if (response.ok) {
        
        localStorage.setItem("user", JSON.stringify(rData));
        localStorage.setItem("token", (rData.accessToken));
        localStorage.setItem("refresh", (rData.refreshToken));
        
      //   // Redirect to user list page upon successful login
        router("/user-list");

      //   toast.success("Login successful");
      // } else {
      //   const data = await response.json();
      //   setError(data.message);
      //   toast.error(data.message);
      // }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("An error occurred while logging in");
    }
  };

  return (
  <>
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <Card className="p-4 bg-dark text-white">
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-dark text-white border-secondary"
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-dark text-white border-secondary"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
            {error && <p className="text-danger text-center mt-2">{error}</p>}
          </Form>
        </Card.Body>
      </Card>
    </div>
    <ToastContainer/>
    </>
  );
};

export default LoginForm;
