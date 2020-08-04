import React from "react";

function CreateSurvey() {
    return (
        <main className="mx-auto my-4 p-8 w-5/6 bg-gray-300">
            <form>
                <label className="text-2xl">Survey Name: 
                    <input className="ml-2 w-64" type="text" name="surveyName" />
                </label>
            </form>
        </main>
    )
}

export default CreateSurvey;