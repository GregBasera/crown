import axios from "axios";
import { gqlendpont } from "../shared/endpoints";

export function getList(endpoint, callback) {
  axios({
    url: gqlendpont,
    method: "POST",
    data: {
      query: `query{
        ${endpoint}s{ data{
          id
          attributes{
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
    url: gqlendpont,
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
    url: gqlendpont,
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

export function updateListItem(data, dbID, listIndex, endpoint, callback) {
  axios({
    url: gqlendpont,
    method: "POST",
    data: {
      query: `mutation{
        update${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)}(id: ${dbID}, data: { name: "${data}" }) {
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
    url: gqlendpont,
    method: "POST",
    data: {
      query: `query{
        cons{ data{
          id
          attributes{
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
