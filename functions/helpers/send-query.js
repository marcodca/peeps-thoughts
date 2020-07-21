const axios = require("axios");
const dotenv = require("dotenv").config()

module.exports = async (query, variables) => {
  const result = await axios({
    url: "https://marcodca.herokuapp.com/v1/graphql",
    method: "POST",
    headers: {
        "Content-type": "application/json",
        "x-hasura-admin-secret": process.env.GATSBY_HASURA_GRAPHQL_ADMIN_SECRET
    },
    data: {
      query,
      variables
    }
  });

  return result.data;
};