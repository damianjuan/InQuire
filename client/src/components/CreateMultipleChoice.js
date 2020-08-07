import React from "react";

function CreateMultipleChoice() {
    return(
        <div className="flex flex-col text-xl flex-1">
            Answer Choices:
            <label className="">
                1.
                <input className="ml-4 my-2 w-auto" type="text" name="choice1" />
            </label>
            <label className="">
                2.
                <input className="ml-4 my-2 w-auto" type="text" name="choice2" />
            </label>
            <label className="">
                3.
                <input className="ml-4 my-2 w-auto" type="text" name="choice3" />
            </label>
            <label className="">
                4.
                <input className="ml-4 my-2 w-auto" type="text" name="choice4" />
            </label>
        </div>
    );
}

export default CreateMultipleChoice;