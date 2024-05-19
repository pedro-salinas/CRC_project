import { CustomNavbarAdmin } from "../../components/adminPage/CustomNavbarAdmin";
import { ProgramsTable } from "../../components/adminPage/programs/ProgramsTable";

export function Programs() {
    return (
        <div>
            <CustomNavbarAdmin />
            <ProgramsTable />
        </div>
    );
}
