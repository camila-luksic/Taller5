import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavMenu from "../components/navMenu";

const Listacategorias = () => {
    const [Listacategorias, setListacategorias] = useState([]);
    useEffect(() => {
        getListacategorias();
        document.title = "NetAcademy";
    }, []) 

    const getListacategorias = () => {
        axios.get('http://localhost:3005/categorias/')
            .then(res => {
                setListacategorias(res.data);
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
        axios.delete(`http://localhost:3005/categorias/${id}`)
            .then(res => {
                console.log(res.data);
                getListacategorias();
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
                                    <h2>Lista de categorias</h2>
                                </Card.Title>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Listacategorias.map(categoria =>
                                            <tr key={categoria.id}>
                                                <td>{categoria.id}</td>
                                                <td>{categoria.nombre}</td>
                                                <td><Link className="btn btn-primary" to={"/categoria/" + categoria.id}>Editar</Link></td>
                                                <td><Link className="btn btn-info" to={"/categoria/" + categoria.id+ '/foto'}>Agregar Foto</Link></td>
                                                <td><Button variant="danger" onClick={() => { eliminar(categoria.id) }}>Eliminar</Button></td>
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

export default Listacategorias;