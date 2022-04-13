import axios from "axios";
import { gqlendpoint } from "../shared/endpoints";

export function getCris(callback) {
  axios({
    url: gqlendpoint,
    method: "POST",
    data: {
      query: `query{
        cris{ data{
          id
          attributes{
            name
          }
        }}
      }`,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        callback(res.data.data.cris.data);
      } else {
        console.log(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getCons(callback) {
  axios({
    url: gqlendpoint,
    method: "POST",
    data: {
      query: `query{
        cons(sort: "con_number:asc") { data{
          id
          attributes{
            con_number
            name
          }
        }}
      }`,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        callback(res.data.data.cons.data);
      } else {
        console.log(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getScores(cris, juds, callback1, callback2) {
  axios({
    url: gqlendpoint,
    method: "POST",
    data: {
      query: `query{
        scores(filters: { cri: { eq: "${cris}" }, jud: { eq: "${juds}" } }, sort: "con:asc") { data{
          id
          attributes{
            con cri jud
            raw_score
          }
        }}
      }`,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        callback1(res.data.data.scores.data);
      } else {
        console.log(res);
      }
      return res.data.data.scores.data;
    })
    .then((res) => {
      const arr = res.map((e) => e.attributes.raw_score);
      const sorted = arr.slice().sort((a, b) => b - a);
      const ranks = arr.map((v) => sorted.indexOf(v) + 1);
      callback2(ranks);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function createScores(con, cri, jud, raw_score, callback) {
  axios({
    url: gqlendpoint,
    method: "POST",
    data: {
      query: `mutation{
        createScore(data: { con: "${con}", cri: "${cri}", jud: "${jud}", raw_score: ${raw_score} }) { data {
          id
        }}
      }`,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        console.log("new score store created");
      } else {
        console.log(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function updateScores(scoreID, raw_score, callback) {
  axios({
    url: gqlendpoint,
    method: "POST",
    data: {
      query: `mutation{
        updateScore(id: "${scoreID}", data: { raw_score: ${raw_score} }) { data {
          id
        }}
      }`,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        console.log("a score store was updated");
      } else {
        console.log(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
