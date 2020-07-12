const axios = require("axios");

module.exports = async (query, variables) => {
  const result = await axios({
    url: "https://marcodca.herokuapp.com/v1/graphql",
    method: "POST",
    headers: {
        "Content-type": "application/json"
    //   Authorization: `Bearer ${process.env.FAUNA_SERVER_SECRET}`
    },
    data: {
      query,
      variables
    }
  });

  return result.data;
};