import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/user";

export default function Navabar() {
    const { user, setUser } = useContext(UserContext);

    const handleLogOut = () => {
        fetch(`/logout`, {
            method: "DELETE",
        }).then(setUser());
    };
    return (
        <div>
            <Link
                className="nav-link text-dark dropdown-item"
                to="/"
                onClick={handleLogOut}
            >
                Log Out
            </Link>

        </div>
    )
}
