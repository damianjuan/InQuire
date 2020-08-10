import React from "react";
import { Link, useLocation } from "react-router-dom";

function Main() {
    return (
        <main className="bg-gray-300 m-8">
            <h1 className="pt-8 text-2xl text-center">Welcome</h1>
            <div className="flex flex-col mx-auto p-4 w-full text-xl items-start">
                <input className="my-2 w-3/6" type="text" name="prompt" placeholder="Email" />
                <input className="my-2 w-3/6" type="text" name="prompt" placeholder="Password" />
            </div>
            <div className="flex flex-col mx-auto p-4 w-full text-lg">
                <Link className="flex-1" to={process.env.PUBLIC_URL + '/create-survey'}>  Login </Link><br />
                <Link className="flex-1" to={process.env.PUBLIC_URL + '/create-survey'}>Login as Guest</Link><br />
                <Link className="flex-1" to={process.env.PUBLIC_URL + '/signup'}>Sign Up</Link>
            </div>
        </main>
    );
}

export default Main;