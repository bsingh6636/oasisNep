import { BackendPort } from "../../Const/url";

    export const handleAdminLogout = async () => {
        await fetch(`${BackendPort}/admin/logout`, { credentials: 'include' })
    };