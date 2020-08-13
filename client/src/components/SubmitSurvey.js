import React from "react";
import { useQuestionContext } from "../utils/CreateQuestionState";
import API from "../utils/API";
import { v4 as uuidv4 } from 'uuid';

function SubmitSurvey() {
    const [state, dispatch] = useQuestionContext();
    const uuid = uuidv4();

    function submitClick(e) {
        e.preventDefault();
        state.shift();

        if (state.length > 0) {
            let answers = [];
            const questions = state.map((questionItem, i) => {
                questionItem.SurveyUuid = uuid;
                questionItem.contents.map((answer) => {
                    if (answer) {
                        const item = {answer};
                        item.QuestionId = i;
                        answers.push(item);
                    }
                });
                delete questionItem.id;
                delete questionItem.contents;
                return questionItem;
            });

            API.publish({
                survey_name: "test",
                uuid: uuid
            },
                questions,
                answers
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