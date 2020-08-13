import React from "react";

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

export default function HomePage() {



    return (
        <main className="mx-auto my-4 p-4 w-5/6 bg-gray-300 rounded-lg">
            <header className="bg-green-300 text-center text-4xl p-4 rounded-lg" >
                Welcome {userName}
            </header>
            <button className="m-2 p-2 bg-yellow-500 rounded-full w-40 self-end" type="submit">Create New Survey</button>
            <section>
                <ul>
                    {userSurveys.map(({ title, id }) => (
                        <li className="text-center">
                            <p className=" text-4xl p-4 rounded-lg">{title}</p>
                            <button onclick="link to take survey" id="takeBtn" className="text-center m-2 p-2 bg-yellow-500 rounded-full w-40 self-end"
                            >Take</button>
                            <button onclick="link to view results here" id="result-Btn" className="text-center  m-2 p-2 bg-yellow-500 rounded-full w-40 self-end"
                            >Results</button>
                            <button id="delete-Btn" data-surveyID={id} className="text-center m-2 p-2 bg-yellow-500 rounded-full w-40 self-end">Delete</button>
                        </li>
                    ))}
                </ul>
            </section>

        </main>
    )
}

