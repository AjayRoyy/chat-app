import React from "react";
import Homestyles from "../styles/HomePage.module.css";
import { useNavigate } from "react-router-dom";
import Chats from "../components/Chats";
import Contacts from "../components/Contacts";
import NavbarComp from "./../components/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const HomePage = () => {
  const navigate = useNavigate();
  if (!localStorage.getItem("token")) {
    navigate("/user/login");
  }
  return (
    <div className={Homestyles.main}>
      <NavbarComp />
      <Row className="mt-2">
        <Col className="border" md={3}>
          <Contacts />
        </Col>
        <Col>
          <Chats />
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
