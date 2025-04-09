import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavMenu from "../components/navMenu";

const Formcategoria = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nombre, setNombre] = useState("");
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (id) {
      getCategoriaById();
    }
  }, [id]);

  const getCategoriaById = () => {
    axios
      .get(`http://localhost:3005/categorias/${id}`)
      .then((res) => {
        const categoria = res.data;
        setNombre(categoria.nombre);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const onChangeNombre = (e) => {
    setNombre(e.target.value);
  };

  

  const onGuardarClick = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    const categoria = { nombre };

    if (id) {
      editcategoria(categoria);
    } else {
      insertcategoria(categoria);
    }
  };

  const editcategoria = (categoria) => {
    axios
      .put(`http://localhost:3005/categorias/${id}`, categoria)
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const insertcategoria = (categoria) => {
    axios
      .post("http://localhost:3005/categorias", categoria)
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
       <NavMenu/>
      <Row className="mt-3 mb-3">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>
                <h2>Formulario de Categoria </h2>
              </Card.Title>
              <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                <Form.Group>
                  <Form.Label>Nombre:</Form.Label>
                  <Form.Control
                    required
                    value={nombre}
                    type="text"
                    onChange={onChangeNombre}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor ingrese un nombre.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mt-3">
                  <Button type="submit">Guardar datos</Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Formcategoria;
