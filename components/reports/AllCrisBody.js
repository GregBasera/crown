import React, { useState, useEffect } from "react";
import { getAllLists } from "../server/APIcalls";

export default function AllCrisBody() {
  const [allLists, setAllLists] = useState({ cons: { data: [] }, juds: { data: [] }, cris: { data: [] } });
  useEffect(() => {
    getAllLists(setAllLists);
  }, []);

  return (
    <div>
      <table className="w-full mt-3 bg-white">
        <thead>
          <tr>
            <th className="table-control-th">Num</th>
            <th className="table-control-th">Name</th>
            {allLists.cris.data.map((q) => {
              return (
                <th key={q.id} className="table-control-th" colSpan={allLists.juds.data.length}>
                  {q.attributes.name}
                </th>
              );
            })}
            <th className="table-control-th">Sum</th>
            <th className="table-control-th">Ranks</th>
          </tr>
        </thead>
      </table>

      <div className="text-center overline font-bold mt-10">Chief of Tabulation Committee</div>

      <div className="font-bold mt-5">Judge Signatures:</div>
      <table className="w-full mt-5">
        <thead>
          <tr>
            {allLists.juds.data.map((e) => {
              return (
                <th key={e.id}>
                  <hr className="border-1 border-black mx-3" />
                  <div>{e.attributes.name}</div>
                  <span className="text-sm text-gray-400">{`Judge #${e.attributes.jud_number}`}</span>
                </th>
              );
            })}
          </tr>
        </thead>
      </table>
    </div>
  );
}
