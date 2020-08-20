import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../utils/API";

function TakeSurvey() {
    const [question, setQuestion] = useState();
    const [answer, setanswer] = useState([]);
    const { id } = useParams();
    // console.log(id);

    useEffect(() => {
        API.getSurveyById(id)
            .then(res => setQuestion(res))
            .catch(err => console.log(err));
    }, []);

    function submitBtn(event) {
        event.preventDefault();
        console.log(event.target.RadioGroup);
    }

    function renderQuestions() {
        if (!question) {
            return (
                <>
                </>
            );
        } else {
            console.log(question);
            return (
                <div>
                    <main className="mx-auto my-4 p-4 w-5/6 bg-gray-300 rounded-lg text-center">
                        Survey Title : {question.survey_name}
                    </main>
                    {question.Questions.map((item, index) => {
                        if (item.question_type == "multipleChoice") {
                            return (
                                <main className="mx-auto my-4 p-4 w-5/6 bg-gray-300 rounded-lg">
                                    {index + 1}) {item.question_title}<hr />
                                    {item.Answers.map((choice, index) => {
                                        return (

                                            <ul>
                                                <label key={index}>
                                                    <input className="m-4" name="RadioGroup" value={choice.id} type="radio" />
                                                    {choice.answer}
                                                </label>
                                            </ul>

                                        )
                                    })}
                                </main>
                            )
                        } else if (item.question_type == "selectApply") {
                            return (
                                <main className="mx-auto my-4 p-4 w-5/6 bg-gray-300 rounded-lg">
                                    {index + 1}) {item.question_title}<hr />
                                    {item.Answers.map((choice, index) => {
                                        return (

                                            <ul>
                                                <label key={index}>
                                                    <input className="m-4" name="CheckGroup" value={choice.id} type="checkbox" />
                                                    {choice.answer}
                                                </label>
                                            </ul>

                                        )
                                    })}
                                </main>
                            )
                        } else {
                            return (
                                <main className="mx-auto my-4 p-4 w-5/6 bg-gray-300 rounded-lg">
                                    {index + 1}) {item.question_title}<hr />
                                    <form>
                                        <input className="m-8" type="text" name="response" />
                                    </form>
                                </main>
                            )
                        }
                    })
                    }
                    <div className="flex">
                        <button className="mx-auto p-2 bg-yellow-500 rounded-full w-40" type="submit" onClick={submitBtn}>Submit Survey</button>
                    </div>
                </div >
            )
        }
    }
    return (
        renderQuestions()
    )
}

export default TakeSurvey;