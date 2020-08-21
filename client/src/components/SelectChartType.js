import React from 'react';
import BarGraph from './BarGraph';
// import PieGraph from './PieChart';
import FreeResponse from './FreeResponse';
// import PieChart from './PieChart';

// checks the question type of each survey question and returns the appropriate chart component
//free response MVP-list results, icebox-pull keywords and then send to pie chart
//multiple choice pie chart
//select all bar graph



export default function SelectChartType({ question }) {
    switch (question.question_type) {
        case 'multipleChoice':
            return (
                <article className="mx-auto my-4 p-4 w-5/6 bg-gray-300 rounded-lg">
                    <h3 className="font-semibold">{question.question_title}</h3>
                    <BarGraph answers={question.Answers} />
                </article>
            )

        case 'selectApply':
            return (
                <article className="mx-auto my-4 p-4 w-5/6 bg-gray-300 rounded-lg">
                    <h3 className="font-semibold">{question.question_title}</h3>
                    <BarGraph answers={question.Answers} />
                </article>
            )

        case 'freeResponse':
            return (
                <article className="mx-auto my-4 p-4 w-5/6 bg-gray-300 rounded-lg">
                    <h3 className="font-semibold">{question.question_title}</h3>
                    <FreeResponse answers={question.Answers[0]} />
                </article>
            )

        default:
            return (
                <h3>Invalid Question Type</h3>
            )
    }
};