import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import API from '../utils/API';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// ToDo
// make button for user to copy survey to clipboard use whatever the current host is 

export default function HomePage(props) {
    console.log(props.userEmail);
    const [userSurveys, setUserSurveys] = useState([]);
    const [userEmail, setUserEmail] = useState();
    // const [linkStart, setLinkStart] = useState();

    useEffect(() => {
        //grabs surveys with uuid linked to user
        // setLinkStart(process.env.PUBLIC_URL);
        axios.get('api/get-user-surveys/').then(res => {
            console.log(res);
            if (res.data.length > 0) {
                setUserSurveys(res.data);
                console.log("saved survey info to state");

            } else {
                console.log("no surveys")
            }
        })
        //grabs user email
        axios.get('api/checkAuthentication').then(res => {
            setUserEmail(res.data.user.email)
        })
    }, []);

    function handleDelete(uuid, event) {
        event.preventDefault();
        API.deleteSurvey(uuid);
    }



    console.log(userSurveys);

    return (
        <main className="flex flex-col bg-dark sm:w-2/3 lg:w-1/2 sm:rounded mx-auto my-8 p-8">
            <header className="text-center text-lightgrey text-3xl mb-4 rounded-lg">
                Welcome {userEmail}
            </header>
            <Link className="self-end my-4 p-2 bg-light rounded-full w-40" to={process.env.PUBLIC_URL + '/create-survey'} >Create New Survey</Link>
            <ul>
                {userSurveys.map(({ survey_name, uuid }) => (
                    <li className="">
                        <h3 className="text-lightgrey text-3xl my-4 mx-2 rounded-lg">{survey_name}</h3>
                        <div className="flex flex-row items-center my-4">
                            <CopyToClipboard className="text-center mx-2 p-2 bg-light rounded-full w-40" text={`https://inquery-53565.herokuapp.com/take-survey/${uuid}`}>
                                <button>Copy Survey Link</button>
                            </CopyToClipboard>
                            {/* <button onClick="link to take survey" id="takeBtn" className="text-center m-2 p-2 bg-light rounded-full w-40 self-end"
                            >Take</button> */}
                            <Link className="mx-auto mx-2 p-2 bg-light rounded-full w-40 text-center" to={process.env.PUBLIC_URL + `/results/${uuid}`}>Results</Link>
                            {/* <button onClick="link to view results here" id="result-Btn" className="text-center  m-2 p-2 bg-light rounded-full w-40 self-end"
                            >Results</button> */}
                            <button id="delete-Btn" surveyId={uuid} className="text-center mx-2 p-2 bg-light rounded-full w-40" onClick={(event) => { handleDelete(uuid, event) }}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

        </main>
    )
}

