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
import {
    // getAttentions,
    getAttentionsByDate,
    insertAttentionRequest,
    deleteAttention,
} from "../../../api/attention";
import { getPrograms } from "../../../api/program";
import { getKines } from "../../../api/kine";
import { getClients } from "../../../api/client";

// Bootstrap icons
import {
    ChevronDoubleLeft,
    ChevronDoubleRight,
    ArrowClockwise,
    FilePlus,
    PersonAdd,
} from "react-bootstrap-icons";

// Estilos
import "./Calendar.css";

// Utilidad para saber si es que estamos en movil o no
import { MobileHandler } from "../../../utils/MobileHandler";

// Modales
import { AttentionsCalendarModalInsert } from "./AttentionsCalendarModalInsert";
import { AttentionsCalendarModalVer } from "./AttentionsCalendarModalVer";
import { AttentionsCalendarModalModify } from "./AttentionsCalendarModalModify";
import { AttentionsCalendarModalDelete } from "./AttentionsCalendarModalDelete";
import { AttentionsCalendarModalInsertMultipleSameDate } from "./AttentionsCalendarModalInsertMultipleSameDate";
import { AttentionsCalendarModalInsertMultipleDifferentDate } from "./AttentionsCalendarModalInsertMultipleDifferentDate";

export function Calendar() {
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

    const { isMobile } = MobileHandler();

    // CSS movil
    const dynamicMaxHeight = isMobile ? "mobile-size" : "desktop-size";
    const dynamicFont = isMobile ? "mobile-font" : "desktop-font";

    const dayHours = [
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
    ];

    const weekDaysTable = [
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sabado",
    ];

    function getWeekDaysTitle(date) {
        let days = [];
        let startDateWeek = new Date(date);
        startDateWeek.setDate(date.getDate() - date.getDay() + 1);

        for (let i = 0; i < 6; i++) {
            let day = new Date(startDateWeek);
            day.setDate(startDateWeek.getDate() + i);
            const dayNumber = day.getDate();
            const dayName = weekDaysTable[i];
            const dayMonth = day.getMonth() + 1;
            const dayYear = day.getFullYear();
            days.push(`${dayName} ${dayNumber} ${dayMonth} ${dayYear}`);
        }

        return days;
    }

    const [currentDate, setCurrentDate] = useState(new Date());
    const [weekDaysTitle, setWeekDaysTitle] = useState(
        getWeekDaysTitle(currentDate)
    );

    const [loadingCalendar, setLoadingCalendar] = useState(true);

    const lastWeek = () => {
        const lastDate = new Date(currentDate);
        lastDate.setDate(currentDate.getDate() - 7);
        setCurrentDate(lastDate);
    };

    const nextWeek = () => {
        const nextDate = new Date(currentDate);
        nextDate.setDate(currentDate.getDate() + 7);
        setCurrentDate(nextDate);
    };

    const goToCurrentDate = () => {
        setCurrentDate(new Date());
    };

    const firstWeekDay = new Date(currentDate);
    firstWeekDay.setDate(firstWeekDay.getDate() - firstWeekDay.getDay() + 1);

    const lastWeekDay = new Date(currentDate);
    lastWeekDay.setDate(lastWeekDay.getDate() - lastWeekDay.getDay() + 7);

    const renderWeek = `${firstWeekDay.toLocaleDateString()} al ${lastWeekDay.toLocaleDateString()}`;

    // Atenciones
    const [attentions, setAttentions] = useState([]);

    // Datos para modales
    const [programs, setPrograms] = useState([]);
    const [kines, setKines] = useState([]);
    const [clients, setClients] = useState([]);

    // Dias bloqueados
    const [blockedItems, setBlockedItems] = useState([]);

    // Alerta de calendario y mensaje
    const [showAlert, setShowAlert] = useState(false);

    const [alertType, setAlertType] = useState("");
    const [alertText, setAlertText] = useState("");

    function cleanAlert() {
        setAlertType("");
        setAlertText("");
        setShowAlert(false);
    }

    // Obtener las atenciones
    const getAttentionsBackend = async () => {
        try {
            const startYear = weekDaysTitle[0].split(" ")[3];
            const endYear =
                weekDaysTitle[weekDaysTitle.length - 1].split(" ")[3];

            const startMonth = weekDaysTitle[0].split(" ")[2];
            const endMonth =
                weekDaysTitle[weekDaysTitle.length - 1].split(" ")[2];

            const startDay = weekDaysTitle[0].split(" ")[1];
            const endDay =
                weekDaysTitle[weekDaysTitle.length - 1].split(" ")[1];

            const resData = {
                startYear: Number(startYear),
                endYear: Number(endYear),
                startMonth: Number(startMonth),
                endMonth: Number(endMonth),
                startDay: Number(startDay),
                endDay: Number(endDay),
            };

            const res = await getAttentionsByDate(resData);
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

            const blockedItemsFilter = res.data
                .filter((item) => item.blocked)
                .map((item) => ({
                    _id: item._id,
                    year: item.year,
                    month: item.month,
                    day: item.day,
                    hour: item.hour,
                }));

            setBlockedItems(blockedItemsFilter);
            setAttentions(filteredData);
            setPrograms(res2.data);
            setKines(res3.data);
            setClients(res4.data);
            setLoadingCalendar(false);
        } catch (error) {
            closeSession();
        }
    };

    function handleReload() {
        setLoadingCalendar(true);

        setTimeout(() => {
            getAttentionsBackend();
        }, 50);
    }

    useEffect(() => {
        handleReload();
    }, [weekDaysTitle]);

    useEffect(() => {
        setWeekDaysTitle(getWeekDaysTitle(currentDate));
    }, [currentDate]);

    // Valores default para cada atención
    const [defaultValues, setDefaultValues] = useState({});

    // Modal de ingreso
    const [showInsert, setShowInsert] = useState(false);

    const handleCloseInsert = () => {
        setShowInsert(false);
        handleReload();
    };

    const handleShowInsert = (dayNumberHandler, hour) => {
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1; //Parte del 1 esta baina
        let day = Number(dayNumberHandler.split(" ")[1]);

        month = month && month.toString().length === 1 ? "0" + month : month;

        day = day && day.toString().length === 1 ? "0" + day : day;

        const date = `${year}-${month}-${day}`;

        const realHour = Number(hour.split(":")[0]);

        const data = {
            date: date,
            hour: realHour,
        };

        setDefaultValues(data);

        setShowInsert(true);
        cleanAlert();
    };

    // Modal de para ver
    const [showVer, setShowVer] = useState(false);

    const handleCloseVer = () => {
        setShowVer(false);
        // Recargar al salir para que
        // handleReload();
    };

    const handleShowVer = (data) => {
        const year = data.year;

        const month =
            data.month && data.month.toString().length === 1
                ? "0" + data.month
                : data.month;
        const day =
            data.day && data.day.toString().length === 1
                ? "0" + data.day
                : data.day;

        const hour =
            data.hour && data.hour.toString().length === 1
                ? "0" + data.hour + ":00"
                : data.hour + ":00";

        const date = `${year}-${month}-${day}`;

        const newData = {
            client: data.client.name,
            clientID: data.client._id,
            kine: data.kine.name,
            kineID: data.kine._id,
            program: data.program.name,
            programID: data.program._id,
            state: data.state,
            _id: data._id,
            date: date,
            hour: hour,
            description: data.description,
        };
        setDefaultValues(newData);
        setShowVer(true);
        cleanAlert();
    };

    // Modal de para modificar atención
    const [showModify, setShowModify] = useState(false);

    const handleCloseModify = () => {
        setShowModify(false);
        handleReload();
    };

    const handleShowModify = (data) => {
        const year = data.year;

        const month =
            data.month && data.month.toString().length === 1
                ? "0" + data.month
                : data.month;
        const day =
            data.day && data.day.toString().length === 1
                ? "0" + data.day
                : data.day;

        const hour = data.hour;

        const date = `${year}-${month}-${day}`;

        const newData = {
            client: data.client.name,
            clientID: data.client._id,
            kine: data.kine.name,
            kineID: data.kine._id,
            program: data.program.name,
            programID: data.program._id,
            state: data.state,
            _id: data._id,
            date: date,
            hour: hour,
            description: data.description,
        };
        setDefaultValues(newData);
        setShowModify(true);
        cleanAlert();
    };

    // Modal de para modificar atención
    const [showDelete, setShowDelete] = useState(false);

    const handleCloseDelete = () => {
        setShowDelete(false);
        handleReload();
    };

    const handleShowDelete = (data) => {
        const year = data.year;

        const month =
            data.month && data.month.toString().length === 1
                ? "0" + data.month
                : data.month;
        const day =
            data.day && data.day.toString().length === 1
                ? "0" + data.day
                : data.day;

        const hour = data.hour;

        const date = `${year}-${month}-${day}`;

        const newData = {
            client: data.client.name,
            clientID: data.client._id,
            kine: data.kine.name,
            kineID: data.kine._id,
            program: data.program.name,
            programID: data.program._id,
            state: data.state,
            _id: data._id,
            date: date,
            hour: hour,
            description: data.description,
        };
        setDefaultValues(newData);
        setShowDelete(true);
        cleanAlert();
    };

    // Modal de ingreso multiple repetir hora
    const [showInsertRepeat, setShowInsertRepeat] = useState(false);

    const handleCloseInsertRepeat = () => {
        handleReload();
        setShowInsertRepeat(false);
    };
    const handleShowInsertRepeat = () => {
        setShowInsertRepeat(true);
        cleanAlert();
    };

    // Modal de ingreso multiple hora diferente
    const [showInsertDifferent, setShowInsertDifferent] = useState(false);

    const handleCloseInsertDifferent = () => {
        handleReload();
        setShowInsertDifferent(false);
    };
    const handleShowInsertDifferent = () => {
        setShowInsertDifferent(true);
        cleanAlert();
    };

    const blockDay = async (data) => {
        setLoadingCalendar(true);

        let year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1; //Parte del 1 esta baina
        let day = Number(data);

        try {
            for (const dayHour of dayHours) {
                const hour = parseInt(dayHour);
                const newData = {
                    year: year,
                    month: month,
                    day: day,
                    hour: hour,
                    client: clients[0]._id,
                    program: programs[0]._id,
                    kine: kines[0]._id,
                    state: "bloqueado",
                    blocked: true,
                    description: "",
                };

                const res = await insertAttentionRequest(newData);
            }

            setLoadingCalendar(false);
            setAlertType("success");
            setAlertText("Día bloqueado correctamente");
            handleReload();
        } catch (error) {
            setLoadingCalendar(false);
            setAlertType("danger");
            setAlertText("No existe programa, kinesiólogo o paciente");
            setShowAlert(true);
            handleReload();
        }
    };

    const unblockDay = async (data) => {
        setLoadingCalendar(true);
        try {
            for (const d of data) {
                const res = await deleteAttention(d._id);
            }
            setLoadingCalendar(false);
            setAlertType("success");
            setAlertText("Día desbloqueado correctamente");
            handleReload();
        } catch (error) {
            setLoadingCalendar(false);
            setAlertType("danger");
            setAlertText("Algo salió mal en la base de datos");
            setShowAlert(true);
        }
    };

    return (
        <div>
            <Row className="text-center">
                <h3>Semana del {renderWeek}</h3>
            </Row>
            <Row className="text-center">
                <Col>
                    <ButtonGroup>
                        <Button
                            variant="primary"
                            onClick={handleShowInsertRepeat}
                            className={`mx-1 ${dynamicFont} calendar-button`}
                            disabled={loadingCalendar}
                        >
                            Ingresar atención (repetir hora)
                            <PersonAdd size={20} color="white" />
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleShowInsertDifferent}
                            className={`mx-1 ${dynamicFont} calendar-button`}
                            disabled={loadingCalendar}
                        >
                            Ingresar atención (diferentes horas)
                            <PersonAdd size={20} color="white" />
                        </Button>
                    </ButtonGroup>
                </Col>
            </Row>
            <Row className="text-center">
                <Col>
                    <Button
                        variant="light"
                        onClick={lastWeek}
                        className="m-2"
                        disabled={loadingCalendar}
                    >
                        <ChevronDoubleLeft size={35} color="#31b6ad" />
                    </Button>
                    <ButtonGroup>
                        <Button
                            variant="primary"
                            onClick={goToCurrentDate}
                            className=""
                            disabled={loadingCalendar}
                        >
                            <h6>Hoy</h6>
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleReload}
                            className=""
                            disabled={loadingCalendar}
                        >
                            <ArrowClockwise size={20} color="white" />
                        </Button>
                    </ButtonGroup>
                    <Button
                        variant="light"
                        onClick={nextWeek}
                        className="m-2"
                        disabled={loadingCalendar}
                    >
                        <ChevronDoubleRight size={35} color="#31b6ad" />
                    </Button>
                </Col>
            </Row>
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

            {!loadingCalendar && (
                <div className={`parent ${dynamicMaxHeight}`}>
                    <table>
                        <thead className="sticky-header ">
                            <tr>
                                <th>
                                    <h6>
                                        <strong>Hora</strong>
                                    </h6>
                                </th>

                                {weekDaysTitle.map((day) => {
                                    const matchingBlockedItems =
                                        blockedItems.filter(
                                            (item) =>
                                                item.day ===
                                                    Number(day.split(" ")[1]) &&
                                                item.month ===
                                                    Number(day.split(" ")[2]) &&
                                                item.year ===
                                                    Number(day.split(" ")[3])
                                        );

                                    if (matchingBlockedItems.length == 0) {
                                        return (
                                            <th key={day} className="">
                                                {day.split(" ", 2).join(" ")}

                                                <Button
                                                    variant="secondary"
                                                    className="m-2"
                                                    onClick={() =>
                                                        blockDay(
                                                            day.split(" ")[1]
                                                        )
                                                    }
                                                    disabled={loadingCalendar}
                                                >
                                                    Bloquear día
                                                </Button>
                                            </th>
                                        );
                                    }

                                    if (matchingBlockedItems.length > 0) {
                                        return (
                                            <th key={day} className="">
                                                {day.split(" ", 2).join(" ")}

                                                <Button
                                                    variant="primary"
                                                    className="m-2"
                                                    onClick={() =>
                                                        unblockDay(
                                                            matchingBlockedItems
                                                        )
                                                    }
                                                    disabled={loadingCalendar}
                                                >
                                                    Desbloquear día
                                                </Button>
                                            </th>
                                        );
                                    }
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {dayHours.map((hour) => (
                                <tr key={hour}>
                                    <td className="pe-2">
                                        <h6>
                                            <strong>{hour}</strong>
                                        </h6>
                                    </td>
                                    {weekDaysTitle.map((day, index) => {
                                        const matchingBlockedItems =
                                            blockedItems.filter(
                                                (item) =>
                                                    item.day ===
                                                        Number(
                                                            day.split(" ")[1]
                                                        ) &&
                                                    item.month ===
                                                        Number(
                                                            day.split(" ")[2]
                                                        ) &&
                                                    item.year ===
                                                        Number(
                                                            day.split(" ")[3]
                                                        )
                                            );

                                        const hasBlockedAttention =
                                            matchingBlockedItems.length > 0;

                                        const filteredAttentions =
                                            attentions.filter(
                                                (att) =>
                                                    att.hour ===
                                                        parseInt(hour) &&
                                                    att.day ===
                                                        Number(
                                                            day.split(" ")[1]
                                                        ) &&
                                                    att.month ===
                                                        Number(
                                                            day.split(" ")[2]
                                                        )
                                            );

                                        return (
                                            <td
                                                key={`${hour}-${day}`}
                                                className="bg-light"
                                            >
                                                {filteredAttentions.length >
                                                    0 &&
                                                    filteredAttentions
                                                        .filter(
                                                            (attention) =>
                                                                !attention.blocked
                                                        )
                                                        .map(
                                                            (
                                                                attention,
                                                                index
                                                            ) => (
                                                                <div
                                                                    key={index}
                                                                >
                                                                    <Card className="m-1 calendar-card">
                                                                        <Card.Body
                                                                            className="calendar-card-body"
                                                                            style={{
                                                                                backgroundColor:
                                                                                    attention
                                                                                        .kine
                                                                                        .color,
                                                                            }}
                                                                        >
                                                                            <Card.Text>
                                                                                Paciente:
                                                                                {" " +
                                                                                    attention
                                                                                        .client
                                                                                        .name}
                                                                                <br />
                                                                                Pago:
                                                                                {" " +
                                                                                    attention.state}
                                                                            </Card.Text>
                                                                            <div className="text-center">
                                                                                <ButtonGroup>
                                                                                    <Button
                                                                                        variant="success"
                                                                                        className=""
                                                                                        onClick={() =>
                                                                                            handleShowVer(
                                                                                                attention
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        Ver
                                                                                    </Button>
                                                                                    <Button
                                                                                        variant="warning"
                                                                                        className=""
                                                                                        onClick={() =>
                                                                                            handleShowModify(
                                                                                                attention
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        Modificar
                                                                                    </Button>
                                                                                    <Button
                                                                                        variant="danger"
                                                                                        className=""
                                                                                        onClick={() =>
                                                                                            handleShowDelete(
                                                                                                attention
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        Eliminar
                                                                                    </Button>
                                                                                </ButtonGroup>
                                                                            </div>
                                                                        </Card.Body>
                                                                    </Card>
                                                                </div>
                                                            )
                                                        )}
                                                {!hasBlockedAttention && (
                                                    <div className="text-center calendar-blocked">
                                                        <Button
                                                            variant="light"
                                                            onClick={() =>
                                                                handleShowInsert(
                                                                    weekDaysTitle[
                                                                        index
                                                                    ],
                                                                    hour
                                                                )
                                                            }
                                                        >
                                                            <FilePlus
                                                                size={25}
                                                                width={200}
                                                                color="#31b6ad"
                                                            />
                                                        </Button>
                                                    </div>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {loadingCalendar && (
                <Row className="text-center">
                    <Col>
                        <Spinner
                            animation="border"
                            role="status"
                            variant="primary"
                        >
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Col>
                </Row>
            )}
            {/* Modal de ingreso de atención */}
            <AttentionsCalendarModalInsert
                show={showInsert}
                handleClose={handleCloseInsert}
                setAlertType={setAlertType}
                setAlertText={setAlertText}
                setShowAlert={setShowAlert}
                closeSession={closeSession}
                programs={programs}
                kines={kines}
                clients={clients}
                defaultValues={defaultValues}
            />
            {/* Modal para ver atención*/}
            <AttentionsCalendarModalVer
                show={showVer}
                handleClose={handleCloseVer}
                setAlertType={setAlertType}
                setAlertText={setAlertText}
                setShowAlert={setShowAlert}
                closeSession={closeSession}
                programs={programs}
                kines={kines}
                clients={clients}
                defaultValues={defaultValues}
            />
            {/* Modal para modificar atención*/}
            <AttentionsCalendarModalModify
                show={showModify}
                handleClose={handleCloseModify}
                setAlertType={setAlertType}
                setAlertText={setAlertText}
                setShowAlert={setShowAlert}
                closeSession={closeSession}
                programs={programs}
                kines={kines}
                clients={clients}
                defaultValues={defaultValues}
            />
            {/* Modal para eliminar atención*/}
            <AttentionsCalendarModalDelete
                show={showDelete}
                handleClose={handleCloseDelete}
                setAlertType={setAlertType}
                setAlertText={setAlertText}
                setShowAlert={setShowAlert}
                closeSession={closeSession}
                programs={programs}
                kines={kines}
                clients={clients}
                defaultValues={defaultValues}
            />

            {/* Modal de ingreso de atención misma fecha */}
            <AttentionsCalendarModalInsertMultipleSameDate
                show={showInsertRepeat}
                handleClose={handleCloseInsertRepeat}
                setAlertType={setAlertType}
                setAlertText={setAlertText}
                setShowAlert={setShowAlert}
                closeSession={closeSession}
                programs={programs}
                kines={kines}
                clients={clients}
            />

            {/* Modal de ingreso de atención diferente fecha */}
            <AttentionsCalendarModalInsertMultipleDifferentDate
                show={showInsertDifferent}
                handleClose={handleCloseInsertDifferent}
                setAlertType={setAlertType}
                setAlertText={setAlertText}
                setShowAlert={setShowAlert}
                closeSession={closeSession}
                programs={programs}
                kines={kines}
                clients={clients}
            />
        </div>
    );
}
