
import React from "react";
import '../tailwind.output.css';

function NoMatch() {
    return (
        //test code to verify tailwind css was set up properly 
        <div className="max-w-md mx-auto flex p-6 bg-gray-100 mt-10 rounded-lg shadow-xl">
            <div className="ml-6 pt-1">
                <h1 className="text-2xl text-blue-500 leading-tight">
                    404
      </h1>
                <p className="text-base text-gray-700 leading-normal">
                    Nothing Found!
      </p>
            </div>
        </div>
    );
}

export default NoMatch;




