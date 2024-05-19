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

// Importar API
import {
    getAttentions,
    insertAttentionRequest,
    deleteAttention,
} from "../../api/attention";
import { getPrograms } from "../../api/program";
import { getKines } from "../../api/kine";
import { insertClientRequest } from "../../api/client";

// Importar etapas
import { Stage1 } from "./Stage1";
import { Stage2 } from "./Stage2";

export function AttentionProgress() {
    const { isMobile } = MobileHandler();

    // Padding para movil o navegador
    const dynamicStyle = {
        paddingTop: isMobile ? "80px" : "150px",
    };

    // Porcentaje barra de progreso
    const [percentage, setPercentage] = useState(0);

    // Programas y atenciones
    const [programs, setPrograms] = useState();
    const [attentions, setAttentions] = useState();

    const [program, setProgram] = useState();
    const [attention, setAttention] = useState();

    // Etapa
    const [stage, setStage] = useState();

    // Barra cargando
    const [loading, setLoading] = useState(true);

    const getDataBackend = async () => {
        try {
            const res = await getAttentions();
            const res2 = await getPrograms();

            setAttentions(res.data);
            setPrograms(res2.data);
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

    const goStage2 = (programSelected) => {
        localStorage.setItem("program", JSON.stringify(programSelected));
        localStorage.setItem("stage", 2);
        setStage(2);
        setProgram(programSelected);
    };

    const goStage3 = () => {
        // localStorage.setItem("program", JSON.stringify(programSelected));
        localStorage.setItem("stage", 3);
        setStage(3);
        // setProgram(programSelected);
    };

    useEffect(() => {
        handleReload();
    }, []);

    return (
        <Container style={dynamicStyle} id="info" data-aos="fade-down">
            <Row className="text-center" data-aos="fade-down">
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
            <Row className="text-center pt-2" data-aos="fade-down"></Row>

            {stage === 1 && !loading && (
                <Stage1 programs={programs} goStage2={goStage2} />
            )}

            {stage === 2 && !loading && (
                <Stage2
                    attentions={attentions}
                    goStage3={goStage3}
                    isMobile={isMobile}
                />
            )}

            {stage === 3 && !loading && <>stage 3</>}

            {stage === 4 && !loading && <>stage 4</>}

            {loading && (
                <Row className="text-center" style={{ minHeight: "250px" }}>
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
        </Container>
    );
}
