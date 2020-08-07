import React from "react";
import { useQuestionContext } from "../utils/CreateQuestionState";
import CreateMultipleChoice from "../components/CreateMultipleChoice";

function CreateQuestion({ handleTypeChange }) {
    const [state, dispatch] = useQuestionContext();

    function testDiv(a) {
        switch (a) {
            case "multipleChoice":
                return (
                    <CreateMultipleChoice />
                );
            case "selectApply":
                return (
                    <div>thing2</div>
                );
            case "freeResponse":
                return (
                    <div>thing3</div>
                );
            default:
                return (
                    <div>Invalid</div>
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