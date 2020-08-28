import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Header({ isAuthenticated }) {
    const CheckIsAuthenticated = isAuthenticated;

    function handleLogout(event) {
        event.preventDefault();
        axios.get('api/logout').
            then(
                window.location.replace("/")
            );
    }

    return (

        <header className="flex justify-between items-center bg-dark">
            <h1 className="text-lightgrey text-4xl py-4 px-8 cursor-pointer" onClick={() => window.location.replace("/home")}>InQuery</h1>
            {
                CheckIsAuthenticated === true ? (<Link className="text-center p-2 mr-8 bg-light rounded-full w-20" to={process.env.PUBLIC_URL + '/'} onClick={handleLogout}>Log out</Link>) : (
                    <Link className="text-center p-2 mr-8 bg-light rounded-full w-20" to={process.env.PUBLIC_URL + '/'}>Log In</Link>
                )
            }
        </header>
    );
}

export default Header;
