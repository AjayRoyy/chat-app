import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { AiOutlineCaretRight, AiFillBell, AiOutlineDown } from "react-icons/ai";
import MyVerticallyCenteredModal from "./profileModel";

const options = [
  {
    name: "Enable backdrop (default)",
    scroll: false,
    backdrop: true,
  },
];
const NavbarComp = ({ name, ...props }) => {
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container fluid className="ps-5">
        <Navbar.Brand href="#home">Heat Riser Chat App</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <AiFillBell className="text-light fs-3 me-3" />
          <Form className="d-flex me-2">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-light">Search</Button>
          </Form>
          <Navbar bg="dark" variant="dark">
            <Container>
              <NavDropdown
                title={
                  <Navbar.Brand
                    className="fs-6"
                    href="#home"
                    onClick={() => setModalShow(true)}
                  >
                    <img
                      alt=""
                      src="http://res.cloudinary.com/dsr9ifmyh/image/upload/v1673940776/Photo-Ajay_yyptyn.jpg"
                      width="30"
                      height="30"
                      className="d-inline-block align-top rounded-circle"
                    />{" "}
                    Ajay Roy <AiOutlineDown className="text-light fs-6" />
                  </Navbar.Brand>
                }
                className="text-light me-3"
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item
                  href="#action/3.2"
                  onClick={() => {
                    <MyVerticallyCenteredModal
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    />;
                  }}
                >
                  My Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Logout</NavDropdown.Item>
              </NavDropdown>
            </Container>
          </Navbar>
          <Button variant="outline-light" onClick={toggleShow} className="me-2">
            <AiOutlineCaretRight />
          </Button>
          <Offcanvas show={show} onHide={handleClose} {...props}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              Some text as placeholder. In real life you can have the elements
              you have chosen. Like, text, images, lists, etc.
            </Offcanvas.Body>
          </Offcanvas>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

function Example() {
  return (
    <>
      {options.map((props, idx) => (
        <NavbarComp key={idx} {...props} />
      ))}
    </>
  );
}

export default NavbarComp;
