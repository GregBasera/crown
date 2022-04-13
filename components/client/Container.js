import React, { useState, useEffect } from "react";
import { getCris } from "./APIcalls";
import Scoresheet from "./Scoresheet";

export default function Container() {
  const [cris, setCris] = useState([]);
  const [activeCri, setActiveCri] = useState(null);
  useEffect(() => {
    getCris(setCris);
  }, []);

  if (cris.length === 0) return null;
  return (
    <div className="lg:mx-36">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-1 mb-3">
        {cris.map((q, i) => {
          return (
            <button
              key={q.id}
              className={`${activeCri === i ? "active-btn-purple" : "btn-border-purple"} font-extrabold tracking-wide`}
              onClick={() => setActiveCri(i)}>
              {q.attributes.name}
            </button>
          );
        })}
      </div>

      <div className="font-bold text-xl">{`My ${
        activeCri !== null ? cris[activeCri].attributes.name : ""
      } Scoresheet`}</div>
      <div className="italic text-gray-600 text-sm mb-2">Contestant No. | Score | Rank</div>

      {activeCri !== null ? (
        <Scoresheet cris={cris[activeCri].id} />
      ) : (
        <div className="italic text-red-500 tracking-widest">--- Select a Segment ---</div>
      )}
    </div>
  );
}
