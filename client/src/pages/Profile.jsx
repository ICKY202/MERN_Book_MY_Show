import { useSelector } from "react-redux";
import { ROLE } from "../utils/constants";
import Admin from "./Admin/Admin";
import Partner from "./Partner/partner";
import User from "./User/User";

export default function Profile() {

    const { user } = useSelector((state) => state.user);
    console.log(user);
    if(user?.role === ROLE.ADMIN) {
        return <Admin />;
    }else if(user?.role === ROLE.PARTNER) {
        return <Partner />;
    }

    return <User />
}