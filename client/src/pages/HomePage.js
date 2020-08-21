import React from "react";
import { Link } from 'react-router-dom';
//need to get username from session just test data for now
const userName = "exampleuser@test.com";
// need to get list of survey titles and id from database just test data for now
const userSurveys = [
    {
        id: 1,
        title: "first Test survey"
    },
    {
        id: 2,
        title: "second Test survey"
    }];


export default function HomePage(req) {
    console.log(req);


    return (
        <main className="flex flex-col mx-auto my-4 p-4 w-5/6 bg-gray-300 rounded-lg">
            <header className="bg-green-300 text-center text-4xl p-4 rounded-lg" >
                Welcome {userName}
            </header>
            <Link className="m-2 p-2 bg-yellow-500 rounded-full w-40 self-end" to={process.env.PUBLIC_URL + '/create-survey'} >Create New Survey</Link>
            <section>
                <ul>
                    {userSurveys.map(({ title, id }) => (
                        <li className="text-center">
                            <p className=" text-4xl p-4 rounded-lg">{title}</p>
                            <button onClick="link to take survey" id="takeBtn" className="text-center m-2 p-2 bg-yellow-500 rounded-full w-40 self-end"
                            >Take</button>
                            <button onClick="link to view results here" id="result-Btn" className="text-center  m-2 p-2 bg-yellow-500 rounded-full w-40 self-end"
                            >Results</button>
                            <button id="delete-Btn" data-surveyid={id} className="text-center m-2 p-2 bg-yellow-500 rounded-full w-40 self-end">Delete</button>
                        </li>
                    ))}
                </ul>
            </section>

        </main>
    )
}

