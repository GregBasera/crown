import axios from "axios";
import { gqlendpoint } from "../shared/endpoints";

export function getToken(callback1, callback2) {
  axios({
    url: gqlendpoint,
    method: "POST",
    data: {
      query: `query{
        misc{
          data{
            attributes{
              client_token
              server_token
            }
          }
        }
      }`,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        if (res.data.data.misc.data === null) {
          callback1("...nope..."); // for when database is new
          callback2(""); // for when database is new
        } else {
          callback1(res.data.data.misc.data.attributes.client_token);
          callback2(res.data.data.misc.data.attributes.server_token);
        }
      } else {
        console.log(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
