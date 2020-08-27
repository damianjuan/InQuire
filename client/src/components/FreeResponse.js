//will return list of all free response answers for MVP eventually pull out keywords and chart those in a pie chart 
import React from 'react';

const TEST_DATA = [
    {
        id: 3,
        question: 'What feedback do you have for my survey?',
        type: 'free response',
        answers: ['free response'],
        count: ['Great survey', 'Loved it!', 'Hope you finish in time...', 'Hurry Up!']
    }
];

export default function FreeResponse({ answers }) {
    return (
        <div>
            {
                answers.FreeResponses.map((res, i) => (
                    <h4 className="font-light" key={i}>{res.response}</h4>
                ))
            }
        </div>
    )
};