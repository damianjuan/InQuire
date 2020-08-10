import React from "react";

function DisplayMultiple({ id, contents }) {
    return (
        <div className="flex flex-col">
            {contents.map((item, i) => (
                <label key={i}>
                    <input className="m-4" name={id} type="radio" />
                    {item}
                </label>
            ))}
        </div>
    );
}

export default DisplayMultiple;