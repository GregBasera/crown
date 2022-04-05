import React, { useState } from "react";

export default function Container() {
  const [rawScores, setRawScores] = useState([]);

  return (
    <div className="lg:mx-36">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-1 mb-5">
        <button className="btn-border-purple">09</button>
        <button className="btn-border-purple">09</button>
        <button className="btn-border-purple">09</button>
        <button className="btn-border-purple">09</button>
        <button className="btn-border-purple">09</button>
      </div>

      <div className="flex mb-1">
        <div className="flex-none border-2 px-2 py-1 text-center border-gray-400 rounded-l-md">99</div>
        <div className="flex-auto border-2 text-center border-gray-400 border-x-0">
          <ScoreInput />
        </div>
        <div className="flex-none border-2 px-2 py-1 text-center border-gray-400 rounded-r-md">99</div>
      </div>
    </div>
  );
}

function ScoreInput() {
  return <input className="bg-inherit h-full w-full text-center" type="number" min={1} max={10} />;
}
