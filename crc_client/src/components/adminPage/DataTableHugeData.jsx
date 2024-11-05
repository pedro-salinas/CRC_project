import { useMemo, useState, useCallback, useEffect } from "react";
import { Form, Col, Row, InputGroup, Button, Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { formatDate } from "../../utils/dateUtils";

const handleSelectChange = (setSelectText) => (e) => {
    setSelectText(e.target.value);
};

export function DataTableHugeData({
    data,
    columns,
    onRowSelected,
    singleSelection,
}) {
    const [selectedRows, setSelectedRows] = useState([]);

    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    // Función para filtrar datos

    const handleRowSelected = useCallback(
        (state) => {
            const updatedSelectedRows = state.selectedRows;
            setSelectedRows(updatedSelectedRows);
            onRowSelected(updatedSelectedRows);
        },
        [onRowSelected]
    );

    return (
        <>
            <DataTable
                columns={columns}
                data={data}
                pagination={true}
                paginationResetDefaultPage={resetPaginationToggle}
                persistTableHead={true}
                selectableRows={true}
                selectableRowsNoSelectAll={singleSelection}
                selectableRowsSingle={singleSelection}
                paginationComponentOptions={{
                    rowsPerPageText: "Filas por página:",
                }}
                wrap={true}
                noDataComponent=""
                defaultSortFieldId={"update"}
                defaultSortAsc={false}
                onSelectedRowsChange={handleRowSelected}
            />
        </>
    );
}
