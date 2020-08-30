//will return list of all free response answers for MVP eventually pull out keywords and chart those in a pie chart 
import React from 'react';

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