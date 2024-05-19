import { CustomNavbarAdmin } from "../../components/adminPage/CustomNavbarAdmin";
import { ClientsTable } from "../../components/adminPage/clients/ClientsTable";

export function Clients() {
    return (
        <div>
            <CustomNavbarAdmin />
            <ClientsTable />
        </div>
    );
}
