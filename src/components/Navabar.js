import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";


export default function Navabar() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        fetch(`https://mapbook-memories-backend.herokuapp.com/logout`, {
            method: "DELETE",
        }).then(setUser());
    };
    return (
        // Render responsive Navbar for all routes within webpage, Navbar will be fixed to top of application regardless of Components.
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <div className="container-fluid">
                <div className="nav-link navbar-brand">
                <i role='button' className="bi bi-arrow-bar-left text-light" onClick={()=>navigate(-1)}></i>
                <Link className="text-light" to="/">MapBook Memories</Link>
                <i role='button' className="bi bi-arrow-bar-right text-light" onClick={()=>navigate(1)}></i>
                </div>
           
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="nav-item dropdown navbar-nav me-auto mb-2 mb-lg-0">
                        <Link className="nav-link text-light space" to='/'>Dashboard</Link>
                        <Link className="nav-link text-light dropdown-toggle space" role='button' to="#" data-bs-toggle="dropdown">Locations</Link>
                        <ul className="dropdown-menu dowpdown-menu-end mt-2">
                            <Link className="nav-link text-dark dropdown-item" to='/locations'>
                                Collection
                            </Link>
                            <Link className="nav-link text-dark dropdown-item" to='/locations/new'>
                                Add New
                            </Link>
                        </ul>
                        <Link className="nav-link text-light dropdown-toggle space" role='button' to="#" data-bs-toggle="dropdown">Trips</Link>
                        <ul className="dropdown-menu dowpdown-menu-end mt-2">
                            <Link className="nav-link text-dark dropdown-item" to='/trips/gallery'>
                                Gallery
                            </Link>
                            <Link className="nav-link text-dark dropdown-item" to='/trips'>
                                Collection
                            </Link>
                            <Link className="nav-link text-dark dropdown-item" to='/trips/new'>
                                Add New
                            </Link>
                        </ul>
                        <Link className="nav-link text-light space" to='/about'>About</Link>

                        <Link
                            className="nav-link text-light space"
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
