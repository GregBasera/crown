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
        callback1(res.data.data.misc.data.attributes.client_token);
        callback2(res.data.data.misc.data.attributes.server_token);
      } else {
        console.log(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
