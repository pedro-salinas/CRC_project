// React
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

// Bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

// Api
import { updateProfile } from "../../../api/profile";

export function ProfilesModalModify({
    show,
    handleClose,
    setAlertType,
    setAlertText,
    setShowAlert,
    defaultValues,
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
        reset,
        watch,
    } = useForm(defaultValues);

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    useEffect(() => {
        setAlertType("");
        setAlertText("");
        setShowAlert(false);
    }, []);

    // Handler de modificar perfiles
    const onSubmit = handleSubmit(async (values) => {
        setLoading(true);
        const backendValidation = async () => {
            try {
                let newVariables = [];
                let newName = "";
                Object.keys(values).forEach((key) => {
                    const split = key.split("-")[0];

                    if (split == "name") {
                        newName = values[key];
                    }

                    if (split == "variable") {
                        newVariables.push(values[key]);
                    }
                });

                const data = { name: newName, variables: newVariables };

                const res = await updateProfile(values._id, data);

                setLoading(false);

                setAlertType("success");
                setAlertText("Perfil modificado correctamente");
                setShowAlert(true);

                handleClose();
            } catch (error) {
                if (error.response.status === 400) {
                    let backendErrors;

                    if (error.response.data.error !== undefined) {
                        // Error de zod
                        backendErrors = error.response.data.error;
                    } else if (error.response.data.message !== undefined) {
                        // Error de validación
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

                        const fieldsObj = {
                            email: "Correo",
                            rut: "Rut",
                            color: "Color",
                            name: "Nombre",
                        };
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
                    <Modal.Title>Modificar perfil</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                    <Form.Group className="mb-3" controlId="variable">
                        <Form.Label>Variable 1</Form.Label>
                        <input
                            type="number"
                            className={
                                errors.variable
                                    ? "form-control is-invalid"
                                    : "form-control"
                            }
                            {...register("variable", {
                                required: {
                                    value: true,
                                    message: "Se requiere una variable",
                                },
                            })}
                        />
                        <span className="text-danger">
                            {errors.variable && errors.variable.message}
                        </span>
                    </Form.Group>
                    {[...Array(defaultValues.variables)].map((_, index) => (
                        <Form.Group
                            key={index}
                            className="mb-3"
                            controlId={`variable-${index}`}
                        >
                            <Form.Label>Variable {index + 2}</Form.Label>
                            <input
                                type="number"
                                className={
                                    errors[`variable-${index}`]
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }
                                {...register(`variable-${index}`, {
                                    required: {
                                        value: true,
                                        message: "Se requiere una variable",
                                    },
                                })}
                            />
                            <span className="text-danger">
                                {errors[`variable-${index}`] &&
                                    errors[`variable-${index}`].message}
                            </span>
                        </Form.Group>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleClose}
                        disabled={loading}
                    >
                        Cerrar
                    </Button>
                    <Button variant="warning" type="submit" disabled={loading}>
                        {loading ? "Cargando.." : "Modificar"}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}
