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

export function getMisc(callback) {
  axios({
    url: gqlendpoint,
    method: "POST",
    data: {
      query: `query{
        misc{ data {
          attributes{
            client_token
          }
        }}
      }`,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        callback(res.data.data.misc.data.attributes.client_token);
      } else {
        console.log(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function updateMisc(client_token) {
  axios({
    url: gqlendpoint,
    method: "POST",
    data: {
      query: `mutation{
        updateMisc(data: { client_token: "${client_token}" }) {
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
