// use bar graph for select all that apply questions.
//should use for all question types except for free response
import React from 'react';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory';

const TEST_DATA = [
    { option: 'Jalapenos', count: 7 },
    { option: 'Pineapple', count: 16 },
    { option: 'Ham', count: 18 },
    { option: 'Olives', count: 43 }
];

export default function BarGraph() {

    return (
        <>
            <h1>BarGraph Example</h1>
            <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
                <VictoryBar
                    data={TEST_DATA}
                    x="option"
                    y="count"

                />
            </VictoryChart>
        </>
    )
};