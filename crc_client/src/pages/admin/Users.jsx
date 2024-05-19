import { CustomNavbarAdmin } from "../../components/adminPage/CustomNavbarAdmin";
import { UsersTable } from "../../components/adminPage/users/UsersTable";

export function Users() {
    return (
        <div>
            <CustomNavbarAdmin />
            <UsersTable />
        </div>
    );
}
