import React, { useState, useEffect } from "react";
import { RefreshOutline } from "../shared/Icons";
import { getMisc, updateMisc } from "./APIcalls";

export default function MiscMaker({ title }) {
  const [clientToken, setClientToken] = useState("");
  useEffect(() => {
    getMisc(setClientToken);
  }, []);

  const refreshList = () => {
    getMisc(setClientToken);
  };
  const clientTokenChenges = (e) => {
    setClientToken(e.target.value);
    updateMisc(e.target.value);
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
        <small className="mx-4">Client Token</small>
        <div className="flex items-center mx-3 mb-1">
          <div className="flex-auto">
            <TextInput value={clientToken} onChange={clientTokenChenges} />
          </div>
        </div>

        <small className="mx-4">Server Token</small>
        <div className="flex items-center mx-3 mb-1">
          <div className="flex-auto">
            <TextInput />
          </div>
        </div>

        <small className="mx-4">Number of Finalists</small>
        <div className="flex items-center mx-3 mb-1">
          <div className="flex-auto">
            <TextInput />
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
