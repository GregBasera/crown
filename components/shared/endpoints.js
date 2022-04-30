export const base = `http://${process.env.NEXT_PUBLIC_SERVER_HOST}:1337/`;
export const gqlendpoint = `${base}graphql/`;

export const cons = `${base}api/cons`;
export const juds = `${base}api/juds`;
export const cris = `${base}api/cris`;

export function axiosObjectSkeleton(obj) {
  // obj attributes should be this structure:
  // type - required - string; either "query" or "mutation"
  // coll - required - string; the collection to be queried
  // attr - optional - string; list of attr to be returned
  // id - optional - boolean; if record "id" needs to be returned
  // collAttrs - optional - string; filters, sorts, etc. params for "coll"

  let collAttrs = obj.collAttrs ? obj.collAttrs : "";
  let attr = obj.attr ? `attributes{ ${obj.attr} }` : "";
  let tobeReturned = {
    url: gqlendpoint,
    method: "POST",
    data: {
      query: `${obj.type}{ ${obj.coll + collAttrs}{ data{ ${obj.id ? "id" : ""} ${attr} } } }`,
    },
  };

  return tobeReturned;
}
