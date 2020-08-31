import React from "react";

function DisplayMultipleChoice({ id, contents }) {
    return (
        <div className="flex flex-col">
            {contents.map((item, i) => {
                if (item) {
                    return (
                        <label key={i}>
                            <input className="m-4" name={id} type="radio" />
                            {item}
                        </label>
                    );
                } else {
                    return(<></>);
                }
            })}
        </div>
    );
}

export default DisplayMultipleChoice;