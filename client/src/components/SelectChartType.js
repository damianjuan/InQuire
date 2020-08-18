import React from 'react';
import BarGraph from './BarGraph';
import PieGraph from './PieChart';
import FreeResponse from './FreeResponse';
import PieChart from './PieChart';

// checks the question type of each survey question and returns the appropriate chart component
//free response MVP-list results, icebox-pull keywords and then send to pie chart
//multiple choice pie chart
//select all bar graph



export default function SelectChartType({ type }) {
    switch (type) {
        case 'multipleChoice':
            return (
                <BarGraph />
            )

        case 'selectAll':
            return (
                <BarGraph />
            )

        case 'free response':
            return (
                <FreeResponse />
            )

        default:
            return (
                <h1>Invalid Question Type</h1>
            )
    }
};