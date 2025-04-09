import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavMenu from "../components/navMenu";

const Formcurso = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [validated, setValidated] = useState(false);
    const [categorias, setcategorias] = useState([]);
    const [categoria_id, setCategoria_id] = useState('');

    useEffect(() => {
        if (id) {
            getcursoById();
        }
        getcategorias();
    }, [id]);

    const getcursoById = () => {
        axios.get(`http://localhost:3005/cursos/${id}`)
            .then(res => {
                const curso = res.data;
                setNombre(curso.nombre);
                setDescripcion(curso.descripcion);
                setCategoria_id(curso.categoria_id); 
            }).catch(error => {
                console.log(error);
            });
    };

    const getcategorias = () => {
        axios.get('http://localhost:3005/categorias')
            .then(res => {
                setcategorias(res.data);
            }).catch(error => {
                console.log(error);
            });
    };

    const onChangeNombre = (e) => {
        setNombre(e.target.value);
    };
    const onChangeDescripcion = (e) => {
        setDescripcion(e.target.value);
    };

    const onChangecategoria = (e) => {
        setCategoria_id(e.target.value);
    };

    const onGuardarClick = (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        const curso = { nombre,descripcion, categoria_id };

        if (id) {
            editcurso(curso);
        } else {
            insertcurso(curso);
        }
    };

    const editcurso = (curso) => {
        axios.put(`http://localhost:3005/cursos/${id}`, curso)
            .then(res => {
                console.log(res.data);
                navigate('/');
            }).catch(error => {
                console.log(error);
            });
    };

    const insertcurso = (curso) => {
        axios.post('http://localhost:3005/cursos', curso)
            .then(res => {
                console.log(res.data);
                navigate('/');
            }).catch(error => {
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
                                <h2>Formulario de curso </h2>
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

                                <Form.Group>
                                    <Form.Label>Descripcion:</Form.Label>
                                    <Form.Control
                                        required
                                        value={descripcion}
                                        type="text"
                                        onChange={onChangeDescripcion}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Por favor ingrese un descripcion.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                
                                <Form.Group className="mt-3">
                                    <Form.Label>categoria:</Form.Label>
                                    <Form.Select
                                        required
                                        value={categoria_id}
                                        onChange={onChangecategoria}
                                    >
                                        <option value="">Seleccione un categoria</option>
                                        {categorias.map((categoria) => (
                                            <option key={categoria.id} value={categoria.id}>
                                                {categoria.nombre}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Por favor seleccione un categoria.
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

export default Formcurso;