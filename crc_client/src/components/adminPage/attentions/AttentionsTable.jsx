// React
import { useState, useEffect } from "react";

// Bootstrap
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

// Context
import { useUserContext } from "../../../context/userContext";

// Router
import { useNavigate } from "react-router-dom";

// Api
import { logout } from "../../../api/user";
import { getAttentions } from "../../../api/attention";
import { getPrograms } from "../../../api/program";
import { getKines } from "../../../api/kine";
import { getClients } from "../../../api/client";

// Bootstrap icons
import {
    PersonAdd,
    ArrowClockwise,
    PencilSquare,
    XSquare,
} from "react-bootstrap-icons";

// React data table
import { Table } from "../DataTable";

// React data table configs
import {
    columns,
    columnsForSelect,
} from "../../../utils/attentionsDataTableConfigs";

// Modales
import { AttentionsModalInsert } from "./AttentionsModalInsert";
import { AttentionsModalModify } from "./AttentionsModalModify";
import { AttentionsModalMultipleModify } from "./AttentionsModalMultipleModify";
import { AttentionsModalDelete } from "./AttentionsModalDelete";

export function AttentionsTable() {
    // Seleccion de un solo elemento
    const singleSelection = false;

    // Cargar tabla (tambien cargar las atenciones)
    const [loadingTable, setLoadingTable] = useState(true);

    function handleReload() {
        setLoadingTable(false);

        setTimeout(() => {
            getAttentionsBackend();
        }, 500);
    }

    // Alerta en tabla y mensaje
    const [showAlert, setShowAlert] = useState(false);

    const [alertType, setAlertType] = useState("");
    const [alertText, setAlertText] = useState("");

    // Datos de las busquedas
    const [programs, setPrograms] = useState([]);
    const [kines, setKines] = useState([]);
    const [clients, setClients] = useState([]);

    // Datos de la tabla
    const [tableData, setTableData] = useState([]);

    // Datos seleccionados de la tabla
    const [selectedRows, setSelectedRows] = useState([]);

    // Datos seleccionados de la tabla
    const [attentionsNumber, setAttentionsNumber] = useState(0);

    // Callback para manejar la selección de filas en el data table
    const handleRowSelection = (rows) => {
        setSelectedRows(rows);
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

    // Valores default para cada atención
    const [defaultValues, setDefaultValues] = useState({});

    // Modal de modificar
    const [showModify, setShowModify] = useState(false);

    // Modal de modificación multiple
    const [showMultipleModify, setShowMultipleModify] = useState(false);

    const handleCloseModify = () => {
        setSelectedRows([]);
        handleReload();
        setShowModify(false);
        setShowMultipleModify(false);
    };

    const handleShowModify = () => {
        setAttentionsNumber(selectedRows.length);
        if (selectedRows.length > 0) {
            if (selectedRows.length == 0) {
                const programName = selectedRows[0].program.name;
                const kineName = selectedRows[0].kine.name;
                const clientName = selectedRows[0].client.name;
                const programID = selectedRows[0].program._id;
                const kineID = selectedRows[0].kine._id;
                const clientID = selectedRows[0].client._id;

                const month =
                    selectedRows[0].month &&
                    selectedRows[0].month.toString().length === 1
                        ? "0" + selectedRows[0].month
                        : selectedRows[0].month;

                const day =
                    selectedRows[0].day &&
                    selectedRows[0].day.toString().length === 1
                        ? "0" + selectedRows[0].day
                        : selectedRows[0].day;

                const date = `${selectedRows[0].year}-${month}-${day}`;

                const hour =
                    selectedRows[0].hour.toString().length === 1
                        ? "0" + selectedRows[0].hour + ":00"
                        : selectedRows[0].hour + ":00";

                const data = {
                    _id: selectedRows[0]._id,
                    program: programName,
                    kine: kineName,
                    client: clientName,
                    programID: programID,
                    kineID: kineID,
                    clientID: clientID,
                    date: date,
                    hour: hour,
                    state: selectedRows[0].state,
                    description: selectedRows[0].description,
                };

                setDefaultValues(data);

                setShowModify(true);
            } else {
                if (selectedRows.length <= 10) {
                    setDefaultValues(selectedRows);
                    setShowMultipleModify(true);
                } else {
                    setAlertType("danger");
                    setAlertText(
                        "No se puede modificar mas de 10 atenciones a la vez"
                    );
                    setShowAlert(true);
                }
            }
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
            if (selectedRows.length == 0) {
                const programName = selectedRows[0].program.name;
                const kineName = selectedRows[0].kine.name;
                const clientName = selectedRows[0].client.name;
                const programID = selectedRows[0].program._id;
                const kineID = selectedRows[0].kine._id;
                const clientID = selectedRows[0].client._id;

                const month =
                    selectedRows[0].month &&
                    selectedRows[0].month.toString().length === 1
                        ? "0" + selectedRows[0].month
                        : selectedRows[0].month;

                const day =
                    selectedRows[0].day &&
                    selectedRows[0].day.toString().length === 1
                        ? "0" + selectedRows[0].day
                        : selectedRows[0].day;

                const date = `${selectedRows[0].year}-${month}-${day}`;

                const hour =
                    selectedRows[0].hour.toString().length === 1
                        ? "0" + selectedRows[0].hour + ":00"
                        : selectedRows[0].hour + ":00";

                const data = {
                    _id: selectedRows[0]._id,
                    program: programName,
                    kine: kineName,
                    client: clientName,
                    programID: programID,
                    kineID: kineID,
                    clientID: clientID,
                    date: date,
                    hour: hour,
                    state: selectedRows[0].state,
                    description: selectedRows[0].description,
                };

                setDefaultValues(data);

                setShowDelete(true);
            } else {
                setAlertType("danger");
                setAlertText(
                    "No se puede eliminar mas de una atención a la vez"
                );
                setShowAlert(true);
            }
        }
    };

    // Obtener las atenciones
    const getAttentionsBackend = async () => {
        try {
            const res = await getAttentions();
            const res2 = await getPrograms();
            const res3 = await getKines();
            const res4 = await getClients();

            if (!res) {
                closeSession();
            }

            const filteredData = res.data.filter((item) => {
                return (
                    !["bloqueado", "cancelado", "pagando"].includes(
                        item.state
                    ) && !item.blocked
                );
            });
            setTableData(filteredData);

            setPrograms(res2.data);
            setKines(res3.data);
            setClients(res4.data);
        } catch (error) {
            closeSession();
        }
    };

    useEffect(() => {
        if (tableData) {
            setLoadingTable(true);
        }
    }, [tableData]);

    // Obtener las atenciones al cargar el componente
    useEffect(() => {
        localStorage.removeItem("selectText");
        localStorage.removeItem("filterText");
        handleReload();
    }, []);

    return (
        <Card className="m-4 card-form">
            <Card.Header className="card-form-header ">
                Administración de atenciones
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
                            className="mr-1"
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <strong>Ingresar atención</strong>
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
                            className="bl-5"
                            onClick={handleShowModify}
                            disabled={!loadingTable}
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <strong style={{ paddingRight: "2px" }}>
                                Modificar
                            </strong>
                            <PencilSquare size={35} color="white" />
                        </Button>
                        <Button
                            variant="danger"
                            className="br-5"
                            onClick={handleShowDelete}
                            disabled={!loadingTable}
                            style={{ display: "flex", alignItems: "center" }}
                        >
                            <strong style={{ paddingRight: "2px" }}>
                                Eliminar
                            </strong>
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

            {/* Modal de ingreso de atención */}
            <AttentionsModalInsert
                show={showInsert}
                handleClose={handleCloseInsert}
                setAlertType={setAlertType}
                setAlertText={setAlertText}
                setShowAlert={setShowAlert}
                closeSession={closeSession}
                programs={programs}
                kines={kines}
                clients={clients}
            />

            {/* Modal de modificación de atención */}
            <AttentionsModalModify
                show={showModify}
                handleClose={handleCloseModify}
                setAlertType={setAlertType}
                setAlertText={setAlertText}
                setShowAlert={setShowAlert}
                defaultValues={defaultValues}
                closeSession={closeSession}
                programs={programs}
                kines={kines}
                clients={clients}
            />

            {/* Modal de modificación de multiples atenciones */}
            <AttentionsModalMultipleModify
                show={showMultipleModify}
                handleClose={handleCloseModify}
                setAlertType={setAlertType}
                setAlertText={setAlertText}
                setShowAlert={setShowAlert}
                defaultValues={defaultValues}
                closeSession={closeSession}
                attentionsNumber={attentionsNumber}
            />

            {/* Modal de eliminación de atención */}
            <AttentionsModalDelete
                show={showDelete}
                handleClose={handleCloseDelete}
                setAlertType={setAlertType}
                setAlertText={setAlertText}
                setShowAlert={setShowAlert}
                defaultValues={defaultValues}
                closeSession={closeSession}
                programs={programs}
                kines={kines}
                clients={clients}
            />
        </Card>
    );
}
