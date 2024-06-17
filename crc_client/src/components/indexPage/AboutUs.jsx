// Bootstrap
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";

// Utilidad para saber si es que estamos en movil o no
import { MobileHandler } from "../../utils/MobileHandler";

// Imagenes
import chris from "../../assets/crc_chris.webp";
import taekwondo from "../../assets/chris_taekwondo.webp";
import estilo from "../../assets/chris_estilo.webp";
import estudiar from "../../assets/chris_estudiar.webp";

export function AboutUs() {
    const { isMobile } = MobileHandler();

    // Padding para movil o navegador
    const dynamicStyleInfo = {
        paddingTop: isMobile ? "60px" : "150px",
    };

    const fontSizeTitle = {
        fontSize: isMobile ? "36px" : "56px",
    };

    return (
        <Container style={dynamicStyleInfo} id="info">
            <Row className="text-center">
                <Row className="text-center" data-aos="fade-up">
                    <h1 style={fontSizeTitle}>
                        <strong>Suena todo muy bonito, pero. . .</strong>
                    </h1>
                </Row>
                <Row
                    className="pt-4 text-center justify-content-center"
                    data-aos="fade-up"
                >
                    <Col xs={10}>
                        <h4>
                            Para explicarte cómo surgió este sistema, es
                            importante que te cuente un poco sobre mi propio
                            proceso y quién soy.
                        </h4>
                    </Col>
                </Row>
                <Row className="pt-4" data-aos="fade-up">
                    <Col sm={12} md={6} className="pt-4">
                        {!isMobile ? (
                            <Image src={chris} width="300px" />
                        ) : (
                            <Image src={chris} width="250px" />
                        )}
                    </Col>
                    <Col sm={12} md={6}>
                        <h5 className="pt-4 text-start">
                            Soy Christopher Ramírez, Kinesiólogo
                            musculoesquelético,
                            <strong> fundador de CRC Kinesiología.</strong>
                        </h5>
                        <h5 className="pt-4 text-start">
                            Pero no siempre fui quien soy ahora, ya que mi
                            transformación comenzó durante mis años de
                            estudiante universitario...
                        </h5>
                        <h3 className="pt-4">
                            <strong>
                                Cuando perdí completamente mi estilo de vida en
                                2016, de un momento a otro.
                            </strong>
                        </h3>
                    </Col>
                </Row>
                <Row
                    className="pt-4 text-center justify-content-center"
                    data-aos="fade-up"
                >
                    <Col xs={12}>
                        <h4 className="pt-4">
                            En ese tiempo solo me dedicaba a trabajar, estudiar
                            y por sobre todo ENTRENAR.
                        </h4>
                        <h4 className="pt-4">
                            Practicaba deportes por horas a diario, hasta que de
                            un momento a otro, el
                            <span style={{ color: "red" }}>
                                {" "}
                                dolor lumbar y de cadera derecha{" "}
                            </span>
                            no me permitieron seguir. Le pregunte a todos los
                            profesores que tenía, y cada uno me daba un
                            <span style={{ color: "red" }}>
                                {" "}
                                pronóstico peor
                            </span>
                            , alejandome cada vez más de mi vida deportiva.
                        </h4>
                    </Col>
                </Row>
                <Row className="pt-4 text-center" data-aos="fade-up">
                    <h1>
                        <strong>
                            No estaba preparado para recibir ese diagnóstico;
                            {"  "}
                        </strong>
                        <strong>
                            me sentí abrumado por lo que significaba para mi
                            futuro.
                        </strong>
                    </h1>
                </Row>
                <Row className="pt-4" data-aos="fade-up">
                    <Col sm={12} md={6}>
                        <h5 className="pt-4 text-start">
                            Fuí a distintos especialistas buscando opiniones,
                            tomándome resonancias, ecografías, entre otros,
                            quienes me aseguraron que por mi pinzamiento de
                            cadera y esa hernia
                            <span style={{ color: "red" }}>
                                {"  "}NO PODRÍA VOLVER A PRACTICAR DEPORTES...
                            </span>
                        </h5>
                        <h5 className="pt-4 text-start">
                            Incluso me propusieron una{" "}
                            <span style={{ color: "red" }}>
                                {"  "}OPERACIÓN
                            </span>{" "}
                            para corregir esas “lesiones”, pero sólo si estaba
                            dispuesto a renunciar al Taekwondo y a cualquier
                            deporte de impacto
                        </h5>
                        <h3 className="pt-4 text-start">
                            <strong>
                                Sin emargo, no dejaría que me quitaran mi estilo
                                de vida.
                            </strong>
                        </h3>
                    </Col>
                    <Col sm={12} md={6} className="pt-4 ">
                        {!isMobile ? (
                            <Image src={taekwondo} width="300px" />
                        ) : (
                            <Image src={taekwondo} width="250px" />
                        )}
                    </Col>
                </Row>
                <Row className="pt-4" data-aos="fade-up">
                    <Col sm={12} md={6} className="pt-4">
                        {!isMobile ? (
                            <Image src={estilo} width="500px" />
                        ) : (
                            <Image src={estilo} width="450px" />
                        )}
                    </Col>
                    <Col sm={12} md={6}>
                        <h5 className="pt-4 text-start">
                            Como me costaba moverme ante ejercicios y/o
                            movimientos de mayor intensidad y no podía entrenar,
                            sólo me quedaba una cosa ....
                        </h5>
                        <h3 className="pt-4">
                            <strong>Estudiar</strong>
                        </h3>
                        <h5 className="pt-4 text-start">
                            Así fue como aprendí aun más de kinesiología, pero
                            no con el método de mi universidad (ya que iba en
                            tercero en ese momento), sino que lo hice mediante
                            cursos con <strong>especialistas</strong> de Chile y
                            el extranjero, considerando enseñanzas de modelos
                            terapéuticos utilizados en{" "}
                            <strong>EE.UU, Dinamarca, Canadá</strong>, etc., con
                            el fin de hallar una forma de tratamiento efectiva.
                        </h5>
                        <h3 className="pt-4">
                            <strong>¡Hasta que la encontré!</strong>
                        </h3>
                    </Col>
                </Row>
                <Row className="pt-4 text-center" data-aos="fade-up">
                    <h1>
                        <strong>Una solución</strong>
                        <strong>
                            sin cirugías, sin exámenes, sin medicamentos
                        </strong>
                    </h1>
                </Row>
                <Row className="pt-4" data-aos="fade-up">
                    <Col sm={12} md={6}>
                        <h5 className="pt-4 text-start">
                            Aprendí métodos de evaluación complejos, que
                            mientras más completos fueran más posibilidades me
                            entregaban para descubrir que tratamiento era
                            pertinente en cada caso. De esta forma, mejore la
                            evaluación misma en mi caso y pude dar con el
                            tratamiento que necesitaba.
                        </h5>
                        <h5 className="pt-4 text-start">
                            Y por medio del tratamiento adecuado y un proceso
                            complejo, alcancé por fin lo que yo anhelaba.
                        </h5>
                        <h3 className="pt-4">
                            <strong>
                                ¡Moverme sin ninguna Limitación y volver a mi
                                deporte en mejores condiciones que antes!
                            </strong>
                        </h3>
                    </Col>
                    <Col sm={12} md={6}>
                        {!isMobile ? (
                            <Image src={estudiar} width="500px" />
                        ) : (
                            <Image src={estudiar} width="450px" />
                        )}
                    </Col>
                </Row>
                <Row
                    className="pt-4 text-center justify-content-center"
                    data-aos="fade-up"
                >
                    <Col xs={8}>
                        <h4 className="pt-4">
                            Sabía que no sólo yo estaba en esta situación, así
                            que me dediqué a ayudar a otros a lograr los cambios
                            que logré en mí mismo.
                        </h4>
                        <h4 className="pt-4">
                            Potencié aún más el proceso de evaluación.
                        </h4>
                        <h4 className="pt-4">
                            <strong>Me tomo 5 años perfeccionarlo</strong>,
                            hasta que finalmente decidí que era el momento
                            correcto para ponerlo a prueba.
                        </h4>
                    </Col>
                </Row>
            </Row>
        </Container>
    );
}
