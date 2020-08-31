import React from "react";
import { useQuestionContext } from "../utils/CreateQuestionState";

function CreateSurveyName() {
    const [_, dispatch] = useQuestionContext();

    return (
        <form className="flex flex-col">
            <select className="my-4 flex-1 p-1 text-xl text-black self-end" name="publicity" onChange={
                (e) => dispatch({ call: "changePublicity", publicity: e.target.value })}>
                <option value="private">Private</option>
                <option value="public">Public</option>
            </select>

            <label className="text-3xl flex-1 text-lightgrey mb-4 block">
                Survey Name:
                    <input className="my-4 w-full p-1 text-xl text-black" type="text" name="surveyName" onChange={(e) => dispatch({ call: "changeSurveyTitle", survey_title: e.target.value })} />
            </label>
        </form>
    );
}

export default CreateSurveyName;