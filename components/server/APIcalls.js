import axios from "axios";
import { gqlendpoint } from "../shared/endpoints";

export function getList(endpoint, callback) {
  axios({
    url: gqlendpoint,
    method: "POST",
    data: {
      query: `query{
        ${endpoint}s{ data{
          id
          attributes{
            ${endpoint === "con" ? "con_number" : ""}
            name
          }}
        }
      }`,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        callback(res.data.data[`${endpoint}s`].data);
      } else {
        console.log(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function createListItem(data, endpoint, callback) {
  axios({
    url: gqlendpoint,
    method: "POST",
    data: {
      query: `
        mutation{
          create${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}(data: {name: "${data}"}){
            data{
              id
              attributes{
                name
              }
            }
          }
        }
      `,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        callback(res.data.data[`create${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}`].data);
      } else {
        console.log(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function delListItem(dbID, listIndex, endpoint, callback) {
  axios({
    url: gqlendpoint,
    method: "POST",
    data: {
      query: `mutation{
        delete${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}(id: ${dbID}){ data{
          id
        }}
      }`,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        callback(listIndex);
      } else {
        console.log(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function updateListItem(data1, data2, dbID, endpoint, callback) {
  axios({
    url: gqlendpoint,
    method: "POST",
    data: {
      query: `mutation{
        update${
          endpoint.charAt(0).toUpperCase() + endpoint.slice(1)
        }(id: ${dbID}, data: { name: "${data1}", con_number: ${data2} }) {
          data{
            id
          }
        }
      }`,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        callback();
      } else {
        console.log(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getAllLists(callback) {
  axios({
    url: gqlendpoint,
    method: "POST",
    data: {
      query: `query{
        cons{ data{
          id
          attributes{
            con_number
            name
          }
        }}
        juds{ data{
          id
          attributes{
            name
          }
        }}
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
      callback(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getMisc(callback1, callback2, callback3) {
  axios({
    url: gqlendpoint,
    method: "POST",
    data: {
      query: `query{
        misc{ data {
          attributes{
            client_token
            server_token
            finalist_number
          }
        }}
      }`,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        callback1 && callback1(res.data.data.misc.data.attributes.client_token);
        callback2 && callback2(res.data.data.misc.data.attributes.server_token);
        callback3 && callback3(res.data.data.misc.data.attributes.finalist_number);
      } else {
        console.log(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function updateMisc(client_token, server_token, finalistNum) {
  axios({
    url: gqlendpoint,
    method: "POST",
    data: {
      query: `mutation{
        updateMisc(data: { client_token: "${client_token}", server_token: "${server_token}", finalist_number: ${finalistNum} }) {
          data{
            attributes{
              client_token
            }
          }
        }
      }`,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        // ignore
      } else {
        // ignore
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getAllScores(callback) {
  axios({
    url: gqlendpoint,
    method: "POST",
    data: {
      query: `query{
        scores{
          data{
            id
            attributes{
              con jud cri
              raw_score
            }
          }
        }
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

export function getRawFinalistData(callback) {
  axios({
    url: gqlendpoint,
    method: "POST",
    data: {
      query: `query{ misc{ data{
        attributes{ rawFinalistData }
      }}}`,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        let conFinalistIDs = res.data.data.misc.data.attributes.rawFinalistData;
        // get indexes of finalists; if successful, get cons using results gotten
        axios({
          url: gqlendpoint,
          method: "POST",
          data: {
            query: `query{ cons(filters: { id: { in: [${conFinalistIDs}] } }) {
              data { id attributes { name con_number }
            }}}`,
          },
        })
          .then((res1) => {
            if (res1.status === 200) {
              callback(res1.data.data.cons.data);
            } else {
              console.log(res1);
            }
          })
          .catch((err1) => {
            console.log(err1);
          });
      } else {
        console.log(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function updateRawFinalistData(data) {
  axios({
    url: gqlendpoint,
    method: "POST",
    data: {
      query: `mutation{
        updateMisc(data: { rawFinalistData: "${data}" }) {
          data{
            attributes{
              rawFinalistData
            }
          }
        }
      }`,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        // ignore
      } else {
        // ignore
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getFinalistScores(callback) {
  axios({
    url: gqlendpoint,
    method: "POST",
    data: {
      query: `query{
        scores(filters: { cri: { eq: "-1" } }) {
          data { id attributes {
            con jud cri raw_score
          }}
        }
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
