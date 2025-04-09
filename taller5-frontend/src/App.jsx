import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavMenu from "./components/navMenu";
const App = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener las categorías y cursos al cargar el componente
  useEffect(() => {
    axios
      .get("http://localhost:3005/categorias")  // Cambia esta URL por la correcta para obtener las categorías
      .then((res) => {
        setCategorias(res.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          setError(`Error en la respuesta de la API: ${error.response.status}`);
        } else if (error.request) {
          setError("No se recibió respuesta de la API. Verifique su conexión.");
        } else {
          setError(`Error en la solicitud: ${error.message}`);
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container>
        <h1 className="mt-4 mb-4">NetAcademy</h1>
        <div>Loading...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <h1 className="mt-4 mb-4">NetAcademy</h1>
        <div>{error}</div>
      </Container>
    );
  }

  return (
    <Container>
      <NavMenu/>
      <h1 className="mt-4 mb-4">NetAcademy</h1>
      <Row>
        {categorias.map((categoria) => (
          <Col key={categoria.id} md={4}>
            <Card className="mb-4">
              <Card.Header>{categoria.nombre}</Card.Header>
              <ListGroup variant="flush">
                {categoria.cursos.map((curso) => (
                  <ListGroup.Item key={curso.id}>
                    {/* Imagen del curso */}
                    <Card.Img
                      variant="top"
                      src={`http://localhost:3005/cursos/${curso.id}.jpg`}  // Cambia esta URL si es necesario
                      alt={curso.nombre}
                      className="img-fluid"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <Card.Body>
                      <Card.Title className="text-center mt-2">
                        <Link to={`/curso/${curso.id}`} className="text-decoration-none">
                          {curso.nombre}
                        </Link>
                      </Card.Title>
                      <Card.Text className="text-center">
                        {curso.descripcion}
                      </Card.Text>
                    </Card.Body>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default App;
