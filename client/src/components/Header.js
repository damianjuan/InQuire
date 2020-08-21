import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Header({ isAuthenticated }) {
    const CheckIsAuthenticated = isAuthenticated;
    console.log(CheckIsAuthenticated);

    function handleLogout(event) {
        event.preventDefault();
        axios.get('api/logout').
            then(
                window.location.replace("/")
            );
    }



    return (

        <header className=" bg-green-300 ">
            <a className=" mx-auto text-center text-4xl p-4 ">InQuery</a>
            {/* <button className="mx-auto my-2 p-2 bg-yellow-500 rounded-full w-40" href="/logout" onClick={handleLogout}>Log out</button> */}

            {
                CheckIsAuthenticated === true ? (<Link className="mx-auto my-2 p-2 bg-yellow-500 rounded-full w-40" to={process.env.PUBLIC_URL + '/'} onClick={handleLogout}>Log out</Link>) : (
                    <Link className="mx-auto my-2 p-2 bg-yellow-500 rounded-full w-40 " to={process.env.PUBLIC_URL + '/'}>Log In</Link>
                )
            }

        </header>
    );
}

export default Header;