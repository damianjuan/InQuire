import React from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import API from '../utils/API';

function YourSurveys({ currentUser, userSurveys }) {

    function handleDelete(uuid, event) {
        event.preventDefault();
        API.deleteSurvey(uuid);
    }

    if (currentUser.rank === "user") {
        return (
            <ul>
                {userSurveys.map(({ survey_name, uuid }, i) => (
                    <li className="" key={i}>
                        <h3 className="text-lightgrey text-3xl my-4 mx-2 rounded-lg">{survey_name}</h3>
                        <div className="flex flex-row items-center my-4">
                            <CopyToClipboard className="text-center mx-2 p-2 bg-light rounded-full w-40" text={`https://inquire-6846.herokuapp.com/take-survey/${uuid}`}>
                                <button>Copy Survey Link</button>
                            </CopyToClipboard>
                            
                            {/* <button onClick="link to take survey" id="takeBtn" className="text-center m-2 p-2 bg-light rounded-full w-40 self-end"
                            >Take</button> */}
                            <Link className="mx-auto mx-2 p-2 bg-light rounded-full w-40 text-center" to={process.env.PUBLIC_URL + `/results/${uuid}`}>Results</Link>

                            <button id="delete-Btn" className="text-center mx-2 p-2 bg-light rounded-full w-40" onClick={(event) => { handleDelete(uuid, event) }}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        );
    } else {
        return (
            <div className="text-lightgrey text-2xl mx-2">
                Please log in to a user account to see your surveys.
            </div>
        )
    }
}

export default YourSurveys;