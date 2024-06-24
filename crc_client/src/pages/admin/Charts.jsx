// Componentes
import { CustomNavbarAdmin } from "../../components/adminPage/CustomNavbarAdmin";
import { ProfilesTable } from "../../components/adminPage/charts/ProfilesTable";

export function Charts() {
    return (
        <div>
            <CustomNavbarAdmin />
            <ProfilesTable />
        </div>
    );
}
