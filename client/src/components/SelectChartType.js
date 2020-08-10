import React from 'react';

// checks the question type of each survey question and returns the appropriate chart component
//free response MVP-list results, icebox-pull keywords and then send to pie chart
//multiple choice pie chart
//select all bar graph



export default function SelectChartType({ type, id }) {
    switch (type) {
        case 'multipleChoice':
            return (
                <h1>multiple Choice Question id {id}</h1>
            )

        case 'selectAll':
            return (
                <h1>Select All Question id {id}</h1>
            )

        case 'free response':
            return (
                <h1>Free Response id {id}</h1>
            )

        default:
            return (
                <h1>Invalid Question Type id {id}</h1>
            )
    }
};