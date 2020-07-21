
const sendQuery = require("./helpers/send-query")

const GET_ALL_THOUGHTS = `
{
  thoughts{
    title
    id
    content
    user{
      name
    }
  }
}  
`

exports.handler = async event => {
    const { data, errors } = await sendQuery(GET_ALL_THOUGHTS)

    if (errors) {
        return {
            statusCode: 500,
            body: JSON.stringify(errors),
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ thoughts: data.thoughts }),
    }
}