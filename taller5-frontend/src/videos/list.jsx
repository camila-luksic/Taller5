import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavMenu from "../components/navMenu";

const Listavideoss = () => {
    const [Listavideoss, setListavideoss] = useState([]);
    useEffect(() => {
        getListavideoss();
        document.title = "NetAcademy";
    }, []) 

    const getListavideoss = () => {
        axios.get('http://localhost:3005/videos/')
            .then(res => {
                setListavideoss(res.data);
                // console.log(res.data);
            }).catch(error => {
                console.log(error);
            });
    }
    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar el registro?");
        if (!confirm) {
            return;
        }
        axios.delete(`http://localhost:3005/videos/${id}`)
            .then(res => {
                console.log(res.data);
                getListavideoss();
            }).catch(error => {
                console.log(error);
            });
    }

    return (
        <>
         <NavMenu/>
            <Container className="mt-3 mb-3">
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h2>Lista de videoss</h2>
                                </Card.Title>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Titulo</th>
                                            <th>Url</th>
                                            <th>Curso</th>
                                            <th>Orden</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Listavideoss.map(videos =>
                                            <tr key={videos.id}>
                                                <td>{videos.id}</td>
                                                <td>{videos.titulo}</td>
                                                <td>{videos.url_video}</td>
                                                <td>{videos.curso_id}</td>
                                                <td>{videos.orden_video}</td>
                                                <td><Link className="btn btn-primary" to={"/videos/" + videos.id}>Editar</Link></td>
                                                <td><Link className="btn btn-info" to={"/videos/" + videos.id+ '/foto'}>Agregar Foto</Link></td>
                                                <td><Button variant="danger" onClick={() => { eliminar(videos.id) }}>Eliminar</Button></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container >
        </>
    );
}

export default Listavideoss;