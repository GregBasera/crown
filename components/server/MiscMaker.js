import React, { useState, useEffect } from "react";
import { RefreshOutline } from "../shared/Icons";
import { getMisc, updateMisc } from "./APIcalls";

export default function MiscMaker({ title }) {
  const [contestName, setContestName] = useState("");
  const [clientToken, setClientToken] = useState("");
  const [serverToken, setServerToken] = useState("");
  const [finalistNum, setFinalistNum] = useState(0);
  useEffect(() => {
    getMisc(setClientToken, setServerToken, setFinalistNum, setContestName);
  }, []);

  const refreshList = () => {
    getMisc(setClientToken);
  };
  const contestNameChanges = (e) => {
    setContestName(e.target.value);
    updateMisc(clientToken, serverToken, finalistNum, e.target.value);
  };
  const clientTokenChanges = (e) => {
    setClientToken(e.target.value);
    updateMisc(e.target.value, serverToken, finalistNum, contestName);
  };
  const serverTokenChanges = (e) => {
    setServerToken(e.target.value);
    updateMisc(clientToken, e.target.value, finalistNum, contestName);
  };
  const finalistNumChanges = (e) => {
    setFinalistNum(e.target.value);
    updateMisc(clientToken, serverToken, e.target.value, contestName);
  };

  return (
    <div className="border rounded-md border-gray-200 bg-white shadow-md">
      <div className="flex items-center">
        <div className="flex-auto text-xl font-extrabold ml-3 my-2">{title}</div>
        <button className="m-2 mr-3 p-1 flex-none bg-green-400 hover:bg-green-600 rounded-full" onClick={refreshList}>
          <RefreshOutline />
        </button>
      </div>
      <hr />

      <div className="overflow-y-auto pb-2" style={{ maxHeight: "40vh" }}>
        <small className="mx-4">Contest Name</small>
        <div className="flex items-center mx-3 mb-1">
          <div className="flex-auto">
            <TextInput value={contestName} onChange={contestNameChanges} />
          </div>
        </div>

        <small className="mx-4">Client Token</small>
        <div className="flex items-center mx-3 mb-1">
          <div className="flex-auto">
            <TextInput value={clientToken} onChange={clientTokenChanges} />
          </div>
        </div>

        <small className="mx-4">Server Token</small>
        <div className="flex items-center mx-3 mb-1">
          <div className="flex-auto">
            <TextInput value={serverToken} onChange={serverTokenChanges} />
          </div>
        </div>

        <small className="mx-4">Number of Finalists</small>
        <div className="flex items-center mx-3 mb-1">
          <div className="flex-auto">
            <TextInput value={finalistNum} onChange={finalistNumChanges} />
          </div>
        </div>
      </div>
    </div>
  );
}

function TextInput({ value, onChange, indx }) {
  return (
    <input
      className="border border-black focus:outline-none block w-full px-3 py-1 rounded-md text-right"
      type="text"
      value={value}
      onChange={() => onChange(event, indx, "name")}
    />
  );
}
