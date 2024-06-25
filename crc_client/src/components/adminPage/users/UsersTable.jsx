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
import { getUsers, logout } from "../../../api/user";

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
} from "../../../utils/usersDataTableConfigs";

// Modales
import { UsersModalInsert } from "./UsersModalInsert";
import { UsersModalModify } from "./UsersModalModify";
import { UsersModalDelete } from "./UsersModalDelete";

export function UsersTable() {
    // Seleccion de un solo elemento
    const singleSelection = true;

    // Cargar tabla (tambien cargar los usuarios)
    const [loadingTable, setLoadingTable] = useState(true);

    function handleReload() {
        setLoadingTable(false);

        setTimeout(() => {
            getUsersBackend();
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

    // Valores default para cada usuario
    const [defaultValues, setDefaultValues] = useState({});

    // Modal de modificar
    const [showModify, setShowModify] = useState(false);

    // Admin o staff
    const [staffModify, setStaffModify] = useState(false);

    const handleCloseModify = () => {
        setSelectedRows([]);
        handleReload();
        setShowModify(false);
    };
    const handleShowModify = () => {
        if (selectedRows.length > 0) {
            cleanAlert();

            if (user.is_admin) {
                if (selectedRows[0].name == "Admin") {
                    setAlertType("danger");
                    setAlertText(
                        "No se puede modificar el usuario administrador Admin"
                    );
                    setShowAlert(true);
                } else {
                    delete selectedRows[0].password;
                    setDefaultValues(selectedRows[0]);

                    setStaffModify(false);
                    setShowModify(true);
                }
            } else {
                if (selectedRows[0].is_staff == false) {
                    delete selectedRows[0].password;
                    setDefaultValues(selectedRows[0]);

                    setStaffModify(true);
                    setShowModify(true);
                } else {
                    if (user._id == selectedRows[0]._id) {
                        delete selectedRows[0].password;
                        setDefaultValues(selectedRows[0]);

                        setStaffModify(true);
                        setShowModify(true);
                    } else {
                        setAlertType("danger");
                        setAlertText(
                            "No tienes permitido modificar otros miembros staff"
                        );
                        setShowAlert(true);
                    }
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
            cleanAlert();
            if (user.is_admin) {
                if (selectedRows[0].is_admin == true) {
                    setAlertType("danger");
                    setAlertText("No se puede eliminar un usuario admin");
                    setShowAlert(true);
                } else {
                    delete selectedRows[0].password;
                    setDefaultValues(selectedRows[0]);

                    setShowDelete(true);
                }
            } else {
                setAlertType("danger");
                setAlertText("No tienes permisos para eliminar usuarios");
                setShowAlert(true);
            }
        }
    };

    // Alerta en tabla y mensaje
    const [showAlert, setShowAlert] = useState(false);

    const [alertType, setAlertType] = useState("");
    const [alertText, setAlertText] = useState("");

    // Obtener los usuarios
    const getUsersBackend = async () => {
        try {
            const res = await getUsers();

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

    // Obtener los usuarios al cargar el componente
    useEffect(() => {
        localStorage.removeItem("selectText");
        localStorage.removeItem("filterText");
        handleReload();
    }, []);

    return (
        <Card className="m-4 card-form">
            <Card.Header className="card-form-header ">
                Administración de usuarios
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
                            <strong className="p-1">Ingresar usuario</strong>
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

            {/* Modal de ingreso de usuario */}
            <UsersModalInsert
                show={showInsert}
                handleClose={handleCloseInsert}
                setAlertType={setAlertType}
                setAlertText={setAlertText}
                setShowAlert={setShowAlert}
                closeSession={closeSession}
            />

            {/* Modal de modificación de usuario */}
            <UsersModalModify
                show={showModify}
                handleClose={handleCloseModify}
                setAlertType={setAlertType}
                setAlertText={setAlertText}
                setShowAlert={setShowAlert}
                defaultValues={defaultValues}
                closeSession={closeSession}
                staffModify={staffModify}
            />

            {/* Modal de eliminación de usuario */}
            <UsersModalDelete
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
