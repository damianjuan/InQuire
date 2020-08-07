import React, { useState } from "react";
import CreateQuestion from "../components/CreateQuestion";
import { QuestionProvider } from "../utils/CreateQuestionState";

function CreateSurvey() {
    const [questionState, setQuestionState] = useState({
        question: "",
        type: "multipleChoice",
        contents: []
    });

    function handleChange(e) {
        const questionType = e.target.value;
        console.log("questionType - ", questionType);
        
        questionState.type = questionType;
        console.log("state - ", questionState);

        setQuestionState({
            ...questionState
        });
    }

    return (
        <main className="mx-auto my-4 p-4 w-5/6 bg-gray-300">
            <form>
                <label className="text-xl m-2 block">
                    Survey Name: 
                    <input className="my-2 w-full" type="text" name="surveyName" />
                </label>
            </form>
            <QuestionProvider value={questionState}>
                <CreateQuestion handleChange={handleChange}/>
            </QuestionProvider>
        </main>
    )
}

export default CreateSurvey;