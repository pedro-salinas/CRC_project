// React
import { useState, useEffect } from "react";

// Bootstrap
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import Spinner from "react-bootstrap/Spinner";

// Bootstrap icons
import { Telephone, Whatsapp, GeoAlt } from "react-bootstrap-icons";

// Utilidad para saber si es que estamos en movil o no
import { MobileHandler } from "../../utils/MobileHandler";

// Api
import { getPrograms } from "../../api/program";
import { getKinesInfo } from "../../api/kine";

// Importar etapas
import { Stage1 } from "./Stage1";
import { Stage2 } from "./Stage2";
import { Stage3 } from "./Stage3";
import { Stage4 } from "./Stage4";

export function AttentionProgress() {
    // Convertir fecha a formato de texto
    const transformDate = (dateString, hourString) => {
        // Split the string into parts
        const fullSplit = dateString + " " + hourString;

        const [dayOfWeek, dayOfMonth, month, year, time] = fullSplit.split(" ");

        // Array with the names of the months
        const months = [
            "enero",
            "febrero",
            "marzo",
            "abril",
            "mayo",
            "junio",
            "julio",
            "agosto",
            "septiembre",
            "octubre",
            "noviembre",
            "diciembre",
        ];

        // Convert the month number into the month name
        const monthName = months[parseInt(month, 10) - 1];

        // Format the final string
        return `${dayOfWeek} ${dayOfMonth} de ${monthName} a las ${time} hrs.`;
    };

    const { isMobile } = MobileHandler();

    // CSS movil
    const dynamicPadding = isMobile
        ? "attention-mobile-padding"
        : "attention-desktop-padding";

    // Porcentaje barra de progreso
    const [percentage, setPercentage] = useState(0);

    // Programas
    const [programs, setPrograms] = useState();

    // Especialidades
    const [specialists, setSpecialists] = useState();

    // Etapa
    const [stage, setStage] = useState();

    // Barra cargando
    const [loading, setLoading] = useState(true);

    const getDataBackend = async () => {
        try {
            const res = await getPrograms();

            const res2 = await getKinesInfo();

            setPrograms(res.data);
            setSpecialists(res2.data);

            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("stage") == 1) {
            setPercentage(25);
            localStorage.setItem("stage", 1);
            setStage(1);
        } else if (localStorage.getItem("stage") == 2) {
            setPercentage(50);
            localStorage.setItem("stage", 2);
            setStage(2);
        } else if (localStorage.getItem("stage") == 3) {
            setPercentage(75);
            localStorage.setItem("stage", 3);
            setStage(3);
        } else if (localStorage.getItem("stage") == 4) {
            setPercentage(100);
            localStorage.setItem("stage", 4);
            setStage(4);
        } else {
            setPercentage(25);
            localStorage.setItem("stage", 1);
            setStage(1);
        }
    }, [stage]);

    function handleReload() {
        setTimeout(() => {
            getDataBackend();
        }, 1000);
    }

    const goStage1 = () => {
        localStorage.setItem("stage", 1);
        setStage(1);

        localStorage.removeItem("prevision");
        localStorage.removeItem("price");
        localStorage.removeItem("program");
        localStorage.removeItem("specialty");
        localStorage.removeItem("day");
        localStorage.removeItem("hour");
        localStorage.removeItem("fullHour");
        localStorage.removeItem("rut");
        localStorage.removeItem("email");
    };

    const goStage2 = (programSelected, price, prevision) => {
        if (!programSelected || !price || !prevision) {
            setStage(2);
            localStorage.setItem("stage", 2);
        } else {
            setStage(2);
            localStorage.setItem("stage", 2);

            console.log(programSelected.specialty);

            localStorage.setItem("program", JSON.stringify(programSelected));
            localStorage.setItem("specialty", programSelected.specialty);
            localStorage.setItem("price", price);
            localStorage.setItem("prevision", prevision);
        }
    };

    const goStage3 = (daySelected, dayHour) => {
        if (!daySelected || !dayHour) {
            setStage(3);
            localStorage.setItem("stage", 3);
        } else {
            setStage(3);
            localStorage.setItem("stage", 3);

            localStorage.setItem("day", daySelected);
            localStorage.setItem("hour", dayHour);

            localStorage.setItem(
                "fullHour",
                transformDate(daySelected, dayHour)
            );
        }
    };

    const goStage4 = () => {
        setStage(4);
        localStorage.setItem("stage", 4);
    };

    useEffect(() => {
        handleReload();
    }, []);

    return (
        <Container id="info" className={dynamicPadding}>
            <Row className="text-center pb-4" data-aos="fade-down">
                <h1>
                    <strong>Agendar una hora</strong>
                </h1>
            </Row>
            <ProgressBar
                animated
                now={percentage}
                variant="primary"
                data-aos="fade-down"
            />

            {stage === 1 && !loading && (
                <Stage1 programs={programs} goStage2={goStage2} />
            )}

            {/* {stage === 2 && !loading && (
                <Stage2
                    specialists={specialists}
                    goStage1={goStage1}
                    goStage3={goStage3}
                />
            )} */}

            {stage === 2 && !loading && (
                <Stage2
                    goStage1={goStage1}
                    goStage3={goStage3}
                    isMobile={isMobile}
                />
            )}

            {stage === 3 && !loading && (
                <Stage3 goStage2={goStage2} goStage4={goStage4} />
            )}

            {stage === 4 && !loading && <Stage4 goStage1={goStage1} />}

            {loading && (
                <Row
                    className="text-center pt-4 attention-height"
                    data-aos="fade-down"
                >
                    <Col>
                        <Spinner
                            animation="border"
                            role="status"
                            variant="primary"
                        >
                            <span className="visually-hidden ">Loading...</span>
                        </Spinner>
                    </Col>
                </Row>
            )}
        </Container>
    );
}
