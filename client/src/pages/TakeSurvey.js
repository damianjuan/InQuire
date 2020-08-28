import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../utils/API";

function TakeSurvey() {
    const [question, setQuestion] = useState();
    const [radioAnswer, setRadioAnswer] = useState([]);
    const [freeResAnswer, setFreeResAnswer] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        API.getSurveyById(id)
            .then(res => setQuestion(res))
            .catch(err => console.err(err));
    }, []);

    function submitBtn() {
        const answerArr = radioAnswer.concat(freeResAnswer);
        API.submitResults(answerArr)
            .then(() => {
                window.location.replace("/thankyou");
            })
    }

    function handleOnChange(e) {
        const userAnswer =
            [...document.querySelectorAll('input')]
                .filter(x => x.checked)
                .map(x => parseInt(x.value));
        setRadioAnswer(userAnswer);
    }

    function handleFreeResChange(e) {
        const userAnswer = 
            [...document.querySelectorAll('input[type="text"]')]
                .filter(x => x.value)
                .map(y => {
                    return { AnswerId: y.id, response: y.value };
                });
        setFreeResAnswer(userAnswer);
    }

    function renderQuestions() {
        if (!question) {
            return (
                <>
                </>
            );
        } else {
            return (
                <main className="flex flex-col items-center text-2xl w-5/6 sm:w-2/3 md:w-1/2 mx-auto">
                    <h2 className="w-full my-4 p-4 bg-grey rounded-lg text-3xl text-center">
                        Survey Title : {question.survey_name}
                    </h2>
                    {question.Questions.map((item, index) => {
                        if (item.question_type === "multipleChoice") {
                            return (
                                <article className="w-full mx-auto my-4 p-4 bg-grey rounded-lg hover:shadow-md" key={index}>
                                    {index + 1}) {item.question_title}
                                    <ul>
                                        {item.Answers.map((choice, index) => {
                                            return (
                                                <li onChange={handleOnChange} key={index}>
                                                    <label>
                                                        <input className="m-4" name={item.id} value={choice.id} type="radio" />
                                                        {choice.answer}
                                                    </label>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </article>
                            )
                        } else if (item.question_type === "selectApply") {
                            return (
                                <article className="w-full my-4 p-4 bg-grey rounded-lg hover:shadow-md" key={index}>
                                    {index + 1}) {item.question_title}
                                    <ul>
                                        {item.Answers.map((choice, index) => {
                                            return (

                                                <li onChange={handleOnChange} key={index}>
                                                    <label>
                                                        <input className="m-4" name={item.id} value={choice.id} type="checkbox" />
                                                        {choice.answer}
                                                    </label>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </article>
                            )
                        } else {
                            return (
                                <article className="w-full my-4 p-4 bg-grey rounded-lg hover:shadow-md" onChange={handleFreeResChange} key={index}>
                                    {index + 1}) {item.question_title}
                                    <form>
                                        <input className="m-4 p-1 text-xl" type="text" id={item.Answers[0].id} name={item.id} />
                                    </form>
                                </article>
                            )
                        }
                    })
                    }
                    <div className="flex">
                        <button className="p-2 bg-light rounded-full text-xl w-40" type="submit" onClick={submitBtn}>Submit Survey</button>
                    </div>
                </main>
            )
        }
    }
    return (
        renderQuestions()
    )
}

export default TakeSurvey;