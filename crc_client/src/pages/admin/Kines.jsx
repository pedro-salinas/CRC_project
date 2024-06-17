// Componentes
import { CustomNavbarAdmin } from "../../components/adminPage/CustomNavbarAdmin";
import { KinesTable } from "../../components/adminPage/kines/KinesTable";

export function Kines() {
    return (
        <div>
            <CustomNavbarAdmin />
            <KinesTable />
        </div>
    );
}
