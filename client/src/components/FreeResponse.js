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

export default function FreeResponse() {

    return (
        <div className="mx-auto my-4 p-4 w-5/6 bg-gray-300 rounded-lg">
            <h1 className="font-semibold">FreeResponse</h1>
            {
                TEST_DATA.map(res => (res.count.map(val => (
                    <h4 className="font-light">{val}</h4>
                )))

                )
            }
        </div>
    )
};