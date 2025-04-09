import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavMenu from "../components/navMenu";

const Formvideo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [titulo, settitulo] = useState("");
  const [url_video, setUrl_video] = useState("");
  const [orden_video, setOrden_video] = useState("");
  const [validated, setValidated] = useState(false);
  const [cursos, setcursos] = useState([]);
  const [curso_id, setCurso_id] = useState("");

  useEffect(() => {
    if (id) {
      getvideoById();
    }
    getcursos();
  }, [id]);

  const getvideoById = () => {
    axios
      .get(`http://localhost:3005/videos/${id}`)
      .then((res) => {
        const video = res.data;
        settitulo(video.titulo);
        setUrl_video(video.url_video);
        setOrden_video(video.orden_video);
        setCurso_id(video.curso_id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getcursos = () => {
    axios
      .get("http://localhost:3005/cursos/")
      .then((res) => {
        setcursos(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChangetitulo = (e) => {
    settitulo(e.target.value);
  };
  const onChangeUrl_video = (e) => {
    setUrl_video(e.target.value);
  };
  const onChangeOrden = (e) => {
    setOrden_video(e.target.value);
  };
  const onChangecurso = (e) => {
    setCurso_id(e.target.value);
  };

  const onGuardarClick = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
     // Convierte orden_video a un número
  const orden_video_numero = Number(orden_video);

  // Verifica que el valor de orden_video sea un número válido
  if (isNaN(orden_video_numero)) {
    alert("Por favor, ingrese un número válido en el campo de orden.");
    return;
  }


    const video = { titulo,url_video,orden_video:orden_video_numero ,curso_id };

    if (id) {
      editvideo(video);
    } else {
      insertvideo(video);
    }
  };

  const editvideo = (video) => {
    axios
      .put(`http://localhost:3005/videos/${id}`, video)
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const insertvideo = (video) => {
    axios
      .post("http://localhost:3005/videos", video)
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
                <h2>Formulario de video </h2>
              </Card.Title>
              <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                <Form.Group>
                  <Form.Label>titulo:</Form.Label>
                  <Form.Control
                    required
                    value={titulo}
                    type="text"
                    onChange={onChangetitulo}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor ingrese un titulo.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label>url:</Form.Label>
                  <Form.Control
                    required
                    value={url_video}
                    type="text"
                    onChange={onChangeUrl_video}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor ingrese una url.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Nro de orden:</Form.Label>
                  <Form.Control
                    required
                    value={orden_video}
                    type="number"
                    onChange={onChangeOrden}
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor ingrese un nr de orden.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Label>curso:</Form.Label>
                  <Form.Select
                    required
                    value={curso_id}
                    onChange={onChangecurso}
                  >
                    <option value="">Seleccione un curso</option>
                    {cursos.map((curso) => (
                      <option key={curso.id} value={curso.id}>
                        {curso.nombre}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Por favor seleccione un curso.
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

export default Formvideo;
