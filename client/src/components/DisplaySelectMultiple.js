import React from "react";

function DisplaySelectMultiple({ id, contents }) {
    return (
        <div className="flex flex-col">
            {contents.map((item, i) => {
                if (item) {
                    return (
                        <label key={i}>
                            <input className="m-4" name={id} type="checkbox" />
                            {item}
                        </label>
                    );
                }
            })}
        </div>
    );
}

export default DisplaySelectMultiple;