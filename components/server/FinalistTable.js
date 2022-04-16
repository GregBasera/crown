import React, { useState, useEffect } from "react";
import { getList, getRawFinalistData } from "./APIcalls";

export default function FinalistTable() {
  const [juds, setJuds] = useState([]);
  const [cons, setCons] = useState([]);
  useEffect(() => {
    getList("jud", setJuds);
    getRawFinalistData(setCons);
  }, []);

  return (
    // className="border rounded-md p-2 mt-2 border-gray-200 bg-white"
    <div className="mt-2">
      <div className="flex">
        <div className="flex-auto text-xl font-extrabold ml-1 mb-2">Finalist Table</div>
        <div className="form-check mr-1 mt-1">
          <input className="cursor-pointer" type="checkbox" id="showRawFinal" />
          <label className="inline-block cursor-pointer ml-1" htmlFor="showRawFinal">
            <small>Show Raw Scores</small>
          </label>
        </div>
      </div>

      <table className="group w-full border-2">
        <THeadBuilder juds={juds} />

        <tbody>
          {cons.map((q) => {
            return (
              <tr key={q.id} className="table-control">
                <th className="table-control-th">{q.attributes.name}</th>
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
