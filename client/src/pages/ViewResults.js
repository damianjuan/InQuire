import React from 'react';
import SelectChartType from '../components/SelectChartType';

// page to view survey results
// page will take in an id from the url "localhost3000/results/:id"
// make api call to get results data from database
// results displayed per question
// type of chart displayed for question will depend on question type
// chart should be displayed in a card so that they can scale for screen size
//file for selecting chart type based off of question type
//file for each chart they


//test data to verify components function as they should. will need to make api call to db to get real data
const testData = [
    {
        id: 1,
        question: 'Whats your favorite letter?',
        type: 'multipleChoice',
        answers: ['A', 'B', 'C', 'D'],
        count: [12, 43, 3, 27]
    },
    {
        id: 2,
        question: 'Select all the toppings you want on your pizza',
        type: 'selectAll',
        answers: ['Jalapenos', 'Pineapple', 'Ham', 'Olives'],
        count: [7, 16, 18, 43, 1]
    },
    {
        id: 3,
        question: 'What feedback do you have for my survey?',
        type: 'free response',
        answers: ['free response'],
        count: ['Great survey', 'Loved it!', 'Hope you finish in time...', 'Hurry Up!']
    }
    // ,
    // {
    //     id: 4,
    //     question: 'Test Invalid question type',
    //     type: 'none',
    //     answers: [],
    //     count: []
    // }
];

export default function ViewResults() {



    return (
        <main className="mx-auto my-4 p-4 w-5/6 bg-gray-300 rounded-lg">
            {
                testData.map(res => (
                    <SelectChartType type={res.type} id={res.id} />
                ))
            }
        </main>
    )
};