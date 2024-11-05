import { Form, Col, Row, InputGroup, Button } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

export function HugeTableHeader({
    columnsForSelect,
    loadingTable,
    setTextFilter,
    setSelectFilter,
    applyFilter,
}) {
    const handleTextFilterChange = (e) => {
        setTextFilter(e.target.value);
    };

    // Maneja el cambio del select
    const handleSelectFilterChange = (e) => {
        setSelectFilter(e.target.value);
    };

    return (
        <>
            <Row className="justify-content-end">
                <Col xs={12} sm={4} md={3} lg={2} className="p-2">
                    <InputGroup>
                        <Form.Control
                            id="search"
                            type="text"
                            placeholder="Buscar..."
                            onChange={handleTextFilterChange}
                        />
                        <Button
                            variant="primary"
                            disabled={!loadingTable}
                            onClick={applyFilter}
                        >
                            <Search size={20} color="white" />
                        </Button>
                    </InputGroup>
                </Col>
                <Col xs={12} sm={4} md={3} lg={2} className="p-2">
                    <Form.Select
                        onChange={handleSelectFilterChange}
                        disabled={!loadingTable}
                    >
                        {columnsForSelect.map((cols, i) => (
                            <option key={i} value={cols.value}>
                                {cols.label}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
            </Row>
        </>
    );
}
