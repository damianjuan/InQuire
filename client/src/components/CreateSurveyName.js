import React from "react";
import { useQuestionContext } from "../utils/CreateQuestionState";

function CreateSurveyName() {
    const [state, dispatch] = useQuestionContext();

    return (
        <form>
            <label className="text-xl m-2 block">
                Survey Name:
                    <input className="my-2 w-full" type="text" name="surveyName" onChange={(e) => dispatch({ call: "changeSurveyTitle", survey_title: e.target.value })} />
            </label>
        </form>
    );
}

export default CreateSurveyName;