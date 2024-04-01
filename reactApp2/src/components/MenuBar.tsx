 
import React from "react";
import { Navbar, Nav, Button,  } from "react-bootstrap";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Link  } from 'react-router-dom';
 

const MenuBar: React.FC = () => {
  const router = useNavigate();
    
  const handleLogout = () => {
    // Perform logout action here, such as clearing user data from local storage
    localStorage.removeItem("token");
    router("/login");

    // Redirect the user to the login page or any other appropriate page
    // window.location.href = "/login"; // Example redirection to login page
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Game</Navbar.Brand>
      <Nav className="me-auto">
        <Link to="/user-list" className="nav-link">User List 
        </Link>
        <Link className="nav-link" to="/payment-list">
           Payment Request 
        </Link>
      </Nav>
      
      <Button variant="outline-light" onClick={handleLogout}>
        Logout
      </Button>

    </Navbar>
  );
};

export default MenuBar;
