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
import { getKines } from "../../../api/kine";

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
} from "../../../utils/kinesDataTableConfigs";

// Modales
import { KinesModalInsert } from "./KinesModalInsert";
import { KinesModalModify } from "./KinesModalModify";
import { KinesModalDelete } from "./KinesModalDelete";

export function KinesTable() {
    // Seleccion de un solo elemento
    const singleSelection = true;

    // Cargar tabla (tambien cargar los kines)
    const [loadingTable, setLoadingTable] = useState(true);

    function handleReload() {
        setLoadingTable(false);

        setTimeout(() => {
            getKinesBackend();
        }, 500);
    }

    // Datos de la tabla
    const [tableData, setTableData] = useState([]);

    // Datos seleccionados de la tabla
    const [selectedRows, setSelectedRows] = useState([]);

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

    // Valores default para cada kine
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
            setDefaultValues(selectedRows[0]);
            setShowDelete(true);
        }
    };

    // Alerta en tabla y mensaje
    const [showAlert, setShowAlert] = useState(false);

    const [alertType, setAlertType] = useState("");
    const [alertText, setAlertText] = useState("");

    // Obtener los kines
    const getKinesBackend = async () => {
        try {
            const res = await getKines();

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

    // Obtener los kines al cargar el componente
    useEffect(() => {
        localStorage.removeItem("selectText");
        localStorage.removeItem("filterText");
        handleReload();
    }, []);

    return (
        <Card className="m-4 card-form">
            <Card.Header className="card-form-header ">
                Administración de kinesiólogos
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
                            <strong className="p-1">
                                Ingresar kinesiólogo
                            </strong>
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

            {/* Modal de ingreso de kine */}
            <KinesModalInsert
                show={showInsert}
                handleClose={handleCloseInsert}
                setAlertType={setAlertType}
                setAlertText={setAlertText}
                setShowAlert={setShowAlert}
                closeSession={closeSession}
            />

            {/* Modal de modificación de kine */}
            <KinesModalModify
                show={showModify}
                handleClose={handleCloseModify}
                setAlertType={setAlertType}
                setAlertText={setAlertText}
                setShowAlert={setShowAlert}
                defaultValues={defaultValues}
                closeSession={closeSession}
            />

            {/* Modal de eliminación de kine */}
            <KinesModalDelete
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
