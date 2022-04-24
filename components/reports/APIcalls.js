import axios from "axios";
import { gqlendpoint } from "../shared/endpoints";

export function getSingleCri(cri, callback) {
  axios({
    url: gqlendpoint,
    method: "POST",
    data: {
      query: `query{
        scores(filters: { cri: { eq: "${cri}" } }) { data {
          id attributes {
            con cri jud raw_score
          }
        }}
      }`,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        callback(res.data.data.scores.data);
      } else {
        console.log(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getContestName(callback) {
  axios({
    url: gqlendpoint,
    method: "POST",
    data: {
      query: `query{
        misc{ data{
          attributes{
            contest_name
          }
        }}
      }`,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        callback(res.data.data.misc.data.attributes.contest_name);
      } else {
        console.log(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getCri(id, callback) {
  axios({
    url: gqlendpoint,
    method: "POST",
    data: {
      query: `query{
        cri(id: "${id}") { data{
          id attributes{
            name
          }
        }}
      }`,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        if (id !== "-1") callback(res.data.data.cri.data); // Coronation is built-in
      } else {
        console.log(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getJud(callback) {
  axios({
    url: gqlendpoint,
    method: "POST",
    data: {
      query: `query{
        juds{ data{
          id attributes{
            name
          }
        }}
      }`,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        callback(res.data.data.juds.data);
      } else {
        console.log(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getCon(callback) {
  axios({
    url: gqlendpoint,
    method: "POST",
    data: {
      query: `query{
        cons{ data{
          id attributes{
            name con_number
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
