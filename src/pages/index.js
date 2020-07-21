import React, { useEffect, useState } from "react"
import axios from "axios"
import { useStaticQuery, graphql } from "gatsby"
import { useSubscription } from "react-apollo-hooks"
import gql from "graphql-tag"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { useAuth } from "react-use-auth"

const IndexPage = () => {
  const [thoughts, setThoughts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { isAuthenticated, login, logout } = useAuth()

  useEffect(() => {
    async function fetchAllThoughtsRuntime() {
      setIsLoading(true)
      try {
        const resp = await axios.post("/api/get-all-thoughts")

        setThoughts(resp.data.thoughts)
        setIsLoading(false)
      } catch (e) {
        console.error(e)
        setIsLoading(false)
      }
    }

    fetchAllThoughtsRuntime()
  }, [])

  const staticData = useStaticQuery(graphql`
    query staticThoughts {
      thoughts {
        thoughts {
          title
          id
          content
          user {
            name
          }
        }
      }
    }
  `)

  const GET_THOUGHTS = gql`
    subscription {
      thoughts {
        content
        id
        title
      }
    }
  `

  const { data, loading } = useSubscription(
    GET_THOUGHTS,
    {suspend: false}
  )

  return (
    <Layout>
      <SEO title="Home" />
      <h1>What is people thinking?</h1>
      <div style={{ padding: "2rem", background: "coral" }}>
        Run time
        {isLoading ? (
          <p>Loading....</p>
        ) : (
          thoughts.map(({ title, content, id }) => (
            <div key={id}>
              <h2>{title}</h2>
              <p>{content}</p>
            </div>
          ))
        )}
      </div>
      <div style={{ padding: "2rem", background: "lime" }}>
        build time
        {staticData.thoughts.thoughts.map(({ title, content, id }) => (
          <div key={id}>
            <h2>{title}</h2>
            <p>{content}</p>
          </div>
        ))}
      </div>
      <div style={{ padding: "2rem", background: "teal" }}>
        subscription
        {loading ? (
          <p>Loading...</p>
        ) : (
          data?.thoughts?.map(({ title, content, id }) => (
            <div key={id}>
              <h2>{title}</h2>
              <p>{content}</p>
            </div>
          ))
        )}
      </div>
      {
        <button onClick={isAuthenticated() ? logout : login}>
          Log{isAuthenticated() ? "out" : "in"}
        </button>
      }
    </Layout>
  )
}

export default IndexPage
