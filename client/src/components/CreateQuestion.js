import React from "react";
import { useQuestionContext } from "../utils/CreateQuestionState";
import CreateMultiple from "../components/CreateMultiple";

function CreateQuestion({ handleTypeChange }) {
    const [state, dispatch] = useQuestionContext();

    function testDiv(type) {
        switch (type) {
            case "multipleChoice":
            case "selectApply":
                return (
                    <CreateMultiple />
                );
            case "freeResponse":
                return (
                    <div className="text-xl">Free response will allow users to submit their own responses.</div>
                );
            default:
                return (
                    <div>Invalid Question Type</div>
                )
        }
    } 

    return(
        <form className="flex flex-col p-2 mx-4">
            <div className="flex flex-col flex-1">
                <label className="flex-1 text-xl mx-auto">
                    Input Prompt:
                    <input className="my-2 w-full" type="text" name="prompt" />
                </label>
                <label className="flex-1 text-xl mx-auto">
                    Select Question Type: 
                    <select className="my-2" name="questionType" onChange={handleTypeChange}>
                        <option value="multipleChoice">Multiple Choice</option>
                        <option value="selectApply">Select All That Apply</option>
                        <option value="freeResponse">Free Response</option>
                    </select>
                </label>
            </div>
            {testDiv(state.type)}
        </form>
    );
}

export default CreateQuestion;