// Bootstrap
import Card from "react-bootstrap/Card";

// Calendario
import { Calendar } from "./Calendar";

export function AttentionsCalendar() {
    return (
        <Card className="m-4 card-form">
            <Card.Header className="card-form-header ">
                Calendario de atenciones
            </Card.Header>

            <Card.Body>
                <Calendar></Calendar>
            </Card.Body>
        </Card>
    );
}
