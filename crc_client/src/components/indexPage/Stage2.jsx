// React
import { useState, useEffect } from "react";

// Bootstrap
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";

// Api
import { getAttentionsByDate } from "../../api/attention";

// Bootstrap icons
import {
    ChevronDoubleLeft,
    ChevronDoubleRight,
    ArrowClockwise,
    FilePlus,
    PersonAdd,
} from "react-bootstrap-icons";

export function Stage2({ goStage1, goStage3, isMobile }) {
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
        // "21:00",
        // "22:00",
        // "23:00",
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

    const [specialty, setSpecialty] = useState(
        localStorage.getItem("specialty")
    );

    const [daySelected, setDaySelected] = useState();

    const [loadingCalendar, setLoadingCalendar] = useState(true);

    const [loadingHours, setLoadingHours] = useState(false);

    const [hours, setHours] = useState();

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
        if (currentDate.getMonth() - 1 >= today.getMonth()) {
            const lastDate = new Date(currentDate);
            lastDate.setMonth(currentDate.getMonth() - 1);
            setCurrentDate(lastDate);
        }
    };

    const nextMonth = () => {
        if (currentDate.getMonth() + 1 < today.getMonth() + 3) {
            const nextDate = new Date(currentDate);
            nextDate.setMonth(currentDate.getMonth() + 1);
            setCurrentDate(nextDate);
            setDaySelected();
        }
    };

    const goToCurrentDate = () => {
        setCurrentDate(new Date());
        setDaySelected();
    };

    function handleReload() {
        setLoadingCalendar(true);
        setDaySelected();

        setTimeout(() => {
            setWeekDaysTitle(getWeekDaysTitle(currentDate));
            setLoadingCalendar(false);
        }, 500);
    }

    useEffect(() => {
        handleReload();
    }, [currentDate]);

    const dynamicFontSize = isMobile
        ? "attention-mobile-size"
        : "attention-desktop-size";

    const getDataBackend = async (weekDay) => {
        try {
            const resData = {
                startYear: Number(weekDay.split(" ")[3]),
                endYear: Number(weekDay.split(" ")[3]),
                startMonth: Number(weekDay.split(" ")[2]),
                endMonth: Number(weekDay.split(" ")[2]),
                startDay: Number(weekDay.split(" ")[1]),
                endDay: Number(weekDay.split(" ")[1]),
            };

            const res = await getAttentionsByDate(resData);

            setHours(res.data);
            setLoadingHours(false);
        } catch (error) {
            console.log(error);
        }
    };

    const getDayHours = (weekDay) => {
        setDaySelected(weekDay);
        setLoadingHours(true);

        handleReloadBackend(weekDay);
    };

    function handleReloadBackend(weekDay) {
        setTimeout(() => {
            getDataBackend(weekDay);
        }, 500);
    }

    return (
        <Col className="pt-4 attention-height">
            <Row className="text-center">
                <Col className="text-center attention-loading">
                    <h1 className="fw-bold ">Seleccione un día y hora</h1>
                </Col>
            </Row>
            <Row className="text-center attention-calendar">
                <Col className="pt-2">
                    <h4>
                        {months[currentDate.getMonth()]}
                        {"  "}
                        {currentDate.getFullYear()}
                    </h4>
                </Col>
                <Col className="pt-2">
                    <ButtonGroup aria-label="Basic example">
                        <Button
                            variant="primary"
                            onClick={lastMonth}
                            className="m-1"
                            disabled={loadingCalendar || loadingHours}
                        >
                            <ChevronDoubleLeft size={25} color="white" />
                        </Button>
                        <Button
                            variant="primary"
                            onClick={goToCurrentDate}
                            disabled={loadingCalendar || loadingHours}
                            className="m-1"
                        >
                            <h6>Hoy</h6>
                        </Button>
                        <Button
                            variant="primary"
                            onClick={nextMonth}
                            className="m-1"
                            disabled={loadingCalendar || loadingHours}
                        >
                            <ChevronDoubleRight size={25} color="white" />
                        </Button>
                    </ButtonGroup>
                </Col>
                <hr />
            </Row>
            <Row className="text-center justify-content-center attention-calendar-shadow-box attention-calendar">
                <Col>
                    <Row className={`${dynamicFontSize} flex-nowrap`}>
                        {weekDaysTable.map((wdt, i) => {
                            return (
                                <Col className="p-0 pb-4" key={i}>
                                    <strong>{wdt}</strong>
                                </Col>
                            );
                        })}
                    </Row>
                </Col>
                {weekDaysTitle.map((weeks, weeksIndex) => {
                    return (
                        <Row
                            className={`${dynamicFontSize} flex-nowrap pb-4`}
                            data-aos="fade-down"
                            key={weeksIndex}
                        >
                            {weeks.map((weekDay, weekDayIndex) => {
                                const dayName = weekDay.split(" ")[0];

                                const currentDay = today.getDate();
                                const currentMonth = today.getMonth() + 1;

                                const day = weekDay.split(" ")[1];
                                const month = weekDay.split(" ")[2];

                                const formattedDay = day
                                    .toString()
                                    .padStart(2, "0");

                                if (specialty == "Kinesiología") {
                                    if (
                                        month < currentMonth ||
                                        dayName == "Domingo" ||
                                        (day < currentDay + 2 &&
                                            currentMonth == month)
                                    ) {
                                        return (
                                            <Col
                                                className="p-0"
                                                key={`${weeksIndex}-${weekDayIndex}`}
                                            >
                                                <Button
                                                    disabled
                                                    className={`${dynamicFontSize} btn-calendar`}
                                                    variant="outline-primary border-light"
                                                >
                                                    {formattedDay}
                                                </Button>
                                            </Col>
                                        );
                                    } else {
                                        return (
                                            <Col
                                                className="p-0"
                                                key={`${weeksIndex}-${weekDayIndex}`}
                                            >
                                                <Button
                                                    disabled={
                                                        loadingCalendar ||
                                                        loadingHours
                                                    }
                                                    className={`${dynamicFontSize} btn-calendar`}
                                                    variant="outline-primary border-light"
                                                    onClick={() =>
                                                        getDayHours(weekDay)
                                                    }
                                                >
                                                    {formattedDay}
                                                </Button>
                                            </Col>
                                        );
                                    }
                                }

                                if (specialty == "Psicología") {
                                    if (
                                        month < currentMonth ||
                                        (dayName != "Viernes" &&
                                            dayName != "Sabado") ||
                                        (day < currentDay + 2 &&
                                            currentMonth == month)
                                    ) {
                                        return (
                                            <Col
                                                className="p-0"
                                                key={`${weeksIndex}-${weekDayIndex}`}
                                            >
                                                <Button
                                                    disabled
                                                    className={`${dynamicFontSize} btn-calendar`}
                                                    variant="outline-primary border-light"
                                                >
                                                    {formattedDay}
                                                </Button>
                                            </Col>
                                        );
                                    } else {
                                        return (
                                            <Col
                                                className="p-0"
                                                key={`${weeksIndex}-${weekDayIndex}`}
                                            >
                                                <Button
                                                    disabled={
                                                        loadingCalendar ||
                                                        loadingHours
                                                    }
                                                    className={`${dynamicFontSize} btn-calendar`}
                                                    variant="outline-primary border-light"
                                                    onClick={() =>
                                                        getDayHours(weekDay)
                                                    }
                                                >
                                                    {formattedDay}
                                                </Button>
                                            </Col>
                                        );
                                    }
                                }

                                if (specialty == "Kinesiología") {
                                    if (
                                        month < currentMonth ||
                                        dayName == "Domingo" ||
                                        (day < currentDay + 2 &&
                                            currentMonth == month)
                                    ) {
                                        return (
                                            <Col
                                                className="p-0"
                                                key={`${weeksIndex}-${weekDayIndex}`}
                                            >
                                                <Button
                                                    disabled
                                                    className={`${dynamicFontSize} btn-calendar`}
                                                    variant="outline-primary border-light"
                                                >
                                                    {formattedDay}
                                                </Button>
                                            </Col>
                                        );
                                    } else {
                                        return (
                                            <Col
                                                className="p-0"
                                                key={`${weeksIndex}-${weekDayIndex}`}
                                            >
                                                <Button
                                                    disabled={
                                                        loadingCalendar ||
                                                        loadingHours
                                                    }
                                                    className={`${dynamicFontSize} btn-calendar`}
                                                    variant="outline-primary border-light"
                                                    onClick={() =>
                                                        getDayHours(weekDay)
                                                    }
                                                >
                                                    {formattedDay}
                                                </Button>
                                            </Col>
                                        );
                                    }
                                }
                            })}
                        </Row>
                    );
                })}
            </Row>
            {daySelected && (
                <Row className="text-center pt-4 attention-calendar">
                    <Col>
                        {loadingHours && (
                            <Spinner
                                animation="border"
                                role="status"
                                variant="primary"
                            >
                                <h3>
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </h3>
                            </Spinner>
                        )}
                        {!loadingHours && (
                            <>
                                {dayHours.map((dayHour, index) => {
                                    const dayHourSplit = dayHour.split(":")[0];

                                    const dayHourNumber = Number(dayHourSplit);

                                    const hourMatch = hours.find(
                                        (obj) =>
                                            obj.hour === dayHourNumber &&
                                            obj.program.specialty === specialty
                                    );

                                    const dayName = daySelected.split(" ")[0];

                                    if (specialty == "Kinesiología") {
                                        if (
                                            !hourMatch &&
                                            (dayName !== "Sabado" ||
                                                (dayName === "Sabado" &&
                                                    dayHourNumber <= 12))
                                        ) {
                                            return (
                                                <Button
                                                    key={index}
                                                    variant="primary"
                                                    disabled={loadingCalendar}
                                                    className="m-1"
                                                    onClick={() =>
                                                        goStage3(
                                                            daySelected,
                                                            dayHour
                                                        )
                                                    }
                                                >
                                                    <h6>{dayHour}</h6>
                                                </Button>
                                            );
                                        }
                                    }

                                    if (specialty == "Psicología") {
                                        if (
                                            !hourMatch &&
                                            ((dayName === "Sabado" &&
                                                dayHourNumber >= 9 &&
                                                dayHourNumber <= 12) ||
                                                (dayName === "Viernes" &&
                                                    dayHourNumber >= 15 &&
                                                    dayHourNumber <= 20))
                                        ) {
                                            return (
                                                <Button
                                                    key={index}
                                                    variant="primary"
                                                    disabled={loadingCalendar}
                                                    className="m-1"
                                                    onClick={() =>
                                                        goStage3(
                                                            daySelected,
                                                            dayHour
                                                        )
                                                    }
                                                >
                                                    <h6>{dayHour}</h6>
                                                </Button>
                                            );
                                        }
                                    }

                                    if (specialty == "Nutrición") {
                                        if (
                                            !hourMatch &&
                                            ((dayName === "Sabado" &&
                                                dayHourNumber >= 9 &&
                                                dayHourNumber <= 12) ||
                                                (dayName === "Viernes" &&
                                                    dayHourNumber >= 18 &&
                                                    dayHourNumber <= 20))
                                        ) {
                                            return (
                                                <Button
                                                    key={index}
                                                    variant="primary"
                                                    disabled={loadingCalendar}
                                                    className="m-1"
                                                    onClick={() =>
                                                        goStage3(
                                                            daySelected,
                                                            dayHour
                                                        )
                                                    }
                                                >
                                                    <h6>{dayHour}</h6>
                                                </Button>
                                            );
                                        }
                                    }
                                })}
                            </>
                        )}
                    </Col>
                </Row>
            )}
            <Row className="text-center pt-4">
                {!loadingCalendar && (
                    <Col>
                        <Button
                            variant="secondary"
                            onClick={() => goStage1()}
                            className="m-1"
                        >
                            <h6>Volver</h6>
                        </Button>
                    </Col>
                )}

                {loadingCalendar && (
                    <Col>
                        <Spinner
                            animation="border"
                            role="status"
                            variant="primary"
                        >
                            <h3>
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </h3>
                        </Spinner>
                    </Col>
                )}
            </Row>
        </Col>
    );
}
