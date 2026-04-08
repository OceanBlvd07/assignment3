import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { readToken, removeToken } from "@/lib/authenticate";

import { useEffect, useState } from "react";

export default function MainNav() {
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(readToken());
  }, []);

  const userName = token?.userName;

  const logout = () => {
    removeToken();
    router.push("/login");
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="fixed-top">
        <Container>
          <Navbar.Brand as={Link} href="/">Marko Andrukhiv</Navbar.Brand>

          <Navbar.Toggle />

          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link as={Link} href="/about">About</Nav.Link>
            </Nav>

            {token ? (
              <Nav>
                <NavDropdown title={userName || "Account"} id="user-nav-dropdown" align="end">
                  <NavDropdown.Item as={Link} href="/favourites">Favourites</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>Log out</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <Nav>
                <Nav.Link as={Link} href="/register">Register</Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>

        </Container>
      </Navbar>

      <br />
      <br />
    </>
  );
}