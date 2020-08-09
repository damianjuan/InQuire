import React from "react";
import { Link, useLocation } from "react-router-dom";

function Main() {
    return (
        <main>
            <p className="mx-auto my-4 p-8 w-5/6 bg-gray-300 text-xl">Welcome
            
                <p className="mx-auto my-4 p-8 w-5/6 bg-gray-300 text-xl">
                    <div>
                        <input className="my-2 w-3/6" type="text" name="prompt" placeholder="Email" />
                    </div>
                    <div>
                        <input className="my-2 w-3/6" type="text" name="prompt" placeholder="Password" />
                    </div>
                    <div>
                    <Link to={process.env.PUBLIC_URL + '/create-survey'}>  Login </Link><br/>
                    <Link to={process.env.PUBLIC_URL + '/create-survey'}>Login as Guest</Link><br/>
                    <Link to={process.env.PUBLIC_URL + '/signup'}>Sign Up</Link>
                    </div>
                </p>
            </p>
        </main>
    );
}

export default Main;