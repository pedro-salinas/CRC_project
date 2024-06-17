// React
import { useState, useEffect } from "react";

// Bootstrap
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";

// Bootstrap icons
import {
    ChevronDoubleLeft,
    ChevronDoubleRight,
    ArrowClockwise,
    FilePlus,
    PersonAdd,
} from "react-bootstrap-icons";

export function Stage2({ attentions, goStage3, isMobile }) {
    const weekDaysTable = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];

    const weekDaysTableFull = [
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sabado",
        "Domingo",
    ];

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
    const months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ];

    const [currentDate, setCurrentDate] = useState(new Date());
    const [weekDaysTitle, setWeekDaysTitle] = useState(
        getWeekDaysTitle(currentDate)
    );
    const [today, setToday] = useState(new Date());

    const [daySelected, setDaySelected] = useState();

    const [loadingCalendar, setLoadingCalendar] = useState(true);

    function getWeekDaysTitle(date) {
        let days = [];
        let currentMonth = date.getMonth();
        let startDateMonth = new Date(date.getFullYear(), currentMonth, 1);
        let endDateMonth = new Date(date.getFullYear(), currentMonth + 1, 0);
        let startDateWeek = new Date(startDateMonth);

        // Añadir días de la última semana del mes anterior si no comienza en domingo
        if (startDateMonth.getDay() !== 0) {
            startDateWeek.setDate(
                startDateWeek.getDate() - startDateMonth.getDay() + 1
            );
        }

        // Generar los días por semana
        while (startDateWeek <= endDateMonth) {
            let week = [];
            for (let i = 0; i < 7; i++) {
                let day = new Date(startDateWeek);
                const dayNumber = day.getDate();
                const dayName = weekDaysTableFull[i];
                const dayMonth = day.getMonth() + 1;
                const dayYear = day.getFullYear();
                week.push(`${dayName} ${dayNumber} ${dayMonth} ${dayYear}`);
                startDateWeek.setDate(startDateWeek.getDate() + 1);
            }
            days.push(week);
        }

        return days;
    }

    const lastMonth = () => {
        // console.log(currentDate.getMonth() - 1, today.getMonth());
        if (currentDate.getMonth() - 1 >= today.getMonth()) {
            const lastDate = new Date(currentDate);
            lastDate.setMonth(currentDate.getMonth() - 1);
            setCurrentDate(lastDate);
        }
    };

    const nextMonth = () => {
        const nextDate = new Date(currentDate);
        nextDate.setMonth(currentDate.getMonth() + 1);
        setCurrentDate(nextDate);
    };

    const goToCurrentDate = () => {
        setCurrentDate(new Date());
    };

    function handleReload() {
        setLoadingCalendar(true);

        setTimeout(() => {
            setWeekDaysTitle(getWeekDaysTitle(currentDate));
            setLoadingCalendar(false);
        }, 500);
    }

    useEffect(() => {
        handleReload();
    }, [currentDate]);

    const dynamicText = {
        fontSize: isMobile ? "16px" : "20px",
    };

    return (
        <Row
            className="pt-2 justify-content-center"
            data-aos="fade-up"
            style={{ minHeight: "250px" }}
        >
            <Row className="text-center">
                <Col xs={8} className="text-end">
                    <h3>Selecciona un día</h3>
                </Col>
                {loadingCalendar && (
                    <Col xs={4} className="text-start pt-2">
                        <Spinner
                            animation="border"
                            role="status"
                            variant="primary"
                        >
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Col>
                )}
            </Row>

            <Row style={{ maxWidth: "600px" }}>
                <Col xs={6} className="text-start pt-2">
                    <h4>
                        {months[currentDate.getMonth()]}
                        {"  "}
                        {currentDate.getFullYear()}
                    </h4>
                </Col>
                <Col
                    xs={6}
                    className="d-flex justify-content-end align-items-start"
                >
                    <Button
                        variant="light"
                        onClick={lastMonth}
                        className="m-2"
                        disabled={loadingCalendar}
                    >
                        <ChevronDoubleLeft size={25} color="#31b6ad" />
                    </Button>
                    <Button
                        variant="primary"
                        onClick={goToCurrentDate}
                        disabled={loadingCalendar}
                        style={{ marginTop: "14px" }}
                    >
                        <h6>Hoy</h6>
                    </Button>
                    <Button
                        variant="light"
                        onClick={nextMonth}
                        className="m-2"
                        disabled={loadingCalendar}
                        style={{ marginTop: "14px" }}
                    >
                        <ChevronDoubleRight size={25} color="#31b6ad" />
                    </Button>
                </Col>
                <hr />
            </Row>
            <div className="clearfix"></div>
            <Row
                style={{
                    maxWidth: "600px",
                    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.12)",
                }}
                className="text-center justify-content-center"
            >
                <Row className="flex-nowrap" style={dynamicText}>
                    {weekDaysTable.map((wdt) => {
                        return (
                            <Col className="p-0 pb-4">
                                <strong>{wdt}</strong>
                            </Col>
                        );
                    })}
                </Row>

                {weekDaysTitle.map((weeks) => {
                    return (
                        <Row
                            className="flex-nowrap pb-4"
                            style={dynamicText}
                            data-aos="fade-up"
                        >
                            {weeks.map((week) => {
                                const currentDay = today.getDate();
                                const currentMonth = today.getMonth() + 1;
                                const day = week.split(" ")[1];
                                const month = week.split(" ")[2];

                                const formattedDay = day
                                    .toString()
                                    .padStart(2, "0");

                                if (month == currentMonth) {
                                    if (day >= currentDay + 2) {
                                        return (
                                            <Col className="p-0">
                                                <Button
                                                    disabled={loadingCalendar}
                                                    className="btn-calendar"
                                                    variant="outline-primary border-light"
                                                    style={dynamicText}
                                                >
                                                    {formattedDay}
                                                </Button>
                                            </Col>
                                        );
                                    } else {
                                        return (
                                            <Col className="p-0">
                                                <Button
                                                    disabled
                                                    className="btn-calendar"
                                                    variant="outline-primary border-light"
                                                    style={dynamicText}
                                                >
                                                    {formattedDay}
                                                </Button>
                                            </Col>
                                        );
                                    }
                                } else if (month > currentMonth) {
                                    return (
                                        <Col className="p-0">
                                            <Button
                                                disabled={loadingCalendar}
                                                className="btn-calendar"
                                                variant="outline-primary border-light"
                                                style={dynamicText}
                                            >
                                                {formattedDay}
                                            </Button>
                                        </Col>
                                    );
                                } else {
                                    return (
                                        <Col className="p-0">
                                            <Button
                                                disabled
                                                className="btn-calendar"
                                                variant="outline-primary border-light"
                                                style={dynamicText}
                                            >
                                                {formattedDay}
                                            </Button>
                                        </Col>
                                    );
                                }
                            })}
                        </Row>
                    );
                })}
            </Row>
        </Row>
    );
}
