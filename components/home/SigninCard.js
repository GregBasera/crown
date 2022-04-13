import React, { useEffect, useState } from "react";
import TextInput from "./TextInput";
import Button from "./Button";
import { getToken } from "./APIcalls";
import { useRouter } from "next/router";

export default function SigninCard() {
  const [refToken, setRefToken] = useState(null);
  const [judNum, setJudNum] = useState(null);
  const [token, setToken] = useState(null);
  const [btnText, setBtnText] = useState("Proceed");
  const router = useRouter();
  useEffect(() => {
    getToken(setRefToken);
  }, []);

  const submitClicked = () => {
    if (token === refToken) {
      sessionStorage.setItem("judNum", JSON.stringify({ judNum: judNum }));
      router.push("/client");
    } else {
      setBtnText("Wrong Token ... Try Again");
    }
  };

  return (
    <div className="block rounded-md p-5 bg-purple-300">
      <h1 className="text-6xl text-center font-bold mb-5">Welcome!</h1>

      {/* form */}
      <TextInput
        label="Judge Number"
        type="number"
        id={"iden"}
        value={judNum ?? ""}
        onChange={(e) => setJudNum(e.target.value)}
      />
      <TextInput
        label="Token"
        type="text"
        id={"token"}
        value={token ?? ""}
        onChange={(e) => setToken(e.target.value)}
      />
      <Button btText={btnText} onClick={submitClicked} />
    </div>
  );
}
