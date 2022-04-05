import React from "react";
import Head from "next/head";

export default function HeadInject({ children }) {
  return (
    <div>
      <Head>
        <title>Crown</title>
        <meta
          name="description"
          content="Tallying system for beauty pageants and other similar contests."
        />
        <link rel="icon" href="/crown.ico" />
      </Head>

      {children}
    </div>
  );
}
