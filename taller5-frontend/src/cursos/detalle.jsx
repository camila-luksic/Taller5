import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Card, ListGroup,Col,Row } from "react-bootstrap";
import NavMenu from "../components/navMenu";

const CursoDetalles = () => {
  const { id } = useParams(); // Obtener el ID del curso desde la URL
  const [curso, setCurso] = useState(null);

  useEffect(() => {
    // Obtener los detalles del curso por el ID
    axios
      .get(`http://localhost:3005/cursos/${id}`)
      .then((res) => {
        setCurso(res.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener el curso:", error);
      });
  }, [id]);

  // Función simple para extraer el ID de YouTube de la URL
  const extractYouTubeId = (url) => {
    const videoId = url.split("v=")[1];
    return videoId ? videoId.split("&")[0] : null;
  };

  if (!curso) {
    return <div>Cargando...</div>;
  }

  return (
    <Container>
         <NavMenu/>
      <h1 className="mt-4 mb-4">{curso.nombre}</h1>

<Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg rounded-lg">
            {/* Imagen del curso */}
            <Card.Img
              variant="top"
              src={`http://localhost:3005/cursos/${curso.id}.jpg`}  // Cambia esta URL si es necesario
              alt={curso.nombre}
              className="img-fluid rounded-top"
              style={{ height: "300px", objectFit: "cover" }} // Ajusta el tamaño de la imagen según sea necesario
            />
      <Card>
        <Card.Body>
          <Card.Title>{curso.nombre}</Card.Title>
          <Card.Text>{curso.descripcion}</Card.Text>

          <h3>Videos del Curso</h3>
          <ListGroup variant="flush">
            {curso.videos?.map((video) => {
              const videoId = extractYouTubeId(video.url_video);
              return (
                <ListGroup.Item key={video.id}>
                  <h5>{video.titulo}</h5>
                  <div>
                    {videoId ? (
                      <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={video.titulo}
                        frameBorder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <p>Video no disponible</p>
                    )}
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Card.Body>
      </Card>
      </Card>
      </Col>
      </Row>
    </Container>
  );
};

export default CursoDetalles;
