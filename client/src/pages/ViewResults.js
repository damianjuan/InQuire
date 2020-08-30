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

export default function ViewResults() {
    const [data, setData] = useState();
    const { id } = useParams();

    useEffect(() => {
        API.getAnswerCounts(id)
            .then(res => {
                setData(res);
            })
            .catch(err => console.log(err));
    });
    
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