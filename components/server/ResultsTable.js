import { useState, useEffect } from "react";
import { getAllLists, getAllScores } from "./APIcalls";

export default function ResultsTable() {
  const [allList, setAllList] = useState({ cons: { data: [] }, juds: { data: [] }, cris: { data: [] } });
  const [scores, setScores] = useState([]);
  const [showRawScores, setShowRawScores] = useState(false);
  useEffect(() => {
    getAllLists(setAllList);
    getAllScores(setScores);
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

  if (scores.length === 0) return null;
  return (
    <div className="border rounded-md p-2 mt-2 border-gray-200 bg-white">
      <div className="flex">
        <div className="flex-auto text-xl font-extrabold ml-1 mb-2">Results Table</div>
        <div className="form-check mr-1 mt-1">
          <input
            className="cursor-pointer"
            type="checkbox"
            id="showRaw"
            onChange={() => setShowRawScores(!showRawScores)}
          />
          <label className="inline-block cursor-pointer ml-1" htmlFor="showRaw">
            <small>Show Raw Scores</small>
          </label>
        </div>
      </div>

      <table className="group w-full border-2">
        <THeadBuilder lists={allList} />

        <tbody>
          {allList.cons.data.map((i) => {
            let conFiltered = scores.filter((el) => el.attributes.con === i.attributes.con_number.toString()); // mini drill

            return (
              <tr key={i.id} className="table-control">
                <th className="table-control-th">{i.attributes.name}</th>

                {allList.cris.data.map((w) => {
                  let criFiltered = conFiltered.filter((el) => el.attributes.cri === w.id); // mini drill

                  return allList.juds.data.map((q) => {
                    let judFiltered = criFiltered.filter((el) => el.attributes.jud === q.id); // mini drill

                    return showRawScores ? (
                      <td key={q.id} className="table-control">
                        {judFiltered.length !== 0 ? judFiltered[0].attributes.raw_score : "-"}
                      </td>
                    ) : (
                      <td key={q.id} className="table-control">
                        {distRanks(i.attributes.con_number.toString(), w.id, q.id)}
                      </td>
                    );
                  });
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function THeadBuilder({ lists }) {
  return (
    <thead>
      <tr className="table-control">
        <th className="table-control-th" rowSpan={2}>
          Contestants
        </th>
        {lists.cris.data.map((i) => {
          return (
            <th key={i.id} className="table-control-th" colSpan={lists.juds.data.length}>
              {i.attributes.name}
            </th>
          );
        })}
        <th className="table-control-th" rowSpan={2}>
          Total
        </th>
        <th className="table-control-th" rowSpan={2}>
          Final Ranks
        </th>
      </tr>
      <tr className="table-control">
        {lists.cris.data.map((element) => {
          return lists.juds.data.map((i) => {
            return (
              <th key={i.id} className="table-control-th">
                {i.id}
              </th>
            );
          });
        })}
      </tr>
    </thead>
  );
}
