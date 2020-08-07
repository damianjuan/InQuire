import React from "react";

function CreateMultipleChoice() {
    return(
        <div className="p-2 mx-4">
            <label className="text-xl">
                Input Prompt: 
                <input className="ml-4 w-64" type="text" name="prompt" />
            </label>
        </div>
    );
}

export default CreateMultipleChoice;