// React
import { useMemo, useState, useCallback, useEffect } from "react";

// Bootstrap
import { Form, Col, Row } from "react-bootstrap";

// React data table
import DataTable from "react-data-table-component";

// Tiempo
import moment from "moment-timezone";
export const timeZone = "America/Santiago";

const handleSelectChange = (setSelectText) => (e) => {
    setSelectText(e.target.value);
};

const FilterComponent = ({
    filterText,
    onFilter,
    selectText,
    setSelectText,
    columnsForSelect,
}) => (
    <>
        <Row>
            <Col>
                <Form.Control
                    id="search"
                    type="text"
                    placeholder="Buscar..."
                    value={filterText}
                    onChange={onFilter}
                />
            </Col>
            <Col>
                <Form.Select
                    value={selectText}
                    onChange={handleSelectChange(setSelectText)}
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

export function Table({
    data,
    columns,
    columnsForSelect,
    onRowSelected,
    singleSelection,
}) {
    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleCleared, setToggleCleared] = useState(false);

    const [statedData, setStatedData] = useState(data);

    const [selectText, setSelectText] = useState(() => {
        return localStorage.getItem("selectText") || "all";
    });
    const [filterText, setFilterText] = useState(() => {
        return localStorage.getItem("filterText") || "";
    });

    useEffect(() => {
        localStorage.setItem("selectText", selectText); // Guardar selectText en Local Storage
    }, [selectText]); // Guardar cuando selectText cambia

    useEffect(() => {
        localStorage.setItem("filterText", filterText); // Guardar filterText en Local Storage
    }, [filterText]); // Guardar cuando filterText cambia

    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    const filteredItems = statedData.filter((item) => {
        return Object.entries(item).some(([key, value]) => {
            if (key === "program" && value && value.name) {
                value = value.name;
            }

            // Reemplazar el valor de la clave "client" con el valor de "name" si existe
            if (key === "client" && value && value.name) {
                value = value.name;
            }

            // Reemplazar el valor de la clave "kine" con el valor de "name" si existe
            if (key === "kine" && value && value.name) {
                value = value.name;
            }

            if (["_id", "__v", "password"].includes(key)) {
                return false; // Ignorar los campos _id y __v
            }

            if (value === null || value === undefined) {
                return false;
            }

            if (key === "is_staff" || key === "is_admin") {
                value = value ? "Sí" : "No";
            }

            if (
                key === "updatedAt" ||
                key === "createdAt" ||
                key === "last_login"
            ) {
                value = moment(value).tz(timeZone).format("YYYY-MM-DD HH:mm");
            }

            if (key !== selectText && selectText !== "all") {
                return false;
            }

            const includesMatch = value
                .toString()
                .toLowerCase()
                .includes(filterText.toLowerCase());
            // Imprimir match
            // if (includesMatch) {
            //     console.log(
            //         `Match encontrado en la propiedad '${key}' del objeto:`
            //     );
            //     console.log(value);
            // }
            return includesMatch;
        });
    });

    const subHeaderComponentMemo = useMemo(() => {
        return (
            <FilterComponent
                onFilter={(e) => setFilterText(e.target.value)}
                filterText={filterText}
                selectText={selectText}
                setSelectText={setSelectText}
                columnsForSelect={columnsForSelect}
            />
        );
    }, [filterText, resetPaginationToggle, selectText]);

    const handleRowSelected = useCallback(
        (state) => {
            const updatedSelectedRows = state.selectedRows; // Obtén el valor directamente del estado
            setSelectedRows(updatedSelectedRows); // Actualiza el estado del componente hijo
            onRowSelected(updatedSelectedRows); // Usa el valor actualizado para el callback
        },
        [onRowSelected] // Depende solo del callback pasado por el padre
    );

    return (
        <DataTable
            columns={columns}
            data={filteredItems}
            pagination={true}
            paginationResetDefaultPage={resetPaginationToggle}
            subHeader={true}
            subHeaderComponent={subHeaderComponentMemo}
            persistTableHead={true}
            selectableRows={true}
            selectableRowsNoSelectAll={singleSelection}
            selectableRowsSingle={singleSelection}
            paginationComponentOptions={{
                rowsPerPageText: "Filas por página:",
            }}
            wrap={true}
            noDataComponent="No hay datos que mostrar"
            defaultSortFieldId={1}
            onSelectedRowsChange={handleRowSelected}
        />
    );
}
