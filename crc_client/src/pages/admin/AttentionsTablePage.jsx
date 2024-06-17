// Componentes
import { CustomNavbarAdmin } from "../../components/adminPage/CustomNavbarAdmin";
import { AttentionsTable } from "../../components/adminPage/attentions/AttentionsTable";

export function AttentionsTablePage() {
    return (
        <div>
            <CustomNavbarAdmin />
            <AttentionsTable />
        </div>
    );
}
