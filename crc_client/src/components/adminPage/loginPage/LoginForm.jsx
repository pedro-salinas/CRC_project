// React
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

// Router
import { useNavigate } from "react-router-dom";

// Bootstrap
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";

// Contexto
import { useUserContext } from "../../../context/userContext";

// Api
import { loginRequest } from "../../../api/user";

// Imagenes
import logo from "../../../assets/logo.webp";

// Utilidad para saber si es que estamos en movil o no
import { MobileHandler } from "../../../utils/MobileHandler";

export function LoginForm() {
    const { isAuthenticated, setIsAuthenticated, user, setUser } =
        useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/admin", { replace: true });
        }
    }, [isAuthenticated]);

    const { isMobile } = MobileHandler();

    // Padding para movil o navegador
    const widthImage = {
        width: isMobile ? "180px" : "450px",
    };

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();

    const onSubmit = handleSubmit(async (values) => {
        setLoading(true);
        const backendValidation = async () => {
            try {
                const res = await loginRequest(values);

                if (!res.data.is_admin && !res.data.is_staff) {
                    setError("email", {
                        type: "custom",
                        message: "Usuario sin permisos para ingresar",
                    });

                    setIsAuthenticated(false);
                    setLoading(false);
                } else {
                    setUser(res.data);

                    setIsAuthenticated(true);
                    setLoading(false);
                    navigate("/admin", { replace: true });
                }
            } catch (error) {
                if (
                    error.response.status === 400 ||
                    error.response.status === 403 ||
                    error.response.status === 404
                ) {
                    let backendErrors;

                    if (error.response.data.error !== undefined) {
                        // Error de zod
                        backendErrors = error.response.data.error;
                    } else if (error.response.data.message !== undefined) {
                        // Error de validación rut, email
                        backendErrors = [error.response.data.message];
                    }

                    backendErrors.forEach((backendErr) => {
                        const field = backendErr[0];
                        const errorMessage = backendErr[1];
                        setError(field, {
                            type: "custom",
                            message: errorMessage,
                        });
                    });
                } else {
                    console.log(error);
                }
                setLoading(false);
            }
        };
        setTimeout(() => {
            backendValidation();
        }, 1000);
    });

    return (
        <Container className="pt-5 p-5">
            <Row className="pt-5 justify-content-center">
                <Col className="border shadow-lg" lg={6}>
                    <Row className="bg-light">
                        <Col className="p-2 text-center">
                            <Image src={logo} style={widthImage} />
                        </Col>
                    </Row>
                    <Row>
                        <Form className="p-5" noValidate onSubmit={onSubmit}>
                            <Row className="pb-5">
                                <h5>Ingreso a panel de administración</h5>
                            </Row>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                            >
                                <Form.Label>Correo electrónico</Form.Label>
                                <input
                                    type="email"
                                    className={
                                        errors.email
                                            ? "form-control is-invalid"
                                            : "form-control"
                                    }
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: "Se requiere un correo",
                                        },
                                    })}
                                    autoComplete="email"
                                />
                                <span className="text-danger">
                                    {errors.email && errors.email.message}
                                </span>
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicPassword"
                            >
                                <Form.Label>Contraseña</Form.Label>
                                <input
                                    type="password"
                                    className={
                                        errors.password
                                            ? "form-control is-invalid"
                                            : "form-control"
                                    }
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message:
                                                "Se requiere una contraseña",
                                        },
                                    })}
                                    autoComplete="current-password"
                                />
                                <span className="text-danger">
                                    {errors.password && errors.password.message}
                                </span>
                            </Form.Group>
                            <Row>
                                <Col className="text-end">
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? "Cargando.." : "Ingresar"}
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}
