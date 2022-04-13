import axios from "axios";
import { gqlendpoint } from "../shared/endpoints";

export function getToken(callback) {
  axios({
    url: gqlendpoint,
    method: "POST",
    data: {
      query: `query{
        misc{
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
        callback(res.data.data.misc.data.attributes.client_token);
      } else {
        console.log(res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
