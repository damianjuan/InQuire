import React from "react";

function CreateMultiple({ handleFieldChange }) {
    return(
        <div className="flex flex-col text-xl flex-1">
            Answer Choices:
            <label className="">
                1.
                <input className="ml-4 my-2 w-auto" type="text" name="0" onChange={handleFieldChange} />
            </label>
            <label className="">
                2.
                <input className="ml-4 my-2 w-auto" type="text" name="1" onChange={handleFieldChange} />
            </label>
            <label className="">
                3.
                <input className="ml-4 my-2 w-auto" type="text" name="2" onChange={handleFieldChange} />
            </label>
            <label className="">
                4.
                <input className="ml-4 my-2 w-auto" type="text" name="3" onChange={handleFieldChange} />
            </label>
        </div>
    );
}

export default CreateMultiple;