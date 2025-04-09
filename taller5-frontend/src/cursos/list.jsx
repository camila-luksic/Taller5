import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavMenu from "../components/navMenu";

const Listacursoss = () => {
    const [Listacursoss, setListacursoss] = useState([]);
    useEffect(() => {
        getListacursoss();
        document.title = "Net Academy";
    }, []) 

    const getListacursoss = () => {
        axios.get('http://localhost:3005/cursos/')
            .then(res => {
                setListacursoss(res.data);
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
        axios.delete(`http://localhost:3005/cursos/${id}`)
            .then(res => {
                console.log(res.data);
                getListacursoss();
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
                                    <h2>Lista de cursos</h2>
                                </Card.Title>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Descripcion</th>
                                            <th>Categoria</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Listacursoss.map(cursos =>
                                            <tr key={cursos.id}>
                                                <td>{cursos.id}</td>
                                                <td>{cursos.nombre}</td>
                                                <td>{cursos.descripcion}</td>
                                                <td>{cursos.categoria_id}</td>
                                                <td><Link className="btn btn-primary" to={"/cursos/" + cursos.id}>Editar</Link></td>
                                                <td><Link className="btn btn-info" to={"/cursos/" + cursos.id+ '/foto'}>Agregar Foto</Link></td>
                                                <td><Button variant="danger" onClick={() => { eliminar(cursos.id) }}>Eliminar</Button></td>
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

export default Listacursoss;