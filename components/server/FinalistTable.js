import React, { useState, useEffect } from "react";
import { getList, getRawFinalistData, getFinalistScores } from "./APIcalls";

export default function FinalistTable() {
  const [juds, setJuds] = useState([]);
  const [cons, setCons] = useState([]);
  const [scores, setScores] = useState([]);
  const [showRawScores, setShowRawScores] = useState(false);
  useEffect(() => {
    getList("jud", setJuds);
    getRawFinalistData(setCons);
    getFinalistScores(setScores);
  }, []);

  const distRanks = (q, w, e) => {
    // mini drills
    let criFiltered = scores.filter((el) => el.attributes.cri === w);
    let judFiltered = criFiltered.filter((el) => el.attributes.jud === e);
    // ranking mechanism
    let arr = judFiltered.map((raw) => raw.attributes.raw_score);
    let sorted = arr.slice().sort((a, b) => b - a);
    let ranks = arr.map((v) => sorted.indexOf(v) + 1);
    // get target index
    let targeted = judFiltered.filter((el) => el.attributes.con === q);
    let targetIndex = judFiltered.indexOf(targeted[0]);

    return ranks.length !== 0 ? ranks[targetIndex] : "-";
  };

  return (
    // className="border rounded-md p-2 mt-2 border-gray-200 bg-white"
    <div className="mt-2">
      <div className="flex">
        <div className="flex-auto text-xl font-extrabold ml-1 mb-2">Finalist Table</div>
        <div className="form-check mr-1 mt-1">
          <input
            className="cursor-pointer"
            type="checkbox"
            id="showRawFinal"
            onChange={() => setShowRawScores(!showRawScores)}
          />
          <label className="inline-block cursor-pointer ml-1" htmlFor="showRawFinal">
            <small>Show Raw Scores</small>
          </label>
        </div>
      </div>

      <table className="group w-full border-2">
        <THeadBuilder juds={juds} />

        <tbody>
          {cons.map((q) => {
            let conFiltered = scores.filter((el) => el.attributes.con === q.attributes.con_number.toString()); // mini drill

            return (
              <tr key={q.id} className="table-control">
                <th className="table-control-th">{q.attributes.name}</th>

                {juds.map((w) => {
                  let judFiltered = conFiltered.filter((el) => el.attributes.jud === w.id); // mini drill
                  let temp = distRanks(q.attributes.con_number.toString(), "-1", w.id);
                  // lowerIsBetter += Number.isInteger(temp) ? temp : 0;

                  return showRawScores ? (
                    <td key={w.id} className="table-control">
                      {judFiltered.length !== 0 ? judFiltered[0].attributes.raw_score : "-"}
                    </td>
                  ) : (
                    <td key={w.id} className="table-control">
                      {distRanks(q.attributes.con_number.toString(), "-1", w.id)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function THeadBuilder({ juds }) {
  return (
    <thead>
      <tr className="table-control">
        <th className="table-control-th" rowSpan={2}>
          Contestants
        </th>
        <th className="table-control-th" colSpan={juds.length}>
          Coronation
        </th>
        <th className="table-control-th" rowSpan={2}>
          Champions
        </th>
      </tr>
      <tr className="table-control">
        {juds.map((i) => {
          return (
            <th key={i.id} className="table-control-th">
              {i.id}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
