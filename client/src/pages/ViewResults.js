import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SelectChartType from '../components/SelectChartType';
import API from '../utils/API';

// page to view survey results
// page will take in an id from the url "localhost3000/results/:id"
// make api call to get results data from database
// results displayed per question
// type of chart displayed for question will depend on question type
// chart should be displayed in a card so that they can scale for screen size
//file for selecting chart type based off of question type
//file for each chart they


//test data to verify components function as they should. will need to make api call to db to get real data
// const testData = [
//     {
//         id: 1,
//         question: 'Whats your favorite letter?',
//         type: 'multipleChoice',
//         answers: ['A', 'B', 'C', 'D'],
//         count: [12, 43, 3, 27]
//     },
//     {
//         id: 2,
//         question: 'Select all the toppings you want on your pizza',
//         type: 'selectAll',
//         answers: ['Jalapenos', 'Pineapple', 'Ham', 'Olives'],
//         count: [7, 16, 18, 43, 1]
//     },
//     {
//         id: 3,
//         question: 'What feedback do you have for my survey?',
//         type: 'free response',
//         answers: ['free response'],
//         count: ['Great survey', 'Loved it!', 'Hope you finish in time...', 'Hurry Up!']
//     }
//     ,
//     {
//         id: 4,
//         question: 'Test Invalid question type',
//         type: 'none',
//         answers: [],
//         count: []
//     }
// ];

export default function ViewResults() {
    const [data, setData] = useState();
    const { id } = useParams();

    useEffect(() => {
        API.getAnswerCounts(id)
            .then(res => {
                setData(res);
            })
            .catch(err => console.log(err));
    }, []);
    
    if (data) {
        return (
            <main className="mx-auto my-4 p-4 w-5/6 ">
                <h2 className="text-3xl">{data.survey_name}</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                    {
                        data.Questions.map((question) => (
                            <SelectChartType question={question} key={question.id} />
                        ))
                    }
                </div>
            </main>
        )
    } else {
        return (
            <main>Loading...</main>
        )
    }   
};