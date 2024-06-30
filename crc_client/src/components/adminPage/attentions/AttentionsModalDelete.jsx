// React
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

// Bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

// Api
import { deleteAttention } from "../../../api/attention";

export function AttentionsModalDelete({
    show,
    handleClose,
    setAlertType,
    setAlertText,
    setShowAlert,
    closeSession,
    programs,
    kines,
    clients,
    defaultValues,
}) {
    // Botones se cambian en cargando
    const [loading, setLoading] = useState(false);

    // Seleccion de paciente
    const [clientSelected, setClientSelected] = useState(false);

    // Deshabilitar paciente
    const [disableClient, setDisableClient] = useState(false);

    // ID del paciente (valor real del paciente)
    const [clientID, setClientID] = useState("");

    // ID del kine (valor real del kine)
    const [kineID, setKineID] = useState("");

    // ID del program (valor real del program)
    const [programID, setPogramID] = useState("");

    // UseForm para formulario
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
        watch,
        reset,
    } = useForm();

    useEffect(() => {
        reset(defaultValues);
        setDisableClient(true);
        setClientSelected(true);

        setPogramID(defaultValues.programID);
        setKineID(defaultValues.kineID);
        setClientID(defaultValues.clientID);
    }, [defaultValues, reset]);

    useEffect(() => {
        setAlertType("");
        setAlertText("");
        setShowAlert(false);
    }, []);

    // Handler para eliminar atención
    const onSubmit = handleSubmit(async (values) => {
        setLoading(true);
        const backendValidation = async () => {
            try {
                const res = await deleteAttention(defaultValues._id);
                setLoading(false);
                setAlertType("success");
                setAlertText("Atención eliminada correctamente");
                setShowAlert(true);
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

    const onChangeProgram = (event) => {
        setPogramID(event.target.options[event.target.selectedIndex].id);
    };

    const onChangeKine = (event) => {
        setKineID(event.target.options[event.target.selectedIndex].id);
    };

    useEffect(() => {
        if (clientSelected) {
            setDisableClient(true);
        }
    }, [watch("client")]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Form className="p-2" onSubmit={onSubmit}>
                <Modal.Header closeButton disabled={loading}>
                    <Modal.Title>Eliminar atención</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="program">
                        <Form.Label>Programa</Form.Label>
                        <select
                            disabled
                            type="text"
                            className={
                                errors.program
                                    ? "form-control is-invalid"
                                    : "form-control"
                            }
                            {...register("program", {
                                required: {
                                    value: true,
                                    message: "Se requiere un programa",
                                },
                            })}
                            onChange={onChangeProgram}
                        >
                            <option value="">Seleccionar programa...</option>
                            {programs.map((program) => (
                                <option
                                    key={program._id}
                                    id={program._id}
                                    value={program.name}
                                >
                                    {program.name}
                                </option>
                            ))}
                        </select>

                        <span className="text-danger">
                            {errors.program && errors.program.message}
                        </span>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="kine">
                        <Form.Label>Kinesiólogo</Form.Label>
                        <select
                            disabled
                            type="text"
                            className={
                                errors.kine
                                    ? "form-control is-invalid"
                                    : "form-control"
                            }
                            {...register("kine", {
                                required: {
                                    value: true,
                                    message: "Se requiere un kinesiólogo",
                                },
                            })}
                            onChange={onChangeKine}
                        >
                            <option value="">Seleccionar kinesiólogo...</option>
                            {kines.map((kine) => (
                                <option
                                    key={kine._id}
                                    id={kine._id}
                                    value={kine.name}
                                >
                                    {kine.name}
                                </option>
                            ))}
                        </select>

                        <span className="text-danger">
                            {errors.kine && errors.kine.message}
                        </span>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="client">
                        <div>
                            <Form.Label>Paciente</Form.Label>
                        </div>
                        <div className="attentions-pacient-form">
                            <input
                                disabled
                                type="text"
                                placeholder="Buscar paciente..."
                                className={
                                    errors.client
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }
                                autoComplete="off"
                                {...register("client", {
                                    required: {
                                        value: true,
                                        message: "Se requiere un paciente",
                                    },
                                })}
                            />
                        </div>
                        <span className="text-danger">
                            {errors.client && errors.client.message}
                        </span>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="date">
                        <Form.Label>Fecha</Form.Label>
                        <input
                            disabled
                            type="date"
                            className={
                                errors.date
                                    ? "form-control is-invalid"
                                    : "form-control"
                            }
                            {...register("date", {
                                required: {
                                    value: true,
                                    message: "Se requiere una fecha",
                                },
                            })}
                        />
                        <span className="text-danger">
                            {errors.date && errors.date.message}
                        </span>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="hour">
                        <Form.Label>Hora</Form.Label>
                        <select
                            disabled
                            className={
                                errors.hour
                                    ? "form-control is-invalid"
                                    : "form-control"
                            }
                            {...register("hour", {
                                required: {
                                    value: true,
                                    message: "Se requiere una hora",
                                },
                            })}
                        >
                            <option key={8} value="">
                                Seleccionar una hora...
                            </option>
                            <option key={8} value={`08:00`}>
                                08:00
                            </option>
                            <option key={9} value={`09:00`}>
                                09:00
                            </option>
                            <option key={10} value={`10:00`}>
                                10:00
                            </option>
                            <option key={11} value={`11:00`}>
                                11:00
                            </option>
                            <option key={12} value={`12:00`}>
                                12:00
                            </option>
                            <option key={13} value={`13:00`}>
                                13:00
                            </option>
                            <option key={14} value={`14:00`}>
                                14:00
                            </option>
                            <option key={15} value={`15:00`}>
                                15:00
                            </option>
                            <option key={16} value={`16:00`}>
                                16:00
                            </option>
                            <option key={17} value={`17:00`}>
                                17:00
                            </option>
                            <option key={18} value={`18:00`}>
                                18:00
                            </option>
                            <option key={19} value={`19:00`}>
                                19:00
                            </option>
                            <option key={20} value={`20:00`}>
                                20:00
                            </option>
                            <option key={21} value={`21:00`}>
                                21:00
                            </option>
                            <option key={22} value={`22:00`}>
                                22:00
                            </option>
                            <option key={23} value={`23:00`}>
                                23:00
                            </option>
                        </select>
                        <span className="text-danger">
                            {errors.hour && errors.hour.message}
                        </span>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="state">
                        <Form.Label>Estado</Form.Label>
                        <select
                            disabled
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
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Descripción (opcional)</Form.Label>
                        <textarea
                            disabled
                            className={
                                errors.description
                                    ? "form-control is-invalid attentions-rounded"
                                    : "form-control attentions-rounded"
                            }
                            {...register("description")}
                        ></textarea>
                        <span className="text-danger">
                            {errors.description && errors.description.message}
                        </span>
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
                    <Button variant="danger" type="submit" disabled={loading}>
                        {loading ? "Cargando.." : "Eliminar"}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}
