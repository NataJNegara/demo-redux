import { Container, NavDropdown, Badge, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { IoLogIn, IoPersonAdd } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout } from "../slices/authSlices";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [logoutApiCall, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <header>
      <Navbar
        expand="lg"
        bg="dark"
        data-bs-theme="dark"
        className="bg-body-tertiary">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>MERN - AUTH REDUX</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {!userInfo ? (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <IoLogIn />
                      Sign In
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/register">
                    <Nav.Link>
                      <IoPersonAdd /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              ) : (
                <>
                  <NavDropdown title={userInfo.username} id="nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
