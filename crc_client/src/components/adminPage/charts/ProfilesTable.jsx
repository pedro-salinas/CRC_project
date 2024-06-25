// React
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

// Bootstrap
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";

// Utilidad para saber si es que estamos en movil o no
import { MobileHandler } from "../../../utils/MobileHandler";

// Context
import { useUserContext } from "../../../context/userContext";

// Router
import { useNavigate } from "react-router-dom";

// Api
import { logout } from "../../../api/user";
import { getProfiles } from "../../../api/profile";

// Bootstrap icons
import {
    PersonAdd,
    ArrowClockwise,
    PencilSquare,
    XSquare,
} from "react-bootstrap-icons";

// React data table
import { Table } from "../DataTable";

// React data table config
import {
    columns,
    columnsForSelect,
} from "../../../utils/profilesDataTableConfigs";

// React chart
import { Radar } from "react-chartjs-2";

// Chart
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from "chart.js";

// Componentes del chart
ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

// Crear gráfico configuración
import { CreateChart } from "./CreateChart";

// Modales
import { ProfilesModalInsert } from "./ProfilesModalInsert";
import { ProfilesModalModify } from "./ProfilesModalModify";
import { ProfilesModalDelete } from "./ProfilesModalDelete";

export function ProfilesTable() {
    // Seleccion de un solo elemento
    const singleSelection = true;

    // UseForm para formulario
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
        unregister,
        watch,
        setValue,
    } = useForm();

    // Cargar tabla (tambien cargar los perfiles)
    const [loadingTable, setLoadingTable] = useState(true);

    function handleReload() {
        setLoadingTable(false);

        setTimeout(() => {
            getProfilesBackend();
        }, 500);
    }

    // Datos de la tabla
    const [tableData, setTableData] = useState([]);

    // Datos seleccionados de la tabla
    const [selectedRows, setSelectedRows] = useState([]);

    // Perfil seleccionado
    const [selectedProfile, setSelectedProfile] = useState();

    // Callback para manejar la selección de filas en el data table
    const handleRowSelection = (rows) => {
        setSelectedRows(rows);
        setSelectedProfile(rows);
    };

    // Cerrar sesión
    const navigate = useNavigate();

    const { setIsAuthenticated, setLoading, setUser, user } = useUserContext();

    function closeSession() {
        logout();
        setIsAuthenticated(false);
        setLoading(false);
        setUser(null);
        navigate("/admin/login", { replace: true });
    }

    function cleanAlert() {
        setAlertType("");
        setAlertText("");
        setShowAlert(false);
    }

    // Modal de ingreso
    const [showInsert, setShowInsert] = useState(false);

    const handleCloseInsert = () => {
        setSelectedRows([]);
        handleReload();
        setShowInsert(false);
    };
    const handleShowInsert = () => {
        setShowInsert(true);
        cleanAlert();
    };

    // Valores default para cada perfil
    const [defaultValues, setDefaultValues] = useState({});

    // Modal de modificar
    const [showModify, setShowModify] = useState(false);

    const handleCloseModify = () => {
        setSelectedRows([]);
        handleReload();
        setShowModify(false);
    };
    const handleShowModify = () => {
        if (selectedRows.length > 0) {
            selectedRows[0].variables.forEach((variable, index) => {
                if (index == 0) {
                    selectedRows[0][`variable`] = variable;
                } else {
                    selectedRows[0][`variable-${index - 1}`] = variable;
                }
            });

            // Limpiar grafico
            setSelectedProfile([]);

            setDefaultValues(selectedRows[0]);
            setShowModify(true);
        }
    };

    // Modal de eliminar
    const [showDelete, setShowDelete] = useState(false);

    const handleCloseDelete = () => {
        setSelectedRows([]);
        handleReload();
        setShowDelete(false);
    };
    const handleShowDelete = () => {
        if (selectedRows.length > 0) {
            selectedRows[0].variables.forEach((variable, index) => {
                if (index == 0) {
                    selectedRows[0][`variable`] = variable;
                } else {
                    selectedRows[0][`variable-${index - 1}`] = variable;
                }
            });

            // Limpiar grafico
            setSelectedProfile([]);

            setDefaultValues(selectedRows[0]);
            setShowDelete(true);
        }
    };

    // Alerta en tabla y mensaje
    const [showAlert, setShowAlert] = useState(false);

    const [alertType, setAlertType] = useState("");
    const [alertText, setAlertText] = useState("");

    // Obtener los perfiles
    const getProfilesBackend = async () => {
        try {
            const res = await getProfiles();

            if (!res) {
                closeSession();
            }
            setTableData(res.data);
        } catch (error) {
            closeSession();
        }
    };

    useEffect(() => {
        if (tableData) {
            setLoadingTable(true);
        }
    }, [tableData]);

    // Obtener los perfiles al cargar el componente
    useEffect(() => {
        localStorage.removeItem("selectText");
        localStorage.removeItem("filterText");
        handleReload();
    }, []);

    // Cargar tabla (tambien cargar los perfiles)
    const [loadingChart, setLoadingChart] = useState(false);

    // Gráfico
    const [data, setData] = useState();
    const [options, setOptions] = useState();

    // Handler para ingresar perfiles
    const onSubmit = handleSubmit((values) => {
        const filteredValues = {};

        for (const key in values) {
            if (key.includes(selectedProfile[0].name)) {
                filteredValues[key] = values[key];
            }
        }

        setLoadingChart(true);

        const backendValidation = () => {
            const labels = [];
            const prevData = [];
            const nextData = [];

            Object.keys(filteredValues).forEach((key) => {
                const value = filteredValues[key];
                const splits = key.split("-");
                const type = splits[0];
                const variable = splits[3];

                if (type === "antes") {
                    labels.push(variable);
                    prevData.push(Number(value));
                } else if (type === "despues") {
                    nextData.push(Number(value));
                }
            });

            const chart = CreateChart(labels, prevData, nextData);

            setData(chart.data);
            setOptions(chart.options);

            setLoadingChart(false);
        };

        setTimeout(() => {
            backendValidation();
        }, 500);
    });

    const { isMobile } = MobileHandler();

    // CSS movil
    const dynamicChartSize = isMobile
        ? "chart-mobile-size"
        : "chart-desktop-size";

    // Descargar gráfico
    const chartRef = useRef(null);

    const downloadChart = () => {
        if (chartRef.current && chartRef.current.canvas) {
            const url = chartRef.current.toBase64Image(); // Using the toBase64Image method directly on chartRef.current
            const link = document.createElement("a");
            link.href = url;
            link.download = `${selectedProfile[0].name}.png`;
            link.click();
        }
    };

    return (
        <Card className="m-4 card-form">
            <Card.Header className="card-form-header ">
                Creador de gráficos
            </Card.Header>

            {showAlert && (
                <Alert
                    className="m-2"
                    variant={alertType}
                    onClose={cleanAlert}
                    dismissible
                >
                    {alertText}
                </Alert>
            )}

            <Card.Body>
                <Card.Title className="text-center">
                    <ButtonGroup className="m-2">
                        <Button
                            variant="primary"
                            onClick={handleShowInsert}
                            className="mr-1 button-center"
                        >
                            <strong className="p-1">Ingresar perfil</strong>
                            <PersonAdd size={35} color="white" />
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleReload}
                            className="ml-1"
                            disabled={!loadingTable}
                        >
                            <ArrowClockwise size={35} color="white" />
                        </Button>
                    </ButtonGroup>

                    <ButtonGroup className="m-2">
                        <Button
                            variant="warning"
                            className="bl-5 button-center"
                            onClick={handleShowModify}
                            disabled={!loadingTable}
                        >
                            <strong className="p-1">Modificar</strong>
                            <PencilSquare size={35} color="white" />
                        </Button>
                        <Button
                            variant="danger"
                            className="br-5 button-center"
                            onClick={handleShowDelete}
                            disabled={!loadingTable}
                        >
                            <strong className="p-1">Eliminar</strong>
                            <XSquare size={35} color="white" />
                        </Button>
                    </ButtonGroup>
                </Card.Title>

                {loadingTable && (
                    <>
                        {tableData.length > 0 && (
                            <Table
                                data={tableData}
                                columns={columns}
                                columnsForSelect={columnsForSelect}
                                onRowSelected={handleRowSelection}
                                singleSelection={singleSelection}
                            ></Table>
                        )}
                    </>
                )}

                {!loadingTable && (
                    <Row className="text-center">
                        <Col>
                            <Spinner
                                animation="border"
                                role="status"
                                variant="primary"
                            >
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </Spinner>
                        </Col>
                    </Row>
                )}
            </Card.Body>

            {selectedProfile && selectedProfile.length > 0 && (
                <Card.Body data-aos="fade-down">
                    <h1 className="text-center">
                        Variables {selectedProfile[0].name}
                    </h1>
                    <Form className="p-2" onSubmit={onSubmit}>
                        <Row className="p-2">
                            <h4 className="text-center">Antes kinesiología</h4>
                            {selectedProfile[0].variables.map(
                                (property, index) => (
                                    <Col
                                        className="p-2"
                                        xs={10}
                                        sm={6}
                                        md={4}
                                        lg={3}
                                    >
                                        <label>{property}</label>
                                        <input
                                            id={`antes-variable-${index}-${property}-${selectedProfile[0].name}`}
                                            type="number"
                                            className={
                                                errors[
                                                    `antes-variable-${index}-${property}-${selectedProfile[0].name}`
                                                ]
                                                    ? "form-control is-invalid"
                                                    : "form-control"
                                            }
                                            {...register(
                                                `antes-variable-${index}-${property}-${selectedProfile[0].name}`,
                                                {
                                                    required: {
                                                        value: true,
                                                        message:
                                                            "Se requiere una variable",
                                                    },
                                                }
                                            )}
                                        />
                                        <span className="text-danger">
                                            {errors[
                                                `antes-variable-${index}-${property}-${selectedProfile[0].name}`
                                            ] &&
                                                errors[
                                                    `antes-variable-${index}-${property}-${selectedProfile[0].name}`
                                                ].message}
                                        </span>
                                    </Col>
                                )
                            )}
                        </Row>
                        <Row className="text-center">
                            <h4>Despues kinesiología</h4>
                        </Row>
                        <Row className="p-2">
                            {selectedProfile[0].variables.map(
                                (property, index) => (
                                    <Col
                                        className="p-2"
                                        xs={10}
                                        sm={6}
                                        md={4}
                                        lg={3}
                                    >
                                        <label>{property}</label>
                                        <input
                                            id={`despues-variable-${index}-${property}-${selectedProfile[0].name}`}
                                            type="number"
                                            className={
                                                errors[
                                                    `despues-variable-${index}-${property}-${selectedProfile[0].name}`
                                                ]
                                                    ? "form-control is-invalid"
                                                    : "form-control"
                                            }
                                            {...register(
                                                `despues-variable-${index}-${property}-${selectedProfile[0].name}`,
                                                {
                                                    required: {
                                                        value: true,
                                                        message:
                                                            "Se requiere una variable",
                                                    },
                                                }
                                            )}
                                        />
                                        <span className="text-danger">
                                            {errors[
                                                `despues-variable-${index}-${property}-${selectedProfile[0].name}`
                                            ] &&
                                                errors[
                                                    `despues-variable-${index}-${property}-${selectedProfile[0].name}`
                                                ].message}
                                        </span>
                                    </Col>
                                )
                            )}
                        </Row>
                        <Row className="text-center">
                            <Col>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    disabled={loadingChart}
                                >
                                    Generar gráfico
                                </Button>
                            </Col>
                        </Row>
                    </Form>

                    {data && options && (
                        <div>
                            <Row
                                className="pt-4 text-center"
                                data-aos="fade-down"
                            >
                                <h1>{selectedProfile[0].name}</h1>
                            </Row>
                            <Row className="text-center" data-aos="fade-down">
                                <div
                                    id="dowload-chart"
                                    className={`profile-chart ${dynamicChartSize}`}
                                >
                                    <Radar
                                        ref={chartRef}
                                        data={data}
                                        options={options}
                                    />
                                </div>
                            </Row>
                            <Row className="text-end">
                                <Col>
                                    <Button
                                        variant="primary"
                                        onClick={downloadChart}
                                    >
                                        Descargar
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    )}
                </Card.Body>
            )}

            {/* Modal de ingreso de pefil */}
            <ProfilesModalInsert
                show={showInsert}
                handleClose={handleCloseInsert}
                setAlertType={setAlertType}
                setAlertText={setAlertText}
                setShowAlert={setShowAlert}
                closeSession={closeSession}
            />

            {/* Modal de modificación de perfil */}
            <ProfilesModalModify
                show={showModify}
                handleClose={handleCloseModify}
                setAlertType={setAlertType}
                setAlertText={setAlertText}
                setShowAlert={setShowAlert}
                defaultValues={defaultValues}
                closeSession={closeSession}
            />

            {/* Modal de eliminación de perfil */}
            <ProfilesModalDelete
                show={showDelete}
                handleClose={handleCloseDelete}
                setAlertType={setAlertType}
                setAlertText={setAlertText}
                setShowAlert={setShowAlert}
                defaultValues={defaultValues}
                closeSession={closeSession}
            />
        </Card>
    );
}
