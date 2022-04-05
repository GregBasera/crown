import { useState, useEffect } from "react";
import { getAllLists } from "./APIcalls";

export default function ResultsTable() {
  const [allList, setAllList] = useState({ cons: { data: [] }, juds: { data: [] }, cris: { data: [] } });
  useEffect(() => {
    getAllLists(setAllList);
  }, []);

  return (
    <table className="group w-full border-2">
      <THeadBuilder lists={allList} />

      <tbody>
        {allList.cons.data.map((i) => {
          return (
            <tr key={i.id} className="table-control">
              <th className="table-control">{i.attributes.name}</th>

              {allList.cris.data.map((element) => {
                return allList.juds.data.map((i) => {
                  return (
                    <td key={i.id} className="table-control">
                      10
                    </td>
                  );
                });
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function THeadBuilder({ lists }) {
  return (
    <thead>
      <tr className="table-control">
        <th className="table-control" rowSpan={2}>
          Contestants
        </th>
        {lists.cris.data.map((i) => {
          return (
            <th key={i.id} className="table-control" colSpan={lists.juds.data.length}>
              {i.attributes.name}
            </th>
          );
        })}
      </tr>
      <tr className="table-control">
        {lists.cris.data.map((element) => {
          return lists.juds.data.map((i) => {
            return (
              <th key={i.id} className="table-control">
                {i.id}
              </th>
            );
          });
        })}
      </tr>
    </thead>
  );
}
