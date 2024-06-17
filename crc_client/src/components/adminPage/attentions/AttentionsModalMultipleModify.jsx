// React
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

// Bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

// Api
import { updateAttention } from "../../../api/attention";

// Estilos
import "./styles.css";

export function AttentionsModalMultipleModify({
    show,
    handleClose,
    setAlertType,
    setAlertText,
    setShowAlert,
    closeSession,
    defaultValues,
    attentionsNumber,
}) {
    // Botones se cambian en cargando
    const [loading, setLoading] = useState(false);

    // UseForm para formulario
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
        setValue,
        unregister,
        watch,
    } = useForm();

    useEffect(() => {
        setAlertType("");
        setAlertText("");
        setShowAlert(false);
    }, []);

    const onHideClear = () => {
        Object.keys(watch()).forEach((name) => setValue(name, ""));
        Object.keys(watch()).forEach((name) => unregister(name));
    };

    // Handler para modificar atención
    const onSubmit = handleSubmit(async (values) => {
        setLoading(true);

        const backendValidation = async () => {
            try {
                for (const value of defaultValues) {
                    const data = {
                        ...value,
                        client: value.client._id,
                        kine: value.kine._id,
                        program: value.program._id,
                        state: values.state,
                    };
                    const res = await updateAttention(data._id, data);
                }

                setLoading(false);
                setAlertType("success");
                setAlertText("Atenciones modificadas correctamente");
                setShowAlert(true);
                onHideClear();
                handleClose();
            } catch (error) {
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
        <Modal
            show={show}
            onHide={() => {
                onHideClear();
                handleClose();
            }}
        >
            <Form className="p-2" onSubmit={onSubmit}>
                <Modal.Header closeButton disabled={loading}>
                    <Modal.Title>
                        Modfificando <strong> {attentionsNumber}</strong>{" "}
                        atenciones
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="state">
                        <Form.Label>Estado</Form.Label>
                        <select
                            className={
                                errors.state
                                    ? "form-select is-invalid"
                                    : "form-select"
                            }
                            {...register("state", {
                                required: {
                                    value: true,
                                    message: "Se requiere un estado",
                                },
                            })}
                        >
                            <option value="">Seleccionar un estado...</option>
                            {["pendiente", "pagado"].map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <span className="text-danger">
                            {errors.state && errors.state.message}
                        </span>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            onHideClear();
                            handleClose();
                        }}
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
