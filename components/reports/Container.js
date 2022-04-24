import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Header from "./Header";
import Body from "./Body";

export default function Container() {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("tobePrinted")) {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="mx-2">
      <Header />

      <Body />
    </div>
  );
}
