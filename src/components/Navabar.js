import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";


export default function Navabar() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        fetch(`/logout`, {
            method: "DELETE",
        }).then(setUser());
    };
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <div class="container-fluid">
                <Link class="nav-link navbar-brand" to="/">MapBook Memories</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="nav-item dropdown navbar-nav me-auto mb-2 mb-lg-0">
                        <Link className="nav-link text-light dropdown-toggle" role='button' to="#" data-bs-toggle="dropdown">Locations</Link>
                        <ul className="dropdown-menu dowpdown-menu-end mt-2">
                            <Link className="nav-link text-dark dropdown-item" to='/locations'>
                                Collection
                            </Link>
                            <Link className="nav-link text-dark dropdown-item" to='/locations'>
                                Add New
                            </Link>
                        </ul>
                        <Link className="nav-link text-light dropdown-toggle" role='button' to="#" data-bs-toggle="dropdown">Trips</Link>
                        <ul className="dropdown-menu dowpdown-menu-end mt-2">
                            <Link className="nav-link text-dark dropdown-item" to='/'>
                                Gallery
                            </Link>
                            <Link className="nav-link text-dark dropdown-item" to='/trips'>
                                Collection
                            </Link>
                            <Link className="nav-link text-dark dropdown-item" to='/trips/new'>
                                Add New
                            </Link>
                        </ul>
                        <Link
                            className="nav-link text-light"
                            to="/"
                            onClick={() => {
                                handleLogOut()
                                navigate('/')
                            }}
                        >
                            Log Out
                        </Link>
                    </div>
                </div>
            </div>
        </nav>

    )
}
