import React from "react";
import { useQuestionContext } from "../utils/CreateQuestionState";
import API from "../utils/API";
import { v4 as uuidv4 } from 'uuid';

function SubmitSurvey() {
    const [state, dispatch] = useQuestionContext();
            console.log("state ---- ", state);
    const uuid = uuidv4();

    function submitClick(e) {
        e.preventDefault();

        if (state.length > 1) {
            let answers = [];
            const questions = state.map((questionItem) => {
                questionItem.SurveySurveyUuid = uuid;
                delete questionItem.id;
                questionItem.contents.map((answer) => {
                    answers.push({answer})
                })
                delete questionItem.contents;
                return questionItem;
            });
            console.log("answers ---- ", answers);

            questions.shift();
            API.publish({
                survey_name: "test",
                survey_uuid: uuid
            },
                questions
            );
        } else {
            console.error("Add at least one question!");
        }
    }

    return (
        <div className="flex">
            <button className="mx-auto p-2 bg-yellow-500 rounded-full w-40" onClick={submitClick} type="button">Publish Survey</button>
        </div>
    );
}

export default SubmitSurvey;