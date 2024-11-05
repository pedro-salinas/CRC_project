// React
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

// Bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";

// Api
import { createMultiplesAttentions } from "../../../api/attention";

// Bootstrap icons
import { XLg } from "react-bootstrap-icons";

// Estilo
import "./Calendar.css";

export function AttentionsCalendarModalInsertMultipleSameDate({
    show,
    handleClose,
    setAlertType,
    setAlertText,
    setShowAlert,
    closeSession,
    programs,
    kines,
    clients,
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
        setValue,
        unregister,
        watch,
    } = useForm();

    useEffect(() => {
        setAlertType("");
        setAlertText("");
        setShowAlert(false);
    }, []);

    // Handler para ingresar atención
    const onSubmit = handleSubmit(async (values) => {
        setLoading(true);

        // Asegurar que existe un paciente válido escogido
        if (clientID == "") {
            setError("client", {
                type: "custom",
                message: "Escoja un paciente válido",
            });
            setLoading(false);
            return;
        }

        const backendValidation = async () => {
            try {
                const hour = Number(values.hour);
                const allDates = [];

                const year = Number(values.date.split("-")[0]);
                const month = Number(values.date.split("-")[1]);
                const day = Number(values.date.split("-")[2]);

                for (let index = 0; index < values.repeats; index++) {
                    const auxDate = new Date(year, month - 1, day);
                    auxDate.setDate(auxDate.getDate() + 7 * index);

                    const auxDateFormat = auxDate.toISOString().split("T")[0];
                    const auxArray = [
                        Number(auxDateFormat.split("-")[2]),
                        Number(auxDateFormat.split("-")[1]),
                        Number(auxDateFormat.split("-")[0]),
                        hour,
                    ];

                    allDates.push(auxArray);
                }

                delete values.date;
                delete values.hour;
                delete values.program;
                delete values.kine;
                delete values.client;

                const data = {
                    ...values,
                    program: programID,
                    kine: kineID,
                    client: clientID,
                    hour: hour,
                    day: day,
                    month: month,
                    year: year,
                    blocked: false,
                    allDates: allDates,
                };

                const res = await createMultiplesAttentions(data);

                setLoading(false);
                setAlertType("success");
                setAlertText("Atención ingresada correctamente");
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
        }, 50);
    });

    const onSearchClient = (searchTerm, _id) => {
        if (!clientSelected) {
            setValue("client", searchTerm);
            setClientSelected(true);

            setClientID(_id);
        }
    };

    const cleanClient = () => {
        setValue("client", "");
        setClientID("");
        setDisableClient(false);
        setClientSelected(false);
    };

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

    const onHideClear = () => {
        cleanClient();
        Object.keys(watch()).forEach((name) => setValue(name, ""));
        Object.keys(watch()).forEach((name) => unregister(name));
    };

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
                    <Modal.Title>Ingresar atención</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="program">
                        <Form.Label>Programa</Form.Label>
                        <select
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
                        <Form.Label>Especialista</Form.Label>
                        <select
                            type="text"
                            className={
                                errors.kine
                                    ? "form-control is-invalid"
                                    : "form-control"
                            }
                            {...register("kine", {
                                required: {
                                    value: true,
                                    message: "Se requiere un especialista",
                                },
                            })}
                            onChange={onChangeKine}
                        >
                            <option value="">
                                Seleccionar especialista...
                            </option>
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
                                type="text"
                                placeholder="Buscar paciente..."
                                disabled={disableClient}
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

                            {disableClient && (
                                <Button
                                    variant=""
                                    className="br-5 attentions-pacient-close-button"
                                >
                                    <XLg
                                        size={15}
                                        color="grey"
                                        onClick={cleanClient}
                                    />
                                </Button>
                            )}
                        </div>
                        <Dropdown className="attentions-select-container">
                            {!clientSelected &&
                                clients
                                    .filter((item) => {
                                        const normalizeString = (str) =>
                                            str
                                                .normalize("NFD")
                                                .replace(/[\u0300-\u036f]/g, "")
                                                .toLowerCase(); // Normaliza y convierte a minúsculas

                                        const searchTerm = watch("client")
                                            ?.trimStart()
                                            .toLowerCase();

                                        if (searchTerm === undefined) {
                                            return;
                                        }

                                        const normalizedSearchTerm =
                                            normalizeString(searchTerm);
                                        const normalizedClientName =
                                            normalizeString(item.name);

                                        return (
                                            searchTerm &&
                                            normalizedClientName.includes(
                                                normalizedSearchTerm
                                            )
                                        );
                                    })
                                    .slice(0, 5)
                                    .map((item) => (
                                        <Dropdown.Item
                                            className="form-control attentions-select-option"
                                            onClick={() =>
                                                onSearchClient(
                                                    item.name,
                                                    item._id
                                                )
                                            }
                                            key={item._id}
                                        >
                                            {item.name}
                                            {"   "}({item.rut})
                                        </Dropdown.Item>
                                    ))}
                        </Dropdown>
                        <span className="text-danger">
                            {errors.client && errors.client.message}
                        </span>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="date">
                        <Form.Label>Fecha</Form.Label>
                        <input
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
                            <option key={8} value={`8`}>
                                08:00
                            </option>
                            <option key={9} value={`9`}>
                                09:00
                            </option>
                            <option key={10} value={`10`}>
                                10:00
                            </option>
                            <option key={11} value={`11`}>
                                11:00
                            </option>
                            <option key={12} value={`12`}>
                                12:00
                            </option>
                            <option key={13} value={`13`}>
                                13:00
                            </option>
                            <option key={14} value={`14`}>
                                14:00
                            </option>
                            <option key={15} value={`15`}>
                                15:00
                            </option>
                            <option key={16} value={`16`}>
                                16:00
                            </option>
                            <option key={17} value={`17`}>
                                17:00
                            </option>
                            <option key={18} value={`18`}>
                                18:00
                            </option>
                            <option key={19} value={`19`}>
                                19:00
                            </option>
                            <option key={20} value={`20`}>
                                20:00
                            </option>
                            <option key={21} value={`21`}>
                                21:00
                            </option>
                            <option key={22} value={`22`}>
                                22:00
                            </option>
                            <option key={23} value={`23`}>
                                23:00
                            </option>
                        </select>
                        <span className="text-danger">
                            {errors.hour && errors.hour.message}
                        </span>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="repeats">
                        <Form.Label>Número de semanas a repetir</Form.Label>
                        <input
                            type="number"
                            className={
                                errors.repeats
                                    ? "form-control is-invalid"
                                    : "form-control"
                            }
                            {...register("repeats", {
                                required: {
                                    value: true,
                                    message:
                                        "Se requiere el número de semanas a repetir",
                                },
                                validate: (value) => {
                                    // Restringir el número de repeticiones
                                    if (value >= 1 && value <= 29) {
                                        return true;
                                    } else {
                                        return "Número no valido";
                                    }
                                },
                            })}
                        />
                        <span className="text-danger">
                            {errors.repeats && errors.repeats.message}
                        </span>
                    </Form.Group>
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
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Descripción (opcional)</Form.Label>
                        <textarea
                            rows="5"
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
                        onClick={() => {
                            onHideClear();
                            handleClose();
                        }}
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
