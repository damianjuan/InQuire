import React from "react";
import { useQuestionContext } from "../utils/CreateQuestionState";

function CreateSurveyName() {
    const [_, dispatch] = useQuestionContext();

    return (
        <form>
            <label className="text-3xl text-lightgrey mb-4 block">
                Survey Name:
                    <input className="my-4 w-full p-1 text-xl text-black" type="text" name="surveyName" onChange={(e) => dispatch({ call: "changeSurveyTitle", survey_title: e.target.value })} />
            </label>
        </form>
    );
}

export default CreateSurveyName;