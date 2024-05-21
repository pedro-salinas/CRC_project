import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

// Importar API
import { insertUserRequest } from "../../../api/user";

export function UsersModalInsert({
    show,
    handleClose,
    setAlertType,
    setAlertText,
    setShowAlert,
    closeSession,
}) {
    // Botones se cambian en cargando
    const [loading, setLoading] = useState(false);

    // UseForm para formulario
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
        watch,
    } = useForm();

    useEffect(() => {
        setAlertType("");
        setAlertText("");
        setShowAlert(false);
    }, []);

    // Handler del ingresar usuario
    const onSubmit = handleSubmit(async (values) => {
        // Formato booleano
        values.is_staff = values.is_staff === "true" ? true : false;

        setLoading(true);
        const backendValidation = async () => {
            try {
                const res = await insertUserRequest(values);

                setLoading(false);

                setAlertType("success");
                setAlertText("Usuario ingresado correctamente");
                setShowAlert(true);

                handleClose();
            } catch (error) {
                console.log(error);
                if (error.response.status === 400) {
                    // Fallo anterior al controlador
                    let backendErrors;

                    if (error.response.data.error !== undefined) {
                        // Error de zod
                        backendErrors = error.response.data.error;
                    } else if (error.response.data.message !== undefined) {
                        // Error de validación (middlewares)
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
                } else if (error.response.status === 500) {
                    // Fallo del controlador
                    if (error.response.data.message.code == 11000) {
                        // Error de duplicacion
                        const field = Object.keys(
                            error.response.data.message.keyValue
                        )[0];

                        const fieldsObj = { email: "Correo", rut: "Rut" };
                        const errorMessage =
                            fieldsObj[field] + " ya se encuentra en uso";

                        setError(field, {
                            type: "custom",
                            message: errorMessage,
                        });
                    } else {
                        closeSession();
                    }
                } else if (error.response.status === 401) {
                    closeSession();
                } else {
                    closeSession();
                }
                setLoading(false);
            }
        };
        setTimeout(() => {
            backendValidation();
        }, 500);
    });

    return (
        <Modal show={show} onHide={handleClose}>
            <Form className="p-2" onSubmit={onSubmit}>
                <Modal.Header closeButton disabled={loading}>
                    <Modal.Title>Ingresar usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="email">
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
                        />
                        <span className="text-danger">
                            {errors.email && errors.email.message}
                        </span>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="rut">
                        <Form.Label>RUT</Form.Label>
                        <input
                            type="text"
                            className={
                                errors.rut
                                    ? "form-control is-invalid"
                                    : "form-control"
                            }
                            {...register("rut", {
                                required: {
                                    value: true,
                                    message: "Se requiere un rut",
                                },
                            })}
                        />
                        <span className="text-danger">
                            {errors.rut && errors.rut.message}
                        </span>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Nombre</Form.Label>
                        <input
                            type="text"
                            className={
                                errors.name
                                    ? "form-control is-invalid"
                                    : "form-control"
                            }
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: "Se requiere un nombre",
                                },
                            })}
                        />
                        <span className="text-danger">
                            {errors.name && errors.name.message}
                        </span>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="phone">
                        <Form.Label>Teléfono</Form.Label>
                        <input
                            type="number"
                            className={
                                errors.phone
                                    ? "form-control is-invalid"
                                    : "form-control"
                            }
                            {...register("phone", {
                                required: {
                                    value: true,
                                    message: "Se requiere un teléfono",
                                },
                            })}
                        />
                        <span className="text-danger">
                            {errors.phone && errors.phone.message}
                        </span>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
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
                                    message: "Se requiere una contraseña",
                                },
                            })}
                        />
                        <span className="text-danger">
                            {errors.password && errors.password.message}
                        </span>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password2">
                        <Form.Label>Confirmar contraseña</Form.Label>
                        <input
                            type="password"
                            className={
                                errors.password2
                                    ? "form-control is-invalid"
                                    : "form-control"
                            }
                            {...register("password2", {
                                required: {
                                    value: true,
                                    message: "Se requiere una contraseña",
                                },
                                validate: (value) => {
                                    if (value === watch("password")) {
                                        return true;
                                    } else {
                                        return "Las contraseñas no coinciden";
                                    }
                                },
                            })}
                        />
                        <span className="text-danger">
                            {errors.password2 && errors.password2.message}
                        </span>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="is_staff">
                        <Form.Label>Permisos del usuario</Form.Label>

                        <div className="form-check">
                            <input
                                name="is_staff"
                                type="checkbox"
                                value="true"
                                className="form-check-input"
                                {...register("is_staff")}
                            />
                            <label class="form-check-label">Staff</label>
                        </div>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleClose}
                        disabled={loading}
                    >
                        Cerrar
                    </Button>
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? "Cargando.." : "Ingresar"}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}
