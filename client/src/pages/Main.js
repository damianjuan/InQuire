import React from "react";
import { Link, useLocation } from "react-router-dom";
import API from "../utils/API";

function Main() {

    function logInHandler(event) {
        event.preventDefault();
        API.logIn({
            email: event.target.email.value,
            password: event.target.password.value
        })
            .then(() => {
                window.location.replace("/create-survey");
            })
    }

    return (
        <main className="bg-gray-300 m-8">
            <h1 className="pt-8 text-2xl text-center">Welcome</h1>
            <form onSubmit={logInHandler}>
                <input className="my-2 w-3/6" type="text" name="email" placeholder="Email" />
                <br></br>
                <input className="my-2 w-3/6" type="password" name="password" placeholder="Password" />
                <br></br>
                <button type="submit">Log In</button>
            </form>
            <div className="flex flex-col mx-auto p-4 w-full text-lg">
                <Link className="flex-1" to={process.env.PUBLIC_URL + '/create-survey'}>Login as Guest</Link><br />
                <Link className="flex-1" to={process.env.PUBLIC_URL + '/signup'}>Sign Up</Link>
            </div>
        </main>
    );
}


export default Main;