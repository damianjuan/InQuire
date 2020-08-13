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
                window.location.replace("/home");
            })
    }

    return (
        <main className="bg-gray-300 m-8">
            <h1 className="pt-8 text-2xl text-center">Welcome</h1>
            <form className="flex flex-col items-center" onSubmit={logInHandler}>
                <input className="my-2 w-3/6" type="text" name="email" placeholder="Email" />
                <br></br>
                <input className="my-2 w-3/6" type="password" name="password" placeholder="Password" />
                <br></br>
                <button className="mx-auto my-2 p-2 bg-yellow-500 rounded-full w-40" type="submit">Log In</button>
            </form>
            <div className="flex flex-col mx-auto p-4 w-full text-lg">
                <Link className="mx-auto p-2 bg-yellow-500 rounded-full w-40 text-center" to={process.env.PUBLIC_URL + '/create-survey'}>Login as Guest</Link><br />
                <Link className="mx-auto p-2 bg-yellow-500 rounded-full w-40 text-center" to={process.env.PUBLIC_URL + '/signup'}>Sign Up</Link>
            </div>
        </main>
    );
}


export default Main;