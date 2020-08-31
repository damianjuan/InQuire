import React from "react";
import { useQuestionContext } from "../utils/CreateQuestionState";

function CreateMultiple() {
    const [_, dispatch] = useQuestionContext();

    function handleFieldChange(e) {
        dispatch({
            call: "changeAnswer",
            slot: parseInt(e.target.id),
            answer: e.target.value
        });
    }

    return(
        <div className="flex flex-col text-2xl flex-1 text-lightgrey">
            Answer Choices:
            <label className="my-4">
                1.
                <input className="ml-4 w-11/12 text-black text-xl p-1" type="text" id="0" onChange={handleFieldChange} />
            </label>
            <label className="my-4">
                2.
                <input className="ml-4 w-11/12 text-black text-xl p-1" type="text" id="1" onChange={handleFieldChange} />
            </label>
            <label className="my-4">
                3.
                <input className="ml-4 w-11/12 text-black text-xl p-1" type="text" id="2" onChange={handleFieldChange} />
            </label>
            <label className="my-4">
                4.
                <input className="ml-4 w-11/12 text-black text-xl p-1" type="text" id="3" onChange={handleFieldChange} />
            </label>
        </div>
    );
}

export default CreateMultiple;