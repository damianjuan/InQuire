// use bar graph for select all that apply questions.
//should use for all question types except for free response
import React from 'react';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory';

export default function BarGraph({ answers }) {

    return (
        <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
            <VictoryBar
                data={answers}
                x="answer"
                y="count"

            />
        </VictoryChart>
    )
};