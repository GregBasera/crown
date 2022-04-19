import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getCris } from "./APIcalls";
import Scoresheet from "./Scoresheet";
import CoronationSheet from "./CoronationSheet";

export default function Container() {
  const [cris, setCris] = useState([]);
  const [activeCri, setActiveCri] = useState(null);
  const router = useRouter();
  useEffect(() => {
    if (!sessionStorage.getItem("judNum")) {
      router.push("/");
    } else {
      getCris(setCris);
    }
  }, [router]);

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
        <button
          className={`${
            activeCri === cris.length + 1 ? "active-btn-purple" : "btn-border-purple"
          } font-extrabold tracking-wide`}
          onClick={() => setActiveCri(cris.length + 1)}>
          Coronation
        </button>
      </div>

      <div className="font-bold text-xl">{`My ${
        cris[activeCri] ? cris[activeCri].attributes.name : "Coronation"
      } Scoresheet`}</div>
      <div className="italic text-gray-600 text-sm mb-2">Contestant No. | Score | Rank</div>

      {cris[activeCri] ? (
        <Scoresheet cris={cris[activeCri].id} />
      ) : (
        <CoronationSheet fp={activeCri === null} />
        // <div className="italic text-red-500 tracking-widest">--- Select a Segment ---</div>
      )}
    </div>
  );
}
