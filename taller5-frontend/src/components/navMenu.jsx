import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import './NavMenu.css';

const NavMenu = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="nav-container">
      <Container>
        <Navbar.Brand as={Link} to="/">NetAcademy</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <NavDropdown title="Cursos" id="dropdown-tipos">
              <NavDropdown.Item as={Link} to="/curso">Ver Cursos</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/createcurso">Crear Cursos</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Categorias" id="dropdown-tipos">
              <NavDropdown.Item as={Link} to="/categoria">Ver Categorias</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/createcategoria">Crear Categoria</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Videos" id="dropdown-habilidades">
              <NavDropdown.Item as={Link} to="/video">Ver Videos</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/createvideo">Crear Video</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavMenu;